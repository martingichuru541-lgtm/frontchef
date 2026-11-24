import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, RefreshCw, X, Check, Image as ImageIcon } from 'lucide-react';
import { FRIDGE_PRESETS, FridgePreset } from '../data/presets.ts';

interface FridgeScannerProps {
  onAnalyzeImage: (imageBase64: string, presetId?: string) => Promise<void>;
  isAnalyzing: boolean;
  onClose?: () => void;
  selectedPresetId?: string;
}

export const FridgeScanner: React.FC<FridgeScannerProps> = ({
  onAnalyzeImage,
  isAnalyzing,
  onClose,
  selectedPresetId,
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'camera' | 'presets'>('presets');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Webcam Camera Handlers
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access camera. Please allow camera permissions or upload a photo instead.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setPreviewImage(dataUrl);
      stopCamera();
    }
  };

  const handlePresetSelect = (preset: FridgePreset) => {
    onAnalyzeImage('', preset.id);
  };

  const handleConfirmCustomAnalysis = () => {
    if (previewImage) {
      onAnalyzeImage(previewImage);
    }
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden text-stone-100">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-400" />
              Smart Fridge Visual Scanner
            </h2>
            <span className="text-[11px] px-2 py-0.5 font-medium bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
              Gemini Vision
            </span>
          </div>
          <p className="text-sm text-stone-400 mt-1">
            Snap your open fridge or choose a curated sample to instantly reveal ingredients & tailored recipes.
          </p>
        </div>

        {onClose && (
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
            aria-label="Close Scanner"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mode Switcher */}
      <div className="flex rounded-xl bg-stone-950/80 p-1 border border-stone-800 mb-6 max-w-md">
        <button
          onClick={() => {
            stopCamera();
            setActiveMode('presets');
          }}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition ${
            activeMode === 'presets'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          Curated Samples
        </button>
        <button
          onClick={() => {
            stopCamera();
            setActiveMode('upload');
          }}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition ${
            activeMode === 'upload'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          Upload Photo
        </button>
        <button
          onClick={() => {
            setActiveMode('camera');
            startCamera();
          }}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition ${
            activeMode === 'camera'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          Live Camera
        </button>
      </div>

      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="py-12 flex flex-col items-center justify-center space-y-4 bg-stone-950/60 rounded-xl border border-stone-800">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
            <Sparkles className="w-6 h-6 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-white">AI Vision Scanning Refrigerator...</p>
            <p className="text-xs text-stone-400 mt-1">
              Identifying fresh produce, proteins, dairy, and composing gourmet recipes
            </p>
          </div>
        </div>
      )}

      {/* MODE 1: Curated Samples */}
      {!isAnalyzing && activeMode === 'presets' && (
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Select a sample fridge to test immediately:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FRIDGE_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset)}
                  className={`group cursor-pointer rounded-xl border overflow-hidden transition-all duration-200 ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-950/20 shadow-lg'
                      : 'border-stone-800 hover:border-emerald-500/50 bg-stone-950/50 hover:bg-stone-950'
                  }`}
                >
                  <div className="h-32 w-full overflow-hidden relative">
                    <img
                      src={preset.photoUrl}
                      alt={preset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-xl">{preset.thumbnail}</span>
                    {isSelected && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold bg-emerald-500 text-stone-950 rounded-full flex items-center gap-1 shadow">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-stone-100 text-sm group-hover:text-emerald-400 transition">
                      {preset.name}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                      {preset.subtitle}
                    </p>
                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-800/60 text-[11px] text-stone-400">
                      <span>{preset.ingredients.length} items detected</span>
                      <span className="text-emerald-400 font-medium group-hover:underline flex items-center gap-1">
                        Analyze <Sparkles className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: Upload Photo */}
      {!isAnalyzing && activeMode === 'upload' && (
        <div className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {!previewImage ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-emerald-400 bg-emerald-950/30'
                  : 'border-stone-700 hover:border-emerald-500/70 bg-stone-950/40 hover:bg-stone-950'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-stone-800 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-stone-200">
                Click to browse or drag & drop fridge photo
              </p>
              <p className="text-xs text-stone-400 mt-1">Supports JPG, PNG, WEBP up to 25MB</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-stone-700 max-h-72 flex items-center justify-center bg-black">
                <img
                  src={previewImage}
                  alt="Fridge Preview"
                  className="max-h-72 w-full object-contain"
                />
                <button
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-3 right-3 p-1.5 bg-stone-900/80 hover:bg-stone-900 text-stone-300 hover:text-white rounded-lg transition"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setPreviewImage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-300 hover:bg-stone-800 transition"
                >
                  Choose Different Photo
                </button>
                <button
                  onClick={handleConfirmCustomAnalysis}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md flex items-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  Analyze Photo with Gemini
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: Live Camera */}
      {!isAnalyzing && activeMode === 'camera' && (
        <div className="space-y-4">
          {cameraError ? (
            <div className="p-4 bg-amber-950/40 border border-amber-800 rounded-xl text-amber-200 text-sm">
              <p>{cameraError}</p>
              <button
                onClick={() => setActiveMode('upload')}
                className="mt-2 text-xs font-semibold text-amber-300 underline"
              >
                Switch to Upload Mode
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-black aspect-video max-h-80 flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-emerald-400/40 m-6 rounded-lg flex items-center justify-center">
                  <span className="text-[11px] bg-black/60 text-emerald-300 px-3 py-1 rounded-full font-mono">
                    Point camera at open fridge shelves
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    stopCamera();
                    setActiveMode('presets');
                  }}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-stone-200"
                >
                  Cancel
                </button>
                <button
                  onClick={capturePhoto}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition"
                >
                  <Camera className="w-4 h-4" />
                  Snap Fridge Photo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
