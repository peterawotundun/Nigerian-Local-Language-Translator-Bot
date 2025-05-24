import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  value: Language;
  onChange: (language: Language) => void;
  label: string;
  disabled?: boolean;
}

const languageOptions: { value: Language; label: string; flag: string }[] = [
  { value: 'english', label: 'English', flag: '🇬🇧' },
  { value: 'igbo', label: 'Igbo', flag: '🇳🇬' },
  { value: 'yoruba', label: 'Yoruba', flag: '🇳🇬' },
  { value: 'hausa', label: 'Hausa', flag: '🇳🇬' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {languageOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            disabled={disabled}
            className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg transition-all duration-200 ${
              value === option.value
                ? 'bg-green-600 text-white font-medium shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span className="text-lg">{option.flag}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;