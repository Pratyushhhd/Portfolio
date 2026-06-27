import { useState, useEffect, useRef } from 'react';

const projects = [
    {
        title: 'Calculator App',
        desc: 'Responsive calculator with clean UI, supporting basic arithmetic operations with keyboard input.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        url: 'https://pratyushhhd.github.io/Calculator/',
        icon: 'fa-solid fa-calculator',
    },
    {
        title: 'Portfolio Website',
        desc: 'Personal portfolio with scroll animations, dark/light mode, and a modern React-powered interface.',
        tags: ['React', 'Bootstrap', 'CSS'],
        url: '#',
        icon: 'fa-solid fa-laptop-code',
    },
    {
        title: 'Budget Management Tool',
        desc: 'Expense & income tracker with category filtering, interactive charts, and real-time balance updates.',
        tags: ['JavaScript', 'Charts', 'LocalStorage'],
        url: 'https://pratyushhhd.github.io/Budget_Management_Tool/',
        icon: 'fa-solid fa-chart-line',
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
                <div className="row g-4 mt-4">
                    {projects.map((p, idx) => (
                        <div className="col-md-4" key={p.title}>
                            <div
                                className={`project-card ${isVisible ? 'animate show' : 'animate'}`}
                                style={{ animationDelay: `${idx * 150}ms` }}
                            >
                                <div className="project-card-body">
                                    <div className="project-icon">
                                        <i className={p.icon}></i>
                                    </div>
                                    <h4>{p.title}</h4>
                                    <p>{p.desc}</p>
                                    <div className="project-tags">
                                        {p.tags.map(t => (
                                            <span className="project-tag" key={t}>{t}</span>
                                        ))}
                                    </div>
                                    <a href={p.url} target="_blank" rel="noopener" className="project-btn">
                                        Live Demo <i className="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
