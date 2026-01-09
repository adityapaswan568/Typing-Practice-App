import { useState, useEffect, useCallback } from 'react';

const WORDS = [
    "the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "i", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"
];

function generateText(wordCount = 30) {
    return Array.from({ length: wordCount }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(' ');
}

export function useTypingEngine() {
    const [text, setText] = useState(() => generateText());
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isFinished, setIsFinished] = useState(false);

    const calculateStats = useCallback(() => {
        if (!startTime) return;

        const now = endTime || Date.now();
        const durationInMinutes = (now - startTime) / 60000;

        if (durationInMinutes <= 0) return;

        const wordsTyped = input.length / 5;
        const currentWpm = Math.round(wordsTyped / durationInMinutes);

        // Accuracy
        let errors = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== text[i]) errors++;
        }
        const currentAccuracy = Math.max(0, Math.round(((input.length - errors) / input.length) * 100));

        setWpm(currentWpm);
        setAccuracy(isNaN(currentAccuracy) ? 100 : currentAccuracy);
    }, [input, startTime, endTime, text]);

    // Timer effect to update stats intervally while running
    useEffect(() => {
        if (startTime && !isFinished) {
            const interval = setInterval(calculateStats, 500);
            return () => clearInterval(interval);
        }
    }, [startTime, isFinished, calculateStats]);

    const handleInput = (e) => {
        if (isFinished) return;

        const value = e.target.value;

        // Start timer on first char
        if (!startTime && value.length === 1) {
            setStartTime(Date.now());
        }

        setInput(value);

        // Check completion
        if (value.length >= text.length) {
            setEndTime(Date.now());
            setIsFinished(true);
            calculateStats(); // Final calc
        }
    };

    const reset = () => {
        setText(generateText());
        setInput("");
        setStartTime(null);
        setEndTime(null);
        setWpm(0);
        setAccuracy(100);
        setIsFinished(false);
    };

    return {
        text,
        input,
        wpm,
        accuracy,
        isFinished,
        handleInput,
        reset
    };
}
