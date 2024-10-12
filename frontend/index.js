import { backend } from 'declarations/backend';

const inputText = document.getElementById('inputText');
const targetLanguage = document.getElementById('targetLanguage');
const translationOutput = document.getElementById('translationOutput');
const speakButton = document.getElementById('speakButton');

let translationTimeout;

inputText.addEventListener('input', () => {
    clearTimeout(translationTimeout);
    translationTimeout = setTimeout(translateText, 500);
});

targetLanguage.addEventListener('change', translateText);

speakButton.addEventListener('click', speakTranslation);

async function translateText() {
    const text = inputText.value;
    const lang = targetLanguage.value;

    if (text.trim() === '') {
        translationOutput.textContent = '';
        return;
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const translation = data.responseData.translatedText;
        translationOutput.textContent = translation;

        // Store the translation in the backend
        await backend.storeTranslation(lang, translation);
    } catch (error) {
        console.error('Translation error:', error);
        translationOutput.textContent = 'Translation error occurred.';
    }
}

function speakTranslation() {
    const text = translationOutput.textContent;
    const lang = targetLanguage.value;

    if (text.trim() === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
}

// Load the last translation on page load
window.addEventListener('load', async () => {
    const lang = targetLanguage.value;
    const lastTranslation = await backend.getTranslation(lang);
    if (lastTranslation) {
        translationOutput.textContent = lastTranslation;
    }
});
