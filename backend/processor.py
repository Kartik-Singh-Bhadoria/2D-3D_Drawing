import cv2
import numpy as np

def process_floorplan(image_bytes: bytes):
    """
    Processes a floorplan image and returns wall polygons.
    """
    # 1. Decode image
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if img is None:
        raise ValueError("Failed to decode image.")
    
    # 2. Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # 3. Apply Gaussian blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # 4. Thresholding: assuming black lines on white background
    # We want to find the dark lines, so we use THRESH_BINARY_INV.
    # Pixels darker than 128 become white (255), others become black (0)
    _, thresh = cv2.threshold(blurred, 128, 255, cv2.THRESH_BINARY_INV)
    
    # Optional: apply morphological operations to close gaps in walls
    kernel_size = 3
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_size, kernel_size))
    morphed = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    
    # 5. Find contours
    # Using RETR_CCOMP to get a 2-level hierarchy. Level 1: Outer boundaries, Level 2: Holes (rooms)
    contours, hierarchy = cv2.findContours(morphed, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    
    walls = []
    
    # Height and Width to normalize coordinates (optional, but good for Threejs)
    h, w = img.shape[:2]
    scale = 0.05
    
    def transform_point(x, y):
        return {"x": (x - w/2) * scale, "y": -(y - h/2) * scale}
        
    def approx_polygon(cnt):
        epsilon = 0.01 * cv2.arcLength(cnt, True)
        approx = cv2.approxPolyDP(cnt, epsilon, True)
        return [transform_point(pt[0][0], pt[0][1]) for pt in approx]

    if hierarchy is not None:
        for i, cnt in enumerate(contours):
            # We only care about external contours (parent == -1)
            if hierarchy[0][i][3] == -1:
                area = cv2.contourArea(cnt)
                if area < 50:  # arbitrary threshold for noise
                    continue
                    
                outer_poly = approx_polygon(cnt)
                
                # get holes
                holes = []
                child_idx = hierarchy[0][i][2]
                while child_idx != -1:
                    child_cnt = contours[child_idx]
                    if cv2.contourArea(child_cnt) > 50:
                        holes.append(approx_polygon(child_cnt))
                    child_idx = hierarchy[0][child_idx][0] # next sibling
                    
                if len(outer_poly) >= 3:
                    walls.append({"outer": outer_poly, "holes": holes})
            
    return walls
