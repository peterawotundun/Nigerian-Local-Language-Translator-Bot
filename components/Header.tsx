import React from 'react';
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Globe size={28} className="text-white" />
          <div>
            <h1 className="text-xl font-bold">Nigerian Language Translator</h1>
            <p className="text-sm text-green-100">English ↔ Igbo ↔ Yoruba ↔ Hausa</p>
          </div>
        </div>
        
        <div className="hidden sm:block">
          <div className="flex items-center space-x-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-800 text-green-100">
              Igbo
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-800 text-green-100">
              Yoruba
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-800 text-green-100">
              Hausa
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;