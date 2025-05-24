import React, { useState } from 'react';
import { Mic, X, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { speechToText } from '../utils/mockApi';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  language: Language;
  placeholder?: string;
  isTranslating: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  language,
  placeholder = 'Enter text to translate...',
  isTranslating,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const clearText = () => {
    onChange('');
  };

  const simulateRecording = async () => {
    if (isRecording || isTranslating) return;

    setIsRecording(true);
    
    // In a real implementation, this would use the browser's MediaRecorder API
    // to record audio from the microphone
    setTimeout(() => {
      setIsRecording(false);
      setIsTranscribing(true);
      
      // Simulate transcription with speechToText function
      speechToText(new Blob(), language)
        .then((text) => {
          onChange(text);
          setIsTranscribing(false);
        })
        .catch(() => {
          setIsTranscribing(false);
        });
    }, 2000);
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={handleTextChange}
        placeholder={placeholder}
        disabled={isTranslating || isRecording || isTranscribing}
        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
      />
      
      <div className="absolute bottom-2 right-2 flex space-x-2">
        {value && (
          <button
            onClick={clearText}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
            title="Clear text"
          >
            <X size={20} />
          </button>
        )}
        
        <button
          onClick={simulateRecording}
          disabled={isRecording || isTranscribing || isTranslating}
          className={`p-2 rounded-full transition-colors ${
            isRecording
              ? 'bg-red-500 text-white animate-pulse'
              : 'text-gray-500 hover:text-green-500 hover:bg-gray-100'
          } ${(isTranscribing || isTranslating) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          title="Record voice"
        >
          {isRecording ? (
            <Mic size={20} className="animate-pulse" />
          ) : isTranscribing ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Mic size={20} />
          )}
        </button>
      </div>
      
      {isTranscribing && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
          <div className="flex flex-col items-center">
            <Loader2 size={24} className="animate-spin text-green-600 mb-2" />
            <p className="text-sm font-medium text-gray-700">Transcribing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextInput;