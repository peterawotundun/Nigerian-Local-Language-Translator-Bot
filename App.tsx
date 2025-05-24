import React from 'react';
import Header from './components/Header';
import TranslatorApp from './components/TranslatorApp';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="py-8">
        <TranslatorApp />
      </main>
      
      <footer className="py-6 text-center text-gray-600 text-sm">
        <p>Nigerian Language Translator Bot &copy; {new Date().getFullYear()}</p>
        <p className="mt-1 text-xs">
          <span>Supported languages: English, Igbo, Yoruba, Hausa</span>
        </p>
      </footer>
    </div>
  );
}

export default App;