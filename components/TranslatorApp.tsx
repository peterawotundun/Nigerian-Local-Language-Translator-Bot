import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LanguageSelector from './LanguageSelector';
import TextInput from './TextInput';
import TranslationResult from './TranslationResult';
import TranslationHistory from './TranslationHistory';
import { ArrowDown, ArrowRight, ArrowUpDown } from 'lucide-react';
import { Language, TranslationHistory as TranslationHistoryType } from '../types';
import { translateText } from '../utils/mockApi';

const TranslatorApp: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState<Language>('english');
  const [toLanguage, setToLanguage] = useState<Language>('igbo');
  const [isTranslating, setIsTranslating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [history, setHistory] = useState<TranslationHistoryType[]>([]);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim() || isTranslating) return;
    
    setIsTranslating(true);
    setTranslatedText('');
    setAudioUrl(undefined);
    
    try {
      const result = await translateText(inputText, fromLanguage, toLanguage);
      
      setTranslatedText(result.translatedText);
      setAudioUrl(result.audioUrl);
      
      // Add to history
      if (result.translatedText && !result.error) {
        const historyItem: TranslationHistoryType = {
          id: uuidv4(),
          originalText: inputText,
          translatedText: result.translatedText,
          fromLanguage,
          toLanguage,
          timestamp: new Date(),
        };
        
        setHistory((prev) => [historyItem, ...prev.slice(0, 9)]);
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  }, [inputText, fromLanguage, toLanguage, isTranslating]);

  const switchLanguages = () => {
    if (isTranslating) return;
    
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const selectFromHistory = (item: TranslationHistoryType) => {
    setFromLanguage(item.fromLanguage);
    setToLanguage(item.toLanguage);
    setInputText(item.originalText);
    setTranslatedText(item.translatedText);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <LanguageSelector
              label="Translate from"
              value={fromLanguage}
              onChange={setFromLanguage}
              disabled={isTranslating}
            />
            <div className="mt-3">
              <TextInput
                value={inputText}
                onChange={setInputText}
                language={fromLanguage}
                isTranslating={isTranslating}
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <LanguageSelector
                label="Translate to"
                value={toLanguage}
                onChange={setToLanguage}
                disabled={isTranslating}
              />
              
              <button
                onClick={switchLanguages}
                disabled={isTranslating || !translatedText}
                className="mt-7 p-2 text-gray-500 hover:text-green-500 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Switch languages"
              >
                <ArrowUpDown size={20} />
              </button>
            </div>
            
            <div className="mt-3">
              <TranslationResult
                text={translatedText}
                isLoading={isTranslating}
                language={toLanguage}
                audioUrl={audioUrl}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || isTranslating || fromLanguage === toLanguage}
            className="flex items-center px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Translate
            {isTranslating ? (
              <ArrowDown size={16} className="ml-2 animate-bounce" />
            ) : (
              <ArrowRight size={16} className="ml-2" />
            )}
          </button>
        </div>
        
        <TranslationHistory history={history} onSelect={selectFromHistory} />
      </div>
    </div>
  );
};

export default TranslatorApp;