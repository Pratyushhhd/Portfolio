import { useState, useEffect, useRef } from 'react';

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

    return (
        <section id="about" className="about section-alt" ref={ref}>
            <div className="container">
                <div className={`about-grid ${isVisible ? 'animate show' : 'animate'}`}>
                    <div className="about-image-wrapper">
                        <div className="about-image-frame">
                            <div className="avatar-placeholder">
                                <i className="fas fa-user-astronaut"></i>
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
                            <div className="stat-item">
                                <span className="stat-number">2+</span>
                                <span className="stat-label">Years Learning</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">5+</span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">10+</span>
                                <span className="stat-label">Technologies</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
