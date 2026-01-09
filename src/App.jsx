import React from 'react';
import TypingArea from './components/TypingArea';
import StatsDisplay from './components/StatsDisplay';
import ResultsModal from './components/ResultsModal';
import { useTypingEngine } from './hooks/useTypingEngine';
import { Keyboard } from 'lucide-react';

function App() {
  const { text, input, wpm, accuracy, isFinished, handleInput, reset } = useTypingEngine();

  return (
    <div className="min-h-screen bg-cyber-black text-white selection:bg-cyber-blue/30 selection:text-white flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center gap-3">
        <Keyboard className="text-cyber-green" size={32} />
        <h1 className="text-2xl font-bold tracking-tight">VeloType</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <StatsDisplay wpm={wpm} accuracy={accuracy} />
          <TypingArea
            text={text}
            input={input}
            onInput={handleInput}
            isFinished={isFinished}
          />

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Start typing to begin • Click text to focus</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} VeloType. Built for speed.</p>
      </footer>

      {/* Results Modal */}
      {isFinished && (
        <ResultsModal
          wpm={wpm}
          accuracy={accuracy}
          onRestart={reset}
        />
      )}
    </div>
  );
}

export default App;
