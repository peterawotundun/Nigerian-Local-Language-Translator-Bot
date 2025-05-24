import React from 'react';
import { TranslationHistory as TranslationHistoryType } from '../types';
import { ArrowRight } from 'lucide-react';

interface TranslationHistoryProps {
  history: TranslationHistoryType[];
  onSelect: (item: TranslationHistoryType) => void;
}

const TranslationHistory: React.FC<TranslationHistoryProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Translation History</h2>
      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <span className="font-medium capitalize">{item.fromLanguage}</span>
              <ArrowRight size={14} className="mx-2" />
              <span className="font-medium capitalize">{item.toLanguage}</span>
              <span className="ml-auto text-xs">
                {new Date(item.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <p className="text-gray-700 line-clamp-1">{item.originalText}</p>
              <p className="text-green-600 font-medium line-clamp-1">{item.translatedText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranslationHistory;