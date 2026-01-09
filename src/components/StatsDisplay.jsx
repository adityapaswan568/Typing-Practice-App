import React from 'react';

const StatsDisplay = ({ wpm, accuracy }) => {
    return (
        <div className="flex justify-center gap-8 md:gap-16 mb-8">
            <div className="text-center">
                <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">WPM</div>
                <div className="text-5xl font-bold text-cyber-blue font-mono">{wpm}</div>
            </div>
            <div className="text-center">
                <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Accuracy</div>
                <div className="text-5xl font-bold text-cyber-green font-mono">{accuracy}%</div>
            </div>
        </div>
    );
};

export default StatsDisplay;
