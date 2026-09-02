import React, { useState } from 'react';

interface XRayModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  date?: string;
  imageUrl?: string;
}

export const XRayModal: React.FC<XRayModalProps> = ({
  isOpen,
  onClose,
  title = 'Panoramic X-Ray (Orthopantomogram)',
  date = 'Oct 12, 2023',
  imageUrl = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200'
}) => {
  const [zoom, setZoom] = useState(1);
  const [invert, setInvert] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#171717] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1e1b12] border border-amber-500/25 flex items-center justify-center text-[#fbbf24]">
              <span className="material-symbols-outlined">radiology</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">Diagnostic Imaging</span>
              <h3 className="text-base font-bold text-white leading-tight">{title}</h3>
              <p className="text-xs text-[#a1a1aa] mt-0.5">Captured on {date} • High-Resolution Digital Scan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#a1a1aa] hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Viewer Tools Bar */}
        <div className="px-6 py-2.5 bg-[#0d0d0d] border-b border-white/10 flex items-center justify-between flex-wrap gap-2 text-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.max(0.7, z - 0.2))}
              className="p-1.5 border border-white/10 rounded-lg hover:bg-white/5 text-zinc-300 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <span className="material-symbols-outlined text-[18px]">zoom_out</span>
            </button>
            <span className="text-xs font-mono w-12 text-center text-zinc-300">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
              className="p-1.5 border border-white/10 rounded-lg hover:bg-white/5 text-zinc-300 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <span className="material-symbols-outlined text-[18px]">zoom_in</span>
            </button>
            <button
              onClick={() => setZoom(1)}
              className="px-2.5 py-1 text-xs border border-white/10 rounded-lg hover:bg-white/5 text-zinc-300 transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setInvert(!invert)}
              className={`px-3 py-1 text-xs rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
                invert
                  ? 'bg-amber-500/15 border-amber-500/30 text-[#fbbf24]'
                  : 'border-white/10 text-zinc-300 hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">contrast</span>
              Invert Radiograph
            </button>
            <button
              onClick={() => setShowMarkers(!showMarkers)}
              className={`px-3 py-1 text-xs rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showMarkers
                  ? 'bg-amber-500/15 border-amber-500/30 text-[#fbbf24]'
                  : 'border-white/10 text-zinc-300 hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">pin_drop</span>
              Tooth Annotations
            </button>
          </div>
        </div>

        {/* Image Stage */}
        <div className="flex-1 bg-black p-4 flex items-center justify-center overflow-auto min-h-[340px] max-h-[500px] relative select-none">
          <div
            className="transition-transform duration-150 relative inline-block"
            style={{
              transform: `scale(${zoom})`,
              filter: invert ? 'invert(1) hue-rotate(180deg) contrast(1.2)' : 'contrast(1.1)'
            }}
          >
            <img
              src={imageUrl}
              alt="Dental Radiograph"
              className="max-w-full max-h-[460px] object-contain rounded-lg border border-white/10 shadow-2xl"
              referrerPolicy="no-referrer"
            />
            {showMarkers && (
              <div className="absolute right-[22%] bottom-[28%] animate-bounce">
                <div className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  #32 Impacted Molar
                </div>
                <div className="w-2.5 h-2.5 bg-red-600 rotate-45 mx-auto -mt-1"></div>
              </div>
            )}
          </div>
        </div>

        {/* Clinical Note Footer */}
        <div className="px-6 py-4 bg-[#171717] border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#fbbf24] tracking-wider">Radiologist Finding</span>
            <p className="text-xs text-[#a1a1aa] mt-0.5">
              Lower right 3rd molar impacted against root of tooth #31. No radiolucency suggesting cysts. Bone level acceptable.
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold rounded-full hover:brightness-105 transition-all shadow-md cursor-pointer"
          >
            Done Viewing
          </button>
        </div>
      </div>
    </div>
  );
};
