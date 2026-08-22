import Icon from './Icon';
import { useTypingEffect } from '../hooks/useTypingEffect';

export default function Home() {
    const { text, showCursor } = useTypingEffect(
        ['Frontend Developer', 'UI Developer', 'Web Developer']
    );

    return (
        <section id="home" className="home">
            <div className="home-container animate show">
                <p style={{ color: 'var(--accent)', fontWeight: 500, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                    <Icon name="code" style={{ marginRight: 8 }}></Icon>
                    Welcome to my portfolio
                </p>
                <h1 className="hero-title">
                    Hi, I'm <span>Pratyush Maharjan</span>
                </h1>
                <h2 className="hero-subtitle">
                    I'm a <span style={{ color: 'var(--accent)' }}>{text}</span>
                    <span className="typing-cursor" style={{ opacity: showCursor ? 1 : 0 }}></span>
                </h2>
                <p className="hero-text">
                    I design and build fast, scalable, and visually clean web experiences
                    with modern technologies and pixel-perfect attention to detail.
                </p>
                <div className="button-container">
                    <a href="#contact" className="btn-primary-custom">
                        <Icon name="paper-plane"></Icon> Hire Me
                    </a>
                    <a href="#projects" className="btn-outline-custom">
                        <Icon name="eye"></Icon> View Projects
                    </a>
                    <a href="/resume.pdf" download className="btn-outline-custom">
                        <Icon name="download"></Icon> Download CV
                    </a>
                </div>
            </div>
        </section>
    );
}
