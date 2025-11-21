import React, { useState } from 'react';
import { Loader2, Image as ImageIcon, Download } from 'lucide-react';
import { ImageResolution } from '../types';
import { generateArchitecturalImage } from '../services/geminiService';

interface GeminiImageToolProps {
  theme: 'dark' | 'light';
}

const GeminiImageTool: React.FC<GeminiImageToolProps> = ({ theme }) => {
  const [prompt, setPrompt] = useState('');
  const [resolution, setResolution] = useState<ImageResolution>(ImageResolution.RES_1K);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white/50 border-white/60';
  const textClass = isDark ? 'text-white' : 'text-black';
  const inputClass = isDark ? 'bg-black border-gray-800 text-white placeholder-gray-700' : 'bg-white border-gray-300 text-black placeholder-gray-400';

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    try {
      const url = await generateArchitecturalImage(prompt, resolution);
      setImageUrl(url);
    } catch (error) {
      alert("Failed to generate image. Check API Key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-8 items-start p-6">
      {/* Controls */}
      <div className={`w-full lg:w-1/3 flex flex-col gap-6 p-6 border rounded-lg backdrop-blur-sm transition-colors ${bgClass}`}>
        <div className="flex items-center gap-2 mb-4">
           <div className="w-2 h-2 bg-[#A78F6B] rounded-full"></div>
           <h3 className="text-sm uppercase tracking-widest text-[#A78F6B]">Studio Render Lab</h3>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className={`text-xs uppercase tracking-widest opacity-60 ${textClass}`}>Project Vision</label>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Concrete minimalist villa in a desert landscape at sunset..."
            className={`w-full h-32 border p-4 text-sm focus:border-[#A78F6B] focus:outline-none resize-none rounded ${inputClass}`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={`text-xs uppercase tracking-widest opacity-60 ${textClass}`}>Output Resolution</label>
          <div className="flex gap-2">
            {Object.values(ImageResolution).map((res) => (
              <button
                key={res}
                onClick={() => setResolution(res)}
                className={`flex-1 py-2 text-xs border rounded transition-colors ${
                  resolution === res 
                    ? 'border-[#A78F6B] text-[#A78F6B] bg-[#A78F6B]/10' 
                    : `border-transparent ${isDark ? 'text-gray-500 bg-black/40' : 'text-gray-500 bg-gray-200'} hover:border-[#A78F6B]/50`
                }`}
              >
                {res}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt}
          className="mt-4 w-full py-4 bg-[#A78F6B] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#8E7A5A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 rounded shadow-lg"
        >
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : <ImageIcon size={16} />}
          {isLoading ? 'Rendering...' : 'Generate Render'}
        </button>
      </div>

      {/* Display */}
      <div className={`w-full lg:w-2/3 h-[50vh] lg:h-full min-h-[400px] aspect-video ${isDark ? 'bg-black/50 border-[#333]' : 'bg-white/50 border-white/50'} border rounded-lg flex items-center justify-center relative overflow-hidden backdrop-blur-md`}>
        {imageUrl ? (
          <img src={imageUrl} alt="Generated Render" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 border rounded-full mb-4 ${isDark ? 'border-gray-800 text-gray-700' : 'border-gray-300 text-gray-400'}`}>
              <ImageIcon />
            </div>
            <p className={`text-sm tracking-wide opacity-60 ${textClass}`}>Awaiting Architectural Input</p>
            <p className="text-gray-500 text-xs mt-2 font-mono">gemini-3-pro-image-preview</p>
          </div>
        )}
        
        {imageUrl && (
             <a href={imageUrl} download="oastudio_render.png" className="absolute bottom-4 right-4 p-2 bg-black/50 text-white hover:bg-black transition-colors border border-white/20 rounded-full">
                 <Download size={20} />
             </a>
        )}
      </div>
    </div>
  );
};

export default GeminiImageTool;