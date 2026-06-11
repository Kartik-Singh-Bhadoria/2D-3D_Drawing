import React, { useCallback } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';

interface UploaderProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
}

export default function Uploader({ onUpload, isProcessing }: UploaderProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onUpload(e.dataTransfer.files[0]);
      }
    },
    [onUpload]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-10 transition-all ${isProcessing ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleChange} 
        className="hidden" 
        id="file-upload" 
        disabled={isProcessing}
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
        {isProcessing ? (
           <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        ) : (
           <UploadCloud className="w-12 h-12 text-slate-400 group-hover:text-slate-300 transition-colors" />
        )}
        <div className="space-y-1">
          <p className="text-lg font-medium">
             {isProcessing ? 'Processing Floorplan...' : 'Drag & Drop Floorplan Image'}
          </p>
          <p className="text-sm text-slate-500">
             {isProcessing ? 'Extracting walls using OpenCV' : 'or click to browse files (JPEG, PNG)'}
          </p>
        </div>
      </label>
    </div>
  );
}
