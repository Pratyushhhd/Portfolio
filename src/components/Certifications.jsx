import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

const CERT_FILE = '/certificates/react-certificate.png';

const certifications = [
    {
        id: 'react-development',
        title: 'React Development',
        issuer: 'Prime College',
        date: 'July 2026',
        desc: 'Certificate awarded for completing React development training/coursework.',
        skills: ['React.js', 'JavaScript', 'Components', 'Hooks', 'Frontend Development'],
        file: CERT_FILE,
    },
];

export default function Certifications() {
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
        <section id="certifications" className="certifications" ref={ref}>
            <div className="container">
                <h2 className={`section-title ${isVisible ? 'animate show' : 'animate'}`}>
                    My <span>Certifications</span>
                </h2>
                <p className={`section-subtitle ${isVisible ? 'animate show animate-delay-1' : 'animate'}`}>
                    Credentials earned through coursework and training
                </p>
                <div className="cert-list">
                    {certifications.map((c, idx) => (
                        <article
                            key={c.id}
                            className={`cert-card ${isVisible ? 'animate show' : 'animate'}`}
                            style={{ transitionDelay: `${idx * 150}ms` }}
                        >
                            <div className="cert-icon" aria-hidden="true">
                                <Icon name="award"></Icon>
                            </div>
                            <div className="cert-body">
                                <h4>{c.title}</h4>
                                <p className="cert-meta">Issued by {c.issuer} &middot; {c.date}</p>
                                <p className="cert-desc">{c.desc}</p>
                                <div className="project-tags cert-tags">
                                    {c.skills.map(s => (
                                        <span className="project-tag" key={s}>{s}</span>
                                    ))}
                                </div>
                                <a
                                    href={c.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline-custom cert-btn"
                                    aria-label={`View ${c.title} certificate (opens in a new tab)`}
                                >
                                    View Certificate <Icon name="arrow-right"></Icon>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
