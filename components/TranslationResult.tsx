import React, { useState, useEffect } from 'react';
import { Play, Pause, Loader2, Copy, Check } from 'lucide-react';
import { Language } from '../types';

interface TranslationResultProps {
  text: string;
  isLoading: boolean;
  language: Language;
  audioUrl?: string;
}

const TranslationResult: React.FC<TranslationResultProps> = ({
  text,
  isLoading,
  language,
  audioUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioUrl) {
      // In a real implementation, this would be a real audio URL
      const newAudio = new Audio();
      
      // Set up audio event listeners
      newAudio.onplay = () => setIsPlaying(true);
      newAudio.onpause = () => setIsPlaying(false);
      newAudio.onended = () => setIsPlaying(false);
      
      setAudio(newAudio);
      
      return () => {
        newAudio.pause();
        setAudio(null);
      };
    }
  }, [audioUrl]);

  const toggleAudio = () => {
    if (!audio || !audioUrl) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      // Simulate audio playing (without actually loading an audio file)
      audio.play().catch(() => {
        // In development, this will fail because we don't have a real audio file
        // Let's simulate playback
        setIsPlaying(true);
        setTimeout(() => {
          setIsPlaying(false);
        }, 3000);
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isLoading) {
    return (
      <div className="h-32 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 size={24} className="animate-spin text-green-600 mb-2" />
          <p className="text-sm font-medium text-gray-700">Translating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-32 p-4 border border-gray-300 rounded-lg bg-white">
      {text ? (
        <>
          <p className="pr-16">{text}</p>
          
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-500 hover:text-green-500 hover:bg-gray-100 rounded-full transition-colors"
              title={copied ? "Copied!" : "Copy to clipboard"}
            >
              {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            </button>
            
            {audioUrl && language !== 'english' && (
              <button
                onClick={toggleAudio}
                disabled={!text}
                className={`p-2 rounded-full transition-colors ${
                  isPlaying
                    ? 'bg-green-500 text-white'
                    : 'text-gray-500 hover:text-green-500 hover:bg-gray-100'
                }`}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-400 text-center py-8">Translation will appear here</p>
      )}
    </div>
  );
};

export default TranslationResult;