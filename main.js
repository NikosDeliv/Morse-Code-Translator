document.addEventListener("DOMContentLoaded", function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const copyButton = document.querySelector('.btn');
    const translateSelect = document.getElementById('Translate');
    const playButton = document.getElementById('playButton');

    const morseCode = {
        'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.',
        'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---',
        'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---',
        'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-',
        'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--',
        'z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
        '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
        '0': '-----', ' ': '/', '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--'
    };

    const reverseMorseCode = {};
    for (const key in morseCode) {
        if (morseCode.hasOwnProperty(key)) {
            const value = morseCode[key];
            reverseMorseCode[value] = key;
        }
    }

    function translateToMorse(text) {
        return text.toLowerCase().split('').map(char => morseCode[char] || '').join(' ');
    }

    function translateMorseToText(morseText) {
        const morseWords = morseText.split('/');
        const translatedWords =
            morseWords.map((morseWord) => {
                const morseChars = morseWord.trim().split(' ');
                return morseChars
                    .map((morseChar) => {
                        return reverseMorseCode[morseChar] || '';
                    })
                    .join('');
            });
        return translatedWords.join(' ');
    }

    function updateTranslation() {
        const selectedOption = translateSelect.value;
        if (selectedOption === 'Text') {
            outputText.value = translateToMorse(inputText.value);
        } else if (selectedOption === 'Morse') {
            outputText.value = translateMorseToText(inputText.value);
        }
    }

    inputText.addEventListener('input', updateTranslation);
    translateSelect.addEventListener('change', updateTranslation);

    copyButton.addEventListener('click', function() {
        copyTextToClipboard(outputText.value);
        showSuccessMessage('showSuccessMessage', 'Copied to clipboard!');
    });

    playButton.addEventListener('click', function() { // Added event listener for play button
        playMorseCode(outputText.value);
    });

    const showSuccessMessage = (elementId, message) => {
        const successMessage = document.getElementById(elementId);
        successMessage.textContent = message;
        setTimeout(() => {
            successMessage.textContent = '';
        }, 2000);
    };

    const copyTextToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    };

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var ctx = new AudioContext();
    var dot = 1.2 / 15;

    function playMorseCode(morseCode) {
        var t = ctx.currentTime;

        var oscillator = ctx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = 600;

        var gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        gainNode.gain.setValueAtTime(0, t);

        morseCode.split("").forEach(function(letter) {
            switch (letter) {
                case '.':
                    gainNode.gain.setValueAtTime(1, t);
                    t += dot;
                    gainNode.gain.setValueAtTime(0, t);
                    t += dot;
                    break;
                case '-':
                    gainNode.gain.setValueAtTime(1, t);
                    t += 3 * dot;
                    gainNode.gain.setValueAtTime(0, t);
                    t += dot;
                    break;
                case ' ':
                    t += 3 * dot;
                    break;
                case '/':
                    t += 7 * dot;
                    break;
            }
        });

        oscillator.start();
        oscillator.stop(t);
    }
});
