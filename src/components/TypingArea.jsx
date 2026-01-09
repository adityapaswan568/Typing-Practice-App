import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingArea = ({ text, input, onInput, isFinished }) => {
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    // Focus input on click or load
    useEffect(() => {
        if (!isFinished && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFinished]);

    const handleContainerClick = () => {
        if (inputRef.current) inputRef.current.focus();
    };

    return (
        <div
            className="relative w-full max-w-4xl mx-auto mt-10 p-8 rounded-xl bg-cyber-gray/50 backdrop-blur-sm border border-white/10 shadow-2xl cursor-text"
            onClick={handleContainerClick}
        >
            {/* Hidden Input for capturing keystrokes */}
            <textarea
                ref={inputRef}
                value={input}
                onChange={onInput}
                className="absolute inset-0 opacity-0 w-full h-full cursor-default resize-none"
                disabled={isFinished}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
            />

            {/* Text Display */}
            <div
                ref={containerRef}
                className="font-mono text-2xl md:text-3xl leading-relaxed break-words whitespace-pre-wrap select-none"
            >
                {text.split('').map((char, index) => {
                    let className = "text-gray-500 transition-colors duration-100";
                    if (index < input.length) {
                        className = input[index] === char
                            ? "text-cyber-green"
                            : "text-cyber-red bg-cyber-red/20 rounded-sm";
                    }

                    return (
                        <span key={index} className={`relative ${className}`}>
                            {/* Cursor */}
                            {index === input.length && !isFinished && (
                                <motion.span
                                    layoutId="cursor"
                                    className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-cyber-blue"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                />
                            )}
                            {char}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default TypingArea;
