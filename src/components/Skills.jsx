import { useState, useEffect, useRef } from 'react';
import TechOrbit from './skills/TechOrbit';

export default function Skills() {
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
        <section id="skills" className="skills" ref={ref}>
            <div className="container">
                <h2 className={`section-title ${isVisible ? 'animate show' : 'animate'}`}>
                    My <span>Tech Stack</span>
                </h2>
                <p className={`section-subtitle ${isVisible ? 'animate show animate-delay-1' : 'animate'}`}>
                    A living map of my technologies — and the real projects they power.
                </p>
                <TechOrbit isVisible={isVisible} />
            </div>
        </section>
    );
}
