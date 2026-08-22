import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

function CountUp({ target, suffix = '', start }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let raf;
        const t0 = performance.now();
        const duration = 1500;
        const tick = (t) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [start, target]);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return <>{target}{suffix}</>;
    }
    return <>{value}{suffix}</>;
}

export default function About() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(entry.target); } },
            { threshold: 0.2 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const stats = [
        { target: 2, suffix: '+', label: 'Years Learning' },
        { target: 5, suffix: '+', label: 'Projects' },
        { target: 10, suffix: '+', label: 'Technologies' },
    ];

    return (
        <section id="about" className="about section-alt" ref={ref}>
            <div className="container">
                <div className={`about-grid ${isVisible ? 'animate show' : 'animate'}`}>
                    <div className="about-image-wrapper">
                        <div className="about-image-frame">
                            <div className="avatar-placeholder">
                                <Icon name="user-astronaut"></Icon>
                            </div>
                        </div>
                    </div>
                    <div className="about-content">
                        <div className="section-divider" style={{ margin: '0 0 1rem' }}></div>
                        <h3>
                            Frontend Developer <span className="highlight-text">&amp; UI Enthusiast</span>
                        </h3>
                        <p>
                            I'm a frontend developer focused on modern UI, performance,
                            and clean design systems using HTML, CSS, JavaScript, and Bootstrap.
                            I enjoy crafting smooth animations, minimal layouts, and
                            professional, user-friendly interfaces.
                        </p>
                        <p>
                            Currently, I'm a 2nd-year BCA (Bachelor of Computer Applications) student,
                            continuously improving my skills through hands-on projects
                            and modern web practices. Outside of coding, I enjoy playing futsal and guitar.
                        </p>
                        <div className="about-stats">
                            {stats.map(s => (
                                <div className="stat-item" key={s.label}>
                                    <span className="stat-number">
                                        <CountUp target={s.target} suffix={s.suffix} start={isVisible} />
                                    </span>
                                    <span className="stat-label">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
