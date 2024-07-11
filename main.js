document.addEventListener("DOMContentLoaded", function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    const morseCode = {
        'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.',
        'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---',
        'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---',
        'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-',
        'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--',
        'z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
        '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
        '0': '-----', ' ': '/'
    };

    function translateToMorse(text) {
        return text.toLowerCase().split('').map(char => morseCode[char] || '').join(' ');
    }

    inputText.addEventListener('input', function() {
        outputText.value = translateToMorse(inputText.value);
    });
});