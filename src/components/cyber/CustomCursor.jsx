import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const fine = window.matchMedia('(pointer: fine)').matches;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!fine || reduced) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        let raf;
        let tx = -100;
        let ty = -100;
        let rx = -100;
        let ry = -100;

        const onMove = (e) => {
            tx = e.clientX;
            ty = e.clientY;
            dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        };

        const onOver = (e) => {
            const interactive = e.target.closest?.('a, button, [role="button"], input, textarea, select');
            ring.classList.toggle('is-hover', !!interactive);
        };

        const loop = () => {
            rx += (tx - rx) * 0.16;
            ry += (ty - ry) * 0.16;
            ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
            raf = requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseover', onOver, { passive: true });
        raf = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div className="cyber-cursor" aria-hidden="true">
            <div ref={dotRef} className="cc-dot"></div>
            <div ref={ringRef} className="cc-ring"></div>
        </div>
    );
}
