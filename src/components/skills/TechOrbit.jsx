import { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '../Icon';
import { technologies, categories, RINGS } from '../../data/techOrbitData';
import { personal, projects as allProjects } from '../../data/portfolioData';

const Y_SQUASH = 0.86;

const nodeById = Object.fromEntries(technologies.map(t => [t.id, t]));

export default function TechOrbit({ isVisible }) {
    const [category, setCategory] = useState('All');
    const [paused, setPaused] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [devEgg, setDevEgg] = useState(false);

    const wrapRef = useRef(null);
    const stageRef = useRef(null);
    const tiltRef = useRef(null);
    const lineRef = useRef(null);
    const svgRef = useRef(null);
    const nodeEls = useRef({});
    const stateRef = useRef({
        rot: RINGS.map((_, i) => i * 0.9),
        tiltX: 0,
        tiltY: 0,
        targetTiltX: 0,
        targetTiltY: 0,
        hovering: false,
        running: false,
        visible: false,
        size: 0,
        positions: {},
        lastFrame: 0,
        eggClicks: 0,
        eggTimer: null,
    });

    const selectedTech = selectedId ? nodeById[selectedId] : null;

    const layout = useCallback((dt) => {
        const s = stateRef.current;
        const stage = stageRef.current;
        if (!stage) return;
        if (!s.size) s.size = stage.clientWidth || 1;

        const slow = (s.hovering || paused) ? 0.15 : 1;
        if (!paused) {
            RINGS.forEach((ring, ri) => { s.rot[ri] += ring.speed * ring.dir * dt * slow; });
        }

        // ease tilt toward target
        s.tiltX += (s.targetTiltX - s.tiltX) * Math.min(dt * 0.006, 1);
        s.tiltY += (s.targetTiltY - s.tiltY) * Math.min(dt * 0.006, 1);
        if (tiltRef.current) {
            tiltRef.current.style.transform = `rotateX(${(s.tiltY * -7).toFixed(2)}deg) rotateY(${(s.tiltX * 9).toFixed(2)}deg)`;
        }

        let activePos = null;
        RINGS.forEach((ring, ri) => {
            ring.ids.forEach((id, ni) => {
                const el = nodeEls.current[id];
                if (!el) return;
                if (category !== 'All' && nodeById[id].category !== category) {
                    el.style.display = 'none';
                    return;
                }
                el.style.display = 'flex';
                const n = ring.ids.length;
                const a = s.rot[ri] + (ni / n) * Math.PI * 2;
                const R = s.size * ring.radius;
                const px = Math.cos(a) * R;
                const py = Math.sin(a) * R * Y_SQUASH;
                const depth = (Math.sin(a) + 1) / 2; // 0 far, 1 near
                const scale = 0.78 + depth * 0.3;
                const opacity = 0.55 + depth * 0.45;
                el.style.transform = `translate(-50%, -50%) translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
                el.style.opacity = opacity.toFixed(2);
                el.style.zIndex = String(100 + Math.round(depth * 50));
                s.positions[id] = { xp: 50 + (px / s.size) * 100, yp: 50 + (py / s.size) * 100 };
                if (id === s.activeId) activePos = s.positions[id];
            });
        });

        if (svgRef.current && lineRef.current) {
            if (activePos) {
                svgRef.current.style.opacity = '1';
                lineRef.current.setAttribute('x2', activePos.xp.toFixed(2));
                lineRef.current.setAttribute('y2', activePos.yp.toFixed(2));
            } else {
                svgRef.current.style.opacity = '0';
            }
        }
    }, [category, paused]);

    // rAF loop — gated by section visibility, skipped for reduced motion
    useEffect(() => {
        const s = stateRef.current;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const onResize = () => { s.size = stageRef.current ? stageRef.current.clientWidth : 0; };
        window.addEventListener('resize', onResize);

        if (reduced) {
            onResize();
            layout(16);
            return () => window.removeEventListener('resize', onResize);
        }

        let raf;
        const tick = (t) => {
            raf = requestAnimationFrame(tick);
            if (!s.visible || !stageRef.current) return;
            const dt = Math.min(t - (s.lastFrame || t), 50);
            s.lastFrame = t;
            layout(dt);
        };

        const obs = new IntersectionObserver(
            ([entry]) => {
                s.visible = entry.isIntersecting;
                if (entry.isIntersecting && !raf) {
                    s.lastFrame = 0;
                    raf = requestAnimationFrame(tick);
                } else if (!entry.isIntersecting && raf) {
                    cancelAnimationFrame(raf);
                    raf = undefined;
                }
            },
            { threshold: 0.05 }
        );
        if (stageRef.current) obs.observe(stageRef.current);
        s.running = true;

        return () => {
            window.removeEventListener('resize', onResize);
            obs.disconnect();
            if (raf) cancelAnimationFrame(raf);
            s.running = false;
        };
    }, [layout]);

    // keep activeId accessible inside the rAF closure without restarting it
    useEffect(() => {
        stateRef.current.activeId = selectedId;
    }, [selectedId]);

    const onMouseMove = (e) => {
        const s = stateRef.current;
        if (!wrapRef.current) return;
        const rect = wrapRef.current.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        s.targetTiltX = Math.max(-1, Math.min(1, nx)) * 0.6;
        s.targetTiltY = Math.max(-1, Math.min(1, ny)) * 0.5;
    };

    const onMouseLeave = () => {
        const s = stateRef.current;
        s.targetTiltX = 0;
        s.targetTiltY = 0;
        s.hovering = false;
    };

    const viewProjects = () => {
        if (!selectedTech) return;
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('orbit:view-projects', { detail: selectedTech.projects }));
        }, 600);
    };

    const askAi = () => {
        if (!selectedTech) return;
        window.dispatchEvent(new CustomEvent('portfolio-ai:open', {
            detail: { prompt: `Tell me about how Pratyush uses ${selectedTech.name}.` },
        }));
    };

    const onCenterClick = () => {
        const s = stateRef.current;
        clearTimeout(s.eggTimer);
        s.eggClicks += 1;
        s.eggTimer = setTimeout(() => { s.eggClicks = 0; }, 1500);
        if (s.eggClicks >= 3) {
            s.eggClicks = 0;
            setDevEgg(true);
            setTimeout(() => setDevEgg(false), 4500);
        }
    };

    const usedIn = selectedTech
        ? selectedTech.projects
            .map(id => allProjects.find(p => p.id === id))
            .filter(Boolean)
        : [];

    return (
        <div className="orbit-section" ref={wrapRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
            <div className="orbit-controls">
                {categories.map(c => (
                    <button
                        key={c}
                        type="button"
                        className={`chat-chip orbit-chip ${category === c ? 'active' : ''}`}
                        onClick={() => setCategory(c)}
                        aria-pressed={category === c}
                    >
                        {c}
                    </button>
                ))}
                <span className="orbit-controls-divider" aria-hidden="true"></span>
                <button
                    type="button"
                    className={`chat-chip orbit-chip ${paused ? 'active' : ''}`}
                    onClick={() => setPaused(p => !p)}
                    aria-pressed={paused}
                >
                    {paused ? '\u25B6 Resume Orbit' : '\u23F8 Pause Orbit'}
                </button>
            </div>

            <div className="skills-flex">
                <div
                    className={`orbit-stage ${isVisible ? 'show' : ''}`}
                    ref={stageRef}
                >
                    <div className="orbit-ring ring-1" aria-hidden="true"></div>
                    <div className="orbit-ring ring-2" aria-hidden="true"></div>

                    <div className="orbit-tilt" ref={tiltRef}>
                        <svg ref={svgRef} className="orbit-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <line ref={lineRef} x1="50" y1="50" x2="50" y2="50" className="orbit-link-line" />
                        </svg>

                        {RINGS.flatMap((ring, ri) =>
                            ring.ids.map((id, ni) => {
                                const t = nodeById[id];
                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        ref={(el) => { nodeEls.current[id] = el; }}
                                        className={`tech-node ${selectedId === id ? 'active' : ''}`}
                                        style={{ transitionDelay: isVisible ? `${ri * 120 + ni * 90}ms` : '0ms' }}
                                        onMouseEnter={() => { stateRef.current.hovering = true; }}
                                        onMouseLeave={() => { stateRef.current.hovering = false; }}
                                        onClick={() => setSelectedId(prev => (prev === id ? null : id))}
                                        aria-label={`${t.name} — show details`}
                                        aria-pressed={selectedId === id}
                                    >
                                        <span className="tn-icon" aria-hidden="true">
                                            {t.icon ? <Icon name={t.icon}></Icon> : t.label}
                                        </span>
                                        <span className="tn-label">{t.name}</span>
                                    </button>
                                );
                            })
                        )}
                    </div>

                    <button type="button" className="orbit-center" onClick={onCenterClick} aria-label={`${personal.name} — profile center`}>
                        {devEgg && (
                            <output className="dev-console">
                                {'> Developer mode unlocked.\n\n$ whoami\n' + personal.name + '\n' + personal.role}
                            </output>
                        )}
                        <img src="pratyush.jpg" alt="" className="oc-avatar" loading="lazy" />
                        <strong>{personal.name}</strong>
                        <span className="oc-role">{personal.role}</span>
                        <span className="oc-tagline">Building modern web apps with clean code &amp; great UX.</span>
                    </button>
                </div>

                <aside className={`orbit-panel ${selectedTech ? 'open' : ''}`} aria-live="polite">
                    {!selectedTech ? (
                        <div className="orbit-panel-empty">
                            <Icon name="code"></Icon>
                            <p>Select any technology to see how it connects to real projects.</p>
                        </div>
                    ) : (
                        <>
                            <header className="op-head">
                                <span className="tn-icon op-icon" aria-hidden="true">
                                    {selectedTech.icon ? <Icon name={selectedTech.icon}></Icon> : selectedTech.label}
                                </span>
                                <div>
                                    <h4>{selectedTech.name}</h4>
                                    <span className="op-cat">{selectedTech.category}</span>
                                </div>
                                <button type="button" className="chat-icon-btn" onClick={() => setSelectedId(null)} aria-label="Close details">
                                    <Icon name="xmark"></Icon>
                                </button>
                            </header>

                            <p className="op-desc">{selectedTech.description}</p>

                            {selectedTech.level != null && (
                                <div className="skill-bar op-level" aria-label={`Proficiency approximately ${selectedTech.level} percent`}>
                                    <div className="skill-bar-fill filled" style={{ '--target-width': `${selectedTech.level}%` }}></div>
                                </div>
                            )}

                            <p className="op-projects-title">
                                Used in {selectedTech.projects.length > 0 ? `(${selectedTech.projects.length})` : ''}
                            </p>
                            {selectedTech.projects.length > 0 ? (
                                <ul className="op-project-list">
                                    {usedIn.map(p => (
                                        <li key={p.id}><span aria-hidden="true">✓</span> {p.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="op-noprojects">No showcased project uses this yet — ask me about it.</p>
                            )}

                            <div className="msg-links">
                                <button type="button" className="msg-link" onClick={viewProjects}>
                                    View Related Projects <span aria-hidden="true">→</span>
                                </button>
                                <button type="button" className="msg-link" onClick={askAi}>
                                    Ask AI about this <span aria-hidden="true">✦</span>
                                </button>
                            </div>
                        </>
                    )}
                </aside>
            </div>
        </div>
    );
}
