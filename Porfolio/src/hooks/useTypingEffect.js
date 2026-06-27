import { useState, useEffect } from 'react';

export function useTypingEffect(words, typingSpeed = 100, deletingSpeed = 60, pause = 2000) {
    const [text, setText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeout;

        const type = () => {
            const word = words[wordIndex];
            if (!isDeleting && charIndex <= word.length) {
                setText(word.substring(0, charIndex));
                charIndex++;
                timeout = setTimeout(type, typingSpeed);
            } else if (isDeleting && charIndex >= 0) {
                setText(word.substring(0, charIndex));
                charIndex--;
                timeout = setTimeout(type, deletingSpeed);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
                timeout = setTimeout(type, isDeleting ? pause : 500);
            }
        };

        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        timeout = setTimeout(type, 500);

        return () => {
            clearTimeout(timeout);
            clearInterval(cursorInterval);
        };
    }, []);

    return { text, showCursor };
}
