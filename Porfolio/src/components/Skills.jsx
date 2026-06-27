import { useState, useEffect, useRef } from 'react';

const skills = [
    { name: 'HTML & CSS', level: 92, icon: 'fa-brands fa-html5', desc: 'Semantic markup, Flexbox, Grid, Animations' },
    { name: 'JavaScript', level: 85, icon: 'fa-brands fa-js', desc: 'ES6+, DOM, Async, APIs' },
    { name: 'Bootstrap', level: 88, icon: 'fa-brands fa-bootstrap', desc: 'Responsive layouts, Components, Utility classes' },
    { name: 'React', level: 70, icon: 'fa-brands fa-react', desc: 'Hooks, State, Components, JSX' },
    { name: 'Git & GitHub', level: 80, icon: 'fa-brands fa-github', desc: 'Version control, Collaboration, Workflows' },
    { name: 'UI/UX Design', level: 75, icon: 'fa-solid fa-palette', desc: 'Figma, Color theory, Prototyping' },
];

export default function Skills() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(entry.target); } },
            { threshold: 0.15 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="skills" className="skills" ref={ref}>
            <div className="container">
                <h2 className={`section-title ${isVisible ? 'animate show' : 'animate'}`}>
                    My <span>Skills</span>
                </h2>
                <p className={`section-subtitle ${isVisible ? 'animate show animate-delay-1' : 'animate'}`}>
                    Technologies and tools I use to bring ideas to life
                </p>
                <div className="skills-grid">
                    {skills.map((s, idx) => (
                        <div
                            key={s.name}
                            className={`skill-card ${isVisible ? 'animate show' : 'animate'}`}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="skill-header">
                                <div className="skill-icon">
                                    <i className={s.icon}></i>
                                </div>
                                <div className="skill-info">
                                    <h4>{s.name}</h4>
                                    <span>{s.desc}</span>
                                </div>
                            </div>
                            <div className="skill-bar">
                                <div
                                    className={`skill-bar-fill ${isVisible ? 'animate' : ''}`}
                                    style={{ '--target-width': `${s.level}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
