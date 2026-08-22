import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

const projects = [
    {
        title: 'Bachat',
        desc: 'Full-stack finance dashboard with secure authentication — track income & expenses, build budgets, reach savings goals and understand where your money goes.',
        tags: ['Next.js', 'React', 'Tailwind CSS'],
        url: 'https://bachat-xi.vercel.app/',
        repo: 'https://github.com/Pratyushhhd',
        icon: 'wallet',
    },
    {
        title: 'Calculator App',
        desc: 'Responsive calculator with clean UI, supporting basic arithmetic operations with keyboard input.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        url: 'https://pratyushhhd.github.io/Calculator/',
        repo: 'https://github.com/Pratyushhhd/Calculator',
        icon: 'calculator',
    },
    {
        title: 'Portfolio Website',
        desc: 'Personal portfolio with scroll animations, dark/light mode, and a modern React-powered interface.',
        tags: ['React', 'Bootstrap', 'CSS'],
        url: 'https://www.maharjanpratyush.com.np',
        repo: 'https://github.com/Pratyushhhd',
        icon: 'laptop-code',
    },
    {
        title: 'Budget Management Tool',
        desc: 'Expense & income tracker with category filtering, interactive charts, and real-time balance updates.',
        tags: ['JavaScript', 'Charts', 'LocalStorage'],
        url: 'https://pratyushhhd.github.io/Budget_Management_Tool/',
        repo: 'https://github.com/Pratyushhhd/Budget_Management_Tool',
        icon: 'chart-line',
    },
    {
        title: 'Pomodoro Timer',
        desc: 'Focus timer with customizable work/break intervals, session tracking, and a clean minimal interface.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        url: 'https://pratyushhhd.github.io/Pomodoro/',
        repo: 'https://github.com/Pratyushhhd/Pomodoro',
        icon: 'clock',
    },
];

export default function Projects() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(entry.target); } },
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="projects" className="projects section-alt" ref={ref}>
            <div className="container">
                <h2 className={`section-title ${isVisible ? 'animate show' : 'animate'}`}>
                    Featured <span>Projects</span>
                </h2>
                <p className={`section-subtitle ${isVisible ? 'animate show animate-delay-1' : 'animate'}`}>
                    A selection of projects I've built with passion and precision
                </p>
                <div className="projects-grid">
                    {projects.map((p, idx) => (
                        <div
                            key={p.title}
                            className={isVisible ? 'animate show' : 'animate'}
                            style={{ transitionDelay: `${idx * 150}ms` }}
                        >
                            <div className="project-card">
                                <div className="project-card-body">
                                    <div className="project-icon">
                                        <Icon name={p.icon}></Icon>
                                    </div>
                                    <h4>{p.title}</h4>
                                    <p>{p.desc}</p>
                                    <div className="project-tags">
                                        {p.tags.map(t => (
                                            <span className="project-tag" key={t}>{t}</span>
                                        ))}
                                    </div>
                                    <div className="project-links">
                                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="project-btn">
                                            Live Demo <Icon name="arrow-right"></Icon>
                                        </a>
                                        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="project-btn">
                                            <Icon name="github"></Icon> Code
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
