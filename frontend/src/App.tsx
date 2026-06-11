import React, { useState } from 'react';
import Uploader from './components/Uploader';
import Viewer3D from './components/Viewer3D';
import { Box, Layers } from 'lucide-react';

function App() {
  const [wallData, setWallData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [wireframe, setWireframe] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setWallData(data.walls);
    } catch(err) {
      console.error(err);
      alert('Error processing floor plan. Please check backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-900 text-slate-100 font-sans overflow-hidden">
      <header className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <Box className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-bold tracking-tight">Plan2Space</h1>
        </div>
        {wallData && (
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setWireframe(!wireframe)}
                className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors ${wireframe ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
             >
                <Layers className="w-4 h-4" />
                {wireframe ? 'Solid' : 'Wireframe'}
             </button>
             <button 
                onClick={() => setWallData(null)}
                className="text-sm px-3 py-1.5 rounded-md bg-slate-800 hover:bg-red-900/50 transition-colors"
              >
                Reset
             </button>
          </div>
        )}
      </header>

      <main className="flex-1 relative flex overflow-hidden">
        {!wallData ? (
           <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900">
              <div className="max-w-md w-full text-center space-y-6">
                 <h2 className="text-3xl font-semibold leading-tight">Convert 2D Plans to <br/><span className="text-blue-500">3D Spaces</span></h2>
                 <p className="text-slate-400 text-sm">Upload a clean, black-and-white floor plan image to generate an interactive 3D model.</p>
                 <Uploader onUpload={handleUpload} isProcessing={loading} />
              </div>
           </div>
        ) : (
           <div className="w-full h-full relative cursor-move">
              <Viewer3D walls={wallData} wireframe={wireframe} />
              <div className="absolute bottom-6 right-6 pointer-events-none">
                 <div className="bg-slate-900/80 backdrop-blur-md px-4 py-3 rounded-lg border border-slate-700 text-xs text-slate-300">
                    <p>Left Click: Rotate</p>
                    <p>Right Click: Pan</p>
                    <p>Scroll: Zoom</p>
                 </div>
              </div>
           </div>
        )}
      </main>
    </div>
  )
}

export default App;
