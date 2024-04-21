import { useState, useEffect } from 'react';

const useShortenText = (text: string = '', maxLength: number = 6): string => {
    const [shortenedText, setShortenedText] = useState<string>('');

    // Function to shorten the text to the specified number of words
    const shortenText = (text: string, maxLength: number): string => {
        const words: string[] = text.split(' ');
        const shortenedWords: string[] = words.slice(0, maxLength);
        return shortenedWords.join(' ');
    };

    // Call the function to shorten the text when the component mounts or when the text changes
    useEffect(() => {
        setShortenedText(shortenText(text, maxLength));
    }, [text, maxLength]);

    return shortenedText;
};

export default useShortenText;
