const textPhrases = [
    "The concept of open-source software has completely revolutionized the technology industry. By allowing anyone to inspect and modify the source code, developers can collaborate to build incredibly robust systems.",
    "Space exploration has always been one of humanity's greatest ambitions. From the early days of observing the stars to landing on the moon, our desire to understand the universe remains insatiable.",
    "Artificial intelligence is rapidly transforming every aspect of our daily lives. Machine learning algorithms can analyze vast amounts of data to identify patterns that are completely invisible to the human eye.",
    "Learning to type quickly and accurately without looking at the keyboard is an incredibly valuable skill. Touch typing relies on muscle memory, allowing your fingers to instinctively find the right keys.",
    "The industrial revolution marked a major turning point in history, transitioning societies from agrarian economies to industrialized urban centers. The invention of the steam engine led to unprecedented economic growth."
];

let currentPhrase = "";
let characters = [];
let currentIndex = 0;
let startTime = null;
let timerInterval = null;
let isTestActive = false;
let errors = 0;
let totalTyped = 0;

const textDisplay = document.getElementById('textDisplay');
const hiddenInput = document.getElementById('hiddenInput');
const timeDisplay = document.getElementById('timeDisplay');
const wpmDisplay = document.getElementById('wpmDisplay');
const accuracyDisplay = document.getElementById('accuracyDisplay');
const restartBtn = document.getElementById('restartBtn');
const resultsModal = document.getElementById('resultsModal');
const playAgainBtn = document.getElementById('playAgainBtn');

function init() {
    loadNewPhrase();
    hiddenInput.addEventListener('input', handleInput);
    
    // Focus the hidden input when clicking anywhere in the typing area
    document.getElementById('typingArea').addEventListener('click', () => {
        hiddenInput.focus();
    });

    restartBtn.addEventListener('click', resetTest);
    playAgainBtn.addEventListener('click', () => {
        resultsModal.classList.remove('show');
        resetTest();
    });

    // Make sure we focus input initially
    document.addEventListener('keydown', () => hiddenInput.focus());
}

function loadNewPhrase() {
    currentPhrase = textPhrases[Math.floor(Math.random() * textPhrases.length)];
    textDisplay.innerHTML = '';
    characters = [];
    
    currentPhrase.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.classList.add('char');
        if(index === 0) span.classList.add('current');
        textDisplay.appendChild(span);
        characters.push(span);
    });
    
    hiddenInput.value = '';
}

function handleInput(e) {
    if (!isTestActive && hiddenInput.value.length === 1) {
        startTest();
    }

    const typedValue = hiddenInput.value;
    const typedChar = typedValue[typedValue.length - 1];

    if (typedValue.length === 0) {
        // Backspace handling to reset
        characters.forEach(span => span.className = 'char');
        characters[0].classList.add('current');
        currentIndex = 0;
        return;
    }

    // Handle backspace
    if (typedValue.length < currentIndex) {
        currentIndex--;
        characters[currentIndex].className = 'char current';
        if(characters[currentIndex + 1]) {
            characters[currentIndex + 1].className = 'char';
        }
        return;
    }

    // Prevent typing beyond the length
    if (currentIndex >= characters.length) {
        hiddenInput.value = typedValue.substring(0, characters.length);
        return;
    }

    const expectedChar = currentPhrase[currentIndex];
    
    characters[currentIndex].classList.remove('current');

    if (typedChar === expectedChar) {
        characters[currentIndex].classList.add('correct');
    } else {
        characters[currentIndex].classList.add('incorrect');
        errors++;
    }

    totalTyped++;
    currentIndex++;

    if (currentIndex < characters.length) {
        characters[currentIndex].classList.add('current');
    } else {
        completeTest();
    }

    updateLiveStats();
}

function startTest() {
    isTestActive = true;
    startTime = Date.now();
    errors = 0;
    totalTyped = 0;
    
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        timeDisplay.innerText = elapsed;
        updateLiveStats();
    }, 1000);
}

function updateLiveStats() {
    if(!startTime) return;
    
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    if (elapsedMinutes <= 0) return;

    // Standard WPM calculation (5 chars = 1 word)
    const grossWpm = Math.round((totalTyped / 5) / elapsedMinutes);
    const netWpm = Math.round(((totalTyped - errors) / 5) / elapsedMinutes);
    
    const displayWpm = Math.max(0, netWpm);
    wpmDisplay.innerText = displayWpm;

    const accuracy = totalTyped === 0 ? 100 : Math.round(((totalTyped - errors) / totalTyped) * 100);
    accuracyDisplay.innerText = accuracy;
}

function completeTest() {
    isTestActive = false;
    clearInterval(timerInterval);
    hiddenInput.blur();

    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const elapsedMinutes = elapsedSeconds / 60;
    const netWpm = Math.round(((characters.length - errors) / 5) / elapsedMinutes);
    const displayWpm = Math.max(0, netWpm);
    const accuracy = Math.round(((characters.length - errors) / characters.length) * 100);

    document.getElementById('finalWpm').innerText = displayWpm;
    document.getElementById('finalAccuracy').innerText = accuracy + '%';
    document.getElementById('finalTime').innerText = elapsedSeconds + 's';
    document.getElementById('finalChars').innerText = `${characters.length - errors} / ${characters.length}`;

    resultsModal.classList.add('show');
}

function resetTest() {
    isTestActive = false;
    clearInterval(timerInterval);
    startTime = null;
    currentIndex = 0;
    errors = 0;
    totalTyped = 0;
    
    timeDisplay.innerText = '0';
    wpmDisplay.innerText = '0';
    accuracyDisplay.innerText = '100';
    
    loadNewPhrase();
    hiddenInput.focus();
}

document.addEventListener('DOMContentLoaded', init);
