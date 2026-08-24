import { useState, useRef, useEffect } from 'react';

export default function ThemeSwitcher({ env, onChange }) {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onDoc = (e) => {
            if (!wrapRef.current?.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setOpen(false);
                btnRef.current?.focus();
            }
        };
        document.addEventListener('pointerdown', onDoc);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onDoc);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const pick = (value) => {
        onChange(value);
        setOpen(false);
    };

    return (
        <div className="theme-switcher" ref={wrapRef}>
            <button
                ref={btnRef}
                type="button"
                className={`theme-switcher-btn ${env === 'cyber' ? 'env-cyber' : ''}`}
                onClick={() => setOpen(o => !o)}
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="Choose visual environment"
            >
                <span className="ts-half" aria-hidden="true"></span>
                <span className="ts-btn-label">{env === 'cyber' ? 'Cyber' : 'Current'}</span>
            </button>

            {open && (
                <div className="theme-switcher-panel" role="radiogroup" aria-label="Developer environment">
                    <p className="ts-panel-title">Developer Environment</p>
                    <button
                        type="button"
                        role="radio"
                        aria-checked={env !== 'cyber'}
                        className={`ts-option ${env !== 'cyber' ? 'checked' : ''}`}
                        onClick={() => pick('default')}
                    >
                        <span className="ts-dot" aria-hidden="true"></span>
                        Current Theme
                    </button>
                    <button
                        type="button"
                        role="radio"
                        aria-checked={env === 'cyber'}
                        className={`ts-option ${env === 'cyber' ? 'checked' : ''}`}
                        onClick={() => pick('cyber')}
                    >
                        <span className="ts-dot" aria-hidden="true"></span>
                        Cyber
                    </button>
                </div>
            )}
        </div>
    );
}
