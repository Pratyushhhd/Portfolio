import { useState, useCallback, useEffect, lazy, Suspense } from 'react';

// Chat UI is code-split: nothing loads until the visitor first opens the assistant.
const ChatWindow = lazy(() => import('./ChatWindow'));

export default function PortfolioAssistant() {
    const [open, setOpen] = useState(false);
    const [everOpened, setEverOpened] = useState(false);
    const [pendingPrompt, setPendingPrompt] = useState(null);

    // External trigger (e.g. Tech Stack orbit "Ask AI about this"):
    // window.dispatchEvent(new CustomEvent('portfolio-ai:open', { detail: { prompt } }))
    useEffect(() => {
        const onOpen = (e) => {
            setPendingPrompt(e.detail?.prompt || null);
            setEverOpened(true);
            setOpen(true);
        };
        window.addEventListener('portfolio-ai:open', onOpen);
        return () => window.removeEventListener('portfolio-ai:open', onOpen);
    }, []);

    const toggle = useCallback(() => {
        setOpen(prev => {
            if (!prev) setEverOpened(true);
            return !prev;
        });
    }, []);

    const close = useCallback(() => setOpen(false), []);

    return (
        <>
            {everOpened && (
                <Suspense fallback={null}>
                    <ChatWindow
                        open={open}
                        onClose={close}
                        pendingPrompt={pendingPrompt}
                        onPendingConsumed={() => setPendingPrompt(null)}
                    />
                </Suspense>
            )}
            {!open && (
                <button
                    type="button"
                    className="ai-fab"
                    onClick={toggle}
                    aria-label="Open Ask Pratyush AI chat assistant"
                    aria-expanded={open}
                    title="Ask Pratyush AI"
                >
                    <span className="ai-fab-icon" aria-hidden="true">✦</span>
                    <span className="ai-fab-text">Ask Pratyush AI</span>
                </button>
            )}
        </>
    );
}
