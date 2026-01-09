import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RefreshCcw } from 'lucide-react';

const ResultsModal = ({ wpm, accuracy, onRestart }) => {
    useEffect(() => {
        // Celebration confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-cyber-gray border border-white/10 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
            >
                <h2 className="text-3xl font-bold text-white mb-6">Test Complete!</h2>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-black/30 p-4 rounded-xl">
                        <div className="text-gray-400 text-sm">WPM</div>
                        <div className="text-4xl font-bold text-cyber-blue">{wpm}</div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl">
                        <div className="text-gray-400 text-sm">Accuracy</div>
                        <div className="text-4xl font-bold text-cyber-green">{accuracy}%</div>
                    </div>
                </div>

                <button
                    onClick={onRestart}
                    className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                    <RefreshCcw size={20} />
                    Play Again
                </button>
            </motion.div>
        </div>
    );
};

export default ResultsModal;
