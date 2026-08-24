import { useState, useEffect } from 'react';
import Icon from './Icon';
import ThemeSwitcher from './ThemeSwitcher';

const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
];

export default function Navbar({ activeSection, theme, toggleTheme, env, onEnvChange }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`navbar fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container nav-inner">
                <a className="navbar-brand" href="#home">
                    Praty<span>ush</span>
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-controls="navbarNav"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                >
                    <Icon name={menuOpen ? 'xmark' : 'bars'} />
                </button>

                <div className={`nav-collapse ${menuOpen ? 'open' : ''}`} id="navbarNav">
                    <ul className="nav-menu">
                        {links.map(l => (
                            <li key={l.id}>
                                <a
                                    className={`nav-link ${activeSection === l.id ? 'active' : ''}`}
                                    href={`#${l.id}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <ThemeSwitcher env={env} onChange={onEnvChange} />
                        </li>
                        <li>
                            <button
                                id="themeToggle"
                                className="theme-toggle"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                            >
                                <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
