import cv2
import numpy as np

img = np.ones((800, 800, 3), dtype=np.uint8) * 255
color = (0, 0, 0)
thickness = 15

# Outer walls
cv2.rectangle(img, (100, 100), (700, 700), color, thickness)

# Inner walls
cv2.line(img, (400, 100), (400, 400), color, thickness)
cv2.line(img, (100, 400), (300, 400), color, thickness) # leave gap for door
cv2.line(img, (400, 400), (700, 400), color, thickness)
cv2.line(img, (400, 250), (250, 250), color, thickness)

cv2.imwrite("../sample_floorplan.png", img)
print("Sample floorplan generated at ../sample_floorplan.png")
