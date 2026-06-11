# Plan2Space

Convert 2D floor plans into 3D spaces using OpenCV, React, and Three.js.

## Running Locally

### Backend Setup (FastAPI + OpenCV)
1. Navigate to the `backend` folder.
2. Install dependencies: `pip install -r requirements.txt`
3. Run the development server: `uvicorn main:app --reload` (Runs on `http://localhost:8000`)

### Frontend Setup (Vite + React + Three.js)
1. Navigate to the `frontend` folder.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev` (Usually runs on `http://localhost:5173`)

### Usage
- Open the frontend in your browser.
- Upload `sample_floorplan.png` (found in the root directory).
- Interact with the 3D model (Left Click to Rotate, Right Click to Pan, Scroll to Zoom).
