import { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '../Icon';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';
import { getLocalReply } from './localBrain';

const API_URL = import.meta.env.VITE_AI_API_URL;
const MAX_LEN = 500;

const WELCOME_TEXT =
    "Hi! I'm Pratyush's AI portfolio assistant. Ask me anything about his projects, skills, technologies, or experience.";

const DEFAULT_SUGGESTIONS = [
    'What projects has Pratyush built?',
    'What technologies does he use?',
    'Tell me about Bachat',
    'Why should I hire Pratyush?',
];

const ERROR_TEXT =
    "I'm having trouble connecting right now. You can still explore Pratyush's portfolio or contact him directly.";

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export default function ChatWindow({ open, onClose, pendingPrompt, onPendingConsumed }) {
    const [messages, setMessages] = useState(() => [{ role: 'ai', text: WELCOME_TEXT, links: [] }]);
    const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS);
    const [input, setInput] = useState('');
    const [thinking, setThinking] = useState(false);
    const lastUser = useRef('');
    const logRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const t = setTimeout(() => inputRef.current?.focus(), 350);
        return () => { document.body.style.overflow = prevOverflow; clearTimeout(t); };
    }, [open]);

    useEffect(() => {
        const el = logRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages, thinking]);

    const getReply = useCallback(async (text) => {
        if (API_URL) {
            const conversation = messages
                .filter(m => m.role === 'user' || m.role === 'ai')
                .slice(-8)
                .map(({ role, text: t }) => ({ role: role === 'user' ? 'user' : 'assistant', content: t }));
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, conversation }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            return { text: data.reply, links: data.links || [], suggestions: data.suggestions || DEFAULT_SUGGESTIONS };
        }
        await sleep(550 + Math.random() * 400);
        return getLocalReply(text);
    }, [messages]);

    const send = useCallback(async (raw) => {
        const text = raw.trim().slice(0, MAX_LEN);
        if (!text || thinking) return;
        lastUser.current = text;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text }]);
        setSuggestions([]);
        setThinking(true);
        try {
            const reply = await getReply(text);
            setMessages(prev => [...prev, { role: 'ai', ...reply }]);
            setSuggestions(reply.suggestions || []);
        } catch {
            setMessages(prev => [...prev, { role: 'error', text: ERROR_TEXT }]);
        } finally {
            setThinking(false);
        }
    }, [getReply, thinking]);

    const retry = () => {
        setMessages(prev => {
            const copy = [...prev];
            if (copy.length && copy[copy.length - 1].role === 'error') copy.pop();
            return copy;
        });
        send(lastUser.current);
    };

    const navigate = (target) => {
        onClose();
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // Auto-send context prompts handed over from other sections (e.g. Tech Stack orbit)
    useEffect(() => {
        if (!open || !pendingPrompt) return;
        const t = setTimeout(() => {
            send(pendingPrompt);
            onPendingConsumed?.();
        }, 0);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, pendingPrompt]);

    const clearChat = () => {
        setMessages([{ role: 'ai', text: WELCOME_TEXT, links: [] }]);
        setSuggestions(DEFAULT_SUGGESTIONS);
        setInput('');
    };

    return (
        <div className={`chat-window ${open ? 'open' : ''}`} role="dialog" aria-label="Ask Pratyush AI chat" aria-hidden={!open}>
            <header className="chat-header">
                <div className="chat-header-info">
                    <span className="ai-avatar header-avatar" aria-hidden="true">✦</span>
                    <div>
                        <h3>Ask Pratyush AI</h3>
                        <p><span className="status-dot" aria-hidden="true"></span> Explore my work, skills &amp; projects</p>
                    </div>
                </div>
                <div className="chat-header-actions">
                    <button type="button" className="chat-icon-btn" onClick={clearChat} aria-label="Clear conversation" title="Clear chat">
                        <Icon name="trash-can"></Icon>
                    </button>
                    <button type="button" className="chat-icon-btn" onClick={onClose} aria-label="Close chat" title="Close">
                        <Icon name="xmark"></Icon>
                    </button>
                </div>
            </header>

            <div className="chat-log" ref={logRef} role="log" aria-live="polite" aria-label="Conversation">
                {messages.map((m, i) => (
                    <ChatMessage key={i} msg={{ ...m, onRetry: m.role === 'error' ? retry : undefined }} onNavigate={navigate} />
                ))}
                {thinking && <TypingIndicator />}
            </div>

            <footer className="chat-footer">
                {!thinking && suggestions.length > 0 && (
                    <SuggestedQuestions questions={suggestions} onPick={send} />
                )}
                <form
                    className="chat-input-row"
                    onSubmit={(e) => { e.preventDefault(); send(input); }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        className="chat-input"
                        placeholder="Ask about skills, projects..."
                        value={input}
                        maxLength={MAX_LEN}
                        onChange={(e) => setInput(e.target.value)}
                        aria-label="Type your question"
                    />
                    <button type="submit" className="chat-send" disabled={!input.trim() || thinking} aria-label="Send message">
                        <Icon name="paper-plane"></Icon>
                    </button>
                </form>
                <p className="chat-disclaimer">Answers come only from this portfolio's verified info.</p>
            </footer>
        </div>
    );
}
