import { useEffect, useRef } from 'react';

export default function CyberBackground() {
    const canvasRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf;
        let glowRaf;
        let W = 0;
        let H = 0;
        let running = false;
        let particles = [];

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.max(28, Math.min(64, Math.round((W * H) / 30000)));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.22,
                vy: (Math.random() - 0.5) * 0.22,
                r: Math.random() * 1.4 + 0.6,
                violet: Math.random() > 0.72,
            }));
        };

        const drawFrame = () => {
            ctx.clearRect(0, 0, W, H);
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.violet ? 'rgba(167, 139, 250, 0.5)' : 'rgba(34, 211, 238, 0.5)';
                ctx.fill();
            }
            const LINK = 110;
            const LINK2 = LINK * LINK;
            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < LINK2) {
                        const alpha = (1 - Math.sqrt(d2) / LINK) * 0.15;
                        ctx.strokeStyle = `rgba(34, 211, 238, ${alpha.toFixed(3)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const step = () => {
            if (!running) return;
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -20) p.x = W + 20;
                else if (p.x > W + 20) p.x = -20;
                if (p.y < -20) p.y = H + 20;
                else if (p.y > H + 20) p.y = -20;
            }
            drawFrame();
            raf = requestAnimationFrame(step);
        };

        const start = () => {
            if (!running && !reduced) {
                running = true;
                raf = requestAnimationFrame(step);
            }
        };
        const stop = () => {
            running = false;
            cancelAnimationFrame(raf);
        };
        const onVisibility = () => {
            if (document.hidden) stop();
            else start();
        };

        resize();
        window.addEventListener('resize', resize);
        if (reduced) {
            drawFrame();
        } else {
            start();
            document.addEventListener('visibilitychange', onVisibility);
        }

        const fine = window.matchMedia('(pointer: fine)').matches;
        const glow = glowRef.current;
        if (fine && !reduced && glow) {
            let gx = window.innerWidth / 2;
            let gy = window.innerHeight / 2;
            let tx = gx;
            let ty = gy;
            const onMove = (e) => {
                tx = e.clientX;
                ty = e.clientY;
            };
            const glowStep = () => {
                gx += (tx - gx) * 0.07;
                gy += (ty - gy) * 0.07;
                glow.style.transform = `translate3d(${(gx - 260).toFixed(1)}px, ${(gy - 260).toFixed(1)}px, 0)`;
                glowRaf = requestAnimationFrame(glowStep);
            };
            window.addEventListener('mousemove', onMove, { passive: true });
            glowRaf = requestAnimationFrame(glowStep);
            return () => {
                window.removeEventListener('mousemove', onMove);
                cancelAnimationFrame(glowRaf);
                window.removeEventListener('resize', resize);
                document.removeEventListener('visibilitychange', onVisibility);
                stop();
            };
        }

        return () => {
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', onVisibility);
            stop();
        };
    }, []);

    return (
        <div className="cyber-fx-root" aria-hidden="true">
            <canvas ref={canvasRef} className="cyber-canvas"></canvas>
            <div className="cyber-grid"></div>
            <div className="cyber-noise"></div>
            <div ref={glowRef} className="cyber-mouse-glow"></div>
        </div>
    );
}
