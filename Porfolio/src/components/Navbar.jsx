import { useState, useEffect } from 'react';

const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

export default function Navbar({ activeSection, theme, toggleTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container">
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
                    style={{ border: 'none', color: 'var(--text-main)' }}
                >
                    <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} fs-5`}></i>
                </button>

                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
                        {links.map(l => (
                            <li className="nav-item" key={l.id}>
                                <a
                                    className={`nav-link ${activeSection === l.id ? 'active' : ''}`}
                                    href={`#${l.id}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                        <li className="nav-item">
                            <button
                                id="themeToggle"
                                className="theme-toggle"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <i className="fas fa-sun"></i>
                                ) : (
                                    <i className="fas fa-moon"></i>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
