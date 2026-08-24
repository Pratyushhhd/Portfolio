import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import Icon from './components/Icon';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PortfolioAssistant from './components/ai/PortfolioAssistant';

const CyberLayer = lazy(() => import('./components/cyber/CyberLayer'));
const CyberBoot = lazy(() => import('./components/cyber/CyberBoot'));

function ScrollProgress() {
    useEffect(() => {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return <div id="scrollProgress" className="scroll-progress"></div>;
}

function BackToTop() {
    useEffect(() => {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        const onScroll = () => btn.classList.toggle('visible', window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <button id="backToTop" className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <Icon name="arrow-up"></Icon>
        </button>
    );
}

function FloatingNavDots({ activeSection }) {
    const sections = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'certifications', label: 'Certifications' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <nav id="floatingNav" className="floating-nav">
            {sections.map(s => (
                <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={activeSection === s.id ? 'active' : ''}
                    aria-label={s.label}
                >
                    <span className="nav-tooltip">{s.label}</span>
                </a>
            ))}
        </nav>
    );
}

const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];

function App() {
    const [activeSection, setActiveSection] = useState('home');
    const [theme, setTheme] = useState(() => {
        return (
            document.documentElement.getAttribute('data-theme') ||
            localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
        );
    });
    const [env, setEnv] = useState(() =>
        document.documentElement.getAttribute('data-env') === 'cyber' ? 'cyber' : 'default'
    );
    const [bootKey, setBootKey] = useState(0);
    const isFirstEnvRun = useRef(true);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const root = document.documentElement;
        if (env === 'cyber') {
            root.setAttribute('data-env', 'cyber');
            localStorage.setItem('portfolio-env', 'cyber');
        } else {
            root.removeAttribute('data-env');
            localStorage.removeItem('portfolio-env');
        }
        let t;
        if (!isFirstEnvRun.current) {
            root.classList.add('env-anim');
            t = setTimeout(() => root.classList.remove('env-anim'), 800);
        }
        isFirstEnvRun.current = false;
        return () => t && clearTimeout(t);
    }, [env]);

    const setEnvironment = useCallback((next) => {
        if (next === env) return;
        if (next === 'cyber') setBootKey(k => k + 1);
        setEnv(next);
    }, [env]);

    useEffect(() => {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });

        return () => obs.disconnect();
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    return (
        <>
            <ScrollProgress />
            <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} env={env} onEnvChange={setEnvironment} />
            <Home />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Contact />
            <Footer />
            <BackToTop />
            <FloatingNavDots activeSection={activeSection} />
            <PortfolioAssistant />
            {env === 'cyber' && (
                <Suspense fallback={null}>
                    <CyberLayer />
                </Suspense>
            )}
            {env === 'cyber' && bootKey > 0 && (
                <Suspense fallback={null}>
                    <CyberBoot key={bootKey} />
                </Suspense>
            )}
        </>
    );
}

export default App;
