# 🏠 Plan2Space

Plan2Space is a full-stack application that converts **2D floor plan images into interactive 3D visualizations**.

Users can upload a floor plan image, and the backend processes the image using computer vision techniques to detect walls and structural boundaries. The processed data is then rendered as a navigable 3D model using Three.js and React Three Fiber.

---

## ✨ Features

- 📤 Upload floor plan images
- 🖼️ Computer vision based wall detection
- 🏗️ Automatic extraction of wall polygons
- 🌐 Interactive 3D visualization
- 🔄 Wireframe and solid view modes
- 🎮 Camera controls (Rotate, Pan, Zoom)
- ⚡ FastAPI backend
- ⚛️ React + Vite frontend
- 🎨 Modern UI with Tailwind CSS

---


## 📂 Project Structure

```text
Plan2Space/
│
├── backend/
│   ├── main.py
│   ├── processor.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ How It Works

1. Upload floor plan image
2. Convert image to grayscale
3. Apply Gaussian Blur
4. Threshold image to isolate walls
5. Apply morphological operations
6. Detect contours using OpenCV
7. Generate wall polygons
8. Send polygon data to frontend
9. Render walls as a 3D scene


## 🎮 Controls

| Action | Control |
|----------|----------|
| Rotate View | Left Mouse Button |
| Pan Camera | Right Mouse Button |
| Zoom | Mouse Wheel |
| Toggle Wireframe | Wireframe Button |

---


## 🔮 Future Improvements

- AI-powered room detection
- Automatic furniture placement
- Room labeling
- Revit integration
- Unreal Engine export
- GLTF/OBJ export
- Multi-floor support
- Dimension extraction
- Material assignment
}

---

## 📜 License

This project is developed for educational and research purposes.
