document.addEventListener("DOMContentLoaded", function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const copyButton = document.querySelector('.btn');

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

    inputText.addEventListener('input', function() {
        outputText.value = translateToMorse(inputText.value);
    });

    copyButton.addEventListener('click', function() {
        copyTextToClipboard(outputText.value);
        showSuccessMessage('showSuccessMessage', 'Copied to clipboard!');
    });
});

const translateMorseToText = (morseText) => { 
    const morseWords = morseText.split('/'); 
    const translatedWords = 
        morseWords.map((morseWord) => { 
            const morseChars = morseWord.split(' '); 
            return morseChars 
                .map((morseChar) => { 
                    return reverseMorseCode[morseChar] 
                        || morseChar; 
                }) 
                .join(''); 
        }); 
    return translatedWords.join(' '); 
}; 

const showSuccessMessage = (elementId, message) => { 
    const successMessage = document.getElementById(elementId); 
    successMessage.textContent = message; 
    setTimeout(() => { 
        successMessage.textContent = ''; 
    }, 2000); // Clear the message after 2 seconds 
}; 

const copyTextToClipboard = (text) => { 
    const textArea = document.createElement("textarea"); 
    textArea.value = text; 
    document.body.appendChild(textArea); 
    textArea.select(); 
    document.execCommand('copy'); 
    document.body.removeChild(textArea); 
};
