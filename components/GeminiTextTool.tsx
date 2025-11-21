import React, { useState } from 'react';
import { Loader2, Sparkles, Copy } from 'lucide-react';
import { generateBrandCopy } from '../services/geminiService';

interface GeminiTextToolProps {
  theme: 'dark' | 'light';
}

const GeminiTextTool: React.FC<GeminiTextToolProps> = ({ theme }) => {
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<'email' | 'social' | 'description'>('social');
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState('');

  const isDark = theme === 'dark';
  const textClass = isDark ? 'text-white' : 'text-black';
  const borderClass = isDark ? 'border-gray-700' : 'border-gray-300';
  const inputBg = isDark ? 'bg-black/40' : 'bg-white/40';

  const handleGenerate = async () => {
    if (!topic) return;
    setIsLoading(true);
    setOutput('');
    try {
      const text = await generateBrandCopy(topic, type);
      setOutput(text);
    } catch (error) {
      alert("Failed to generate copy.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-8 p-6">
      {/* Input */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className={`text-xs uppercase tracking-widest opacity-50 ${textClass}`}>Content Type</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value as any)}
            className={`bg-transparent border-b py-2 ${textClass} focus:border-[#A78F6B] focus:outline-none appearance-none ${borderClass}`}
          >
            <option value="social" className="text-black">Instagram Caption</option>
            <option value="email" className="text-black">Client Email</option>
            <option value="description" className="text-black">Project Description</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className={`text-xs uppercase tracking-widest opacity-50 ${textClass}`}>Topic / Subject</label>
          <input 
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Launch of the Brutalist Sea Villa..."
            className={`bg-transparent border-b py-2 ${textClass} focus:border-[#A78F6B] focus:outline-none ${borderClass}`}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !topic}
          className={`mt-8 py-4 border border-[#A78F6B] text-[#A78F6B] hover:bg-[#A78F6B] ${isDark ? 'hover:text-black' : 'hover:text-white'} transition-all font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 rounded`}
        >
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
          {isLoading ? 'Thinking...' : 'Draft Copy'}
        </button>
        
        <p className="text-[10px] text-gray-500 mt-2">
            *Powered by gemini-3-pro-preview with thinkingBudget: 32768.
        </p>
      </div>

      {/* Output */}
      <div className={`w-full lg:w-2/3 min-h-[300px] rounded-lg border-l-2 border-[#A78F6B] p-8 relative transition-colors ${inputBg} backdrop-blur-md`}>
        {output ? (
          <div className="prose prose-sm max-w-none">
            <div className={`whitespace-pre-wrap font-light leading-relaxed ${textClass}`}>
                {output}
            </div>
            <button 
                onClick={() => navigator.clipboard.writeText(output)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[#A78F6B] transition-colors"
            >
                <Copy size={16} />
            </button>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm italic">
            Waiting for brand input...
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiTextTool;