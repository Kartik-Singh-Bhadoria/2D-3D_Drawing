import cv2
import numpy as np
import json

img = cv2.imread("../sample_floorplan.png")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY_INV)

contours, hierarchy = cv2.findContours(thresh, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)

print("Hierarchy:", hierarchy)

walls = []
if hierarchy is not None:
    for i, cnt in enumerate(contours):
        # We only care about external contours (parent == -1)
        if hierarchy[0][i][3] == -1:
            outer = [{"x": float(p[0][0]), "y": float(p[0][1])} for p in cv2.approxPolyDP(cnt, 0.01 * cv2.arcLength(cnt, True), True)]
            
            # get holes
            holes = []
            child_idx = hierarchy[0][i][2]
            while child_idx != -1:
                child_cnt = contours[child_idx]
                hole = [{"x": float(p[0][0]), "y": float(p[0][1])} for p in cv2.approxPolyDP(child_cnt, 0.01 * cv2.arcLength(child_cnt, True), True)]
                holes.append(hole)
                child_idx = hierarchy[0][child_idx][0] # next sibling
                
            walls.append({"outer": outer, "holes": holes})

print("Found walls:", len(walls))
print("Holes in first wall:", len(walls[0]['holes']) if walls else 0)
