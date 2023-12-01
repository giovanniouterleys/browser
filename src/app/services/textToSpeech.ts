
export async function textToSpeechAndPlay(text: string): Promise<void> {
    try {
        console.log('textToSpeechAndPlay', text);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        
        utterance.onstart = () => console.log("Début de la parole");
        utterance.onend = () => console.log("Fin de la parole");
        
        speechSynthesis.speak(utterance);
        
    } catch (error) {
        console.log(error)
    }
}

