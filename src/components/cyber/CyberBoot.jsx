import { useEffect, useState } from 'react';

export default function CyberBoot() {
    const [show, setShow] = useState(
        () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        if (!show) return;
        const t = setTimeout(() => setShow(false), 950);
        return () => clearTimeout(t);
    }, [show]);

    if (!show) return null;

    return (
        <div className="cyber-boot" role="status" aria-label="Cyber mode initializing">
            <div className="cb-box">
                <p className="cb-title">INITIALIZING CYBER MODE...</p>
                <div className="cb-bar"><span></span></div>
                <ul className="cb-lines">
                    <li>NEURAL INTERFACE<span>ONLINE</span></li>
                    <li>PORTFOLIO SYSTEM<span>ONLINE</span></li>
                    <li>AI ASSISTANT<span>ONLINE</span></li>
                    <li>TECH ORBIT<span>ONLINE</span></li>
                </ul>
                <p className="cb-active">CYBER MODE ACTIVE</p>
            </div>
        </div>
    );
}
