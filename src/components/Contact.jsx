import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjybzpgv';

export default function Contact() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(entry.target); } },
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const configured = !FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID');

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (status === 'sent' || status === 'error') setStatus('idle');
    };

    const mailtoFallback = () => {
        const subject = `Portfolio Inquiry from ${encodeURIComponent(form.name)}`;
        const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
        window.location.assign(`mailto:pratyushmaharjan90@gmail.com?subject=${subject}&body=${body}`);
        setForm({ name: '', email: '', message: '' });
        setStatus('sent');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message || status === 'sending') return;

        if (!configured) {
            mailtoFallback();
            return;
        }

        setStatus('sending');
        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    _gotcha: undefined,
                }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setStatus('sent');
            setForm({ name: '', email: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    const label = {
        idle: <><Icon name="paper-plane"></Icon> Send Message</>,
        sending: <><Icon name="paper-plane"></Icon> Sending...</>,
        sent: <><Icon name="check"></Icon> Message Sent!</>,
        error: <><Icon name="paper-plane"></Icon> Try Again</>,
    }[status];

    return (
        <section id="contact" className="contact" ref={ref}>
            <div className="container">
                <h2 className={`section-title ${isVisible ? 'animate show' : 'animate'}`}>
                    Get In <span>Touch</span>
                </h2>
                <p className={`section-subtitle ${isVisible ? 'animate show animate-delay-1' : 'animate'}`}>
                    Have a project in mind? Let's build something great together.
                </p>
                <div className={`contact-grid ${isVisible ? 'animate show animate-delay-2' : 'animate'}`}>
                    <div className="contact-info-card">
                        <h3>Let's talk</h3>
                        <p>I'm always open to discussing new projects, creative ideas, or opportunities.</p>

                        <div className="contact-detail">
                            <div className="contact-detail-icon">
                                <Icon name="envelope"></Icon>
                            </div>
                            <div className="contact-detail-text">
                                <strong>Email</strong>
                                <a href="mailto:pratyushmaharjan90@gmail.com">pratyushmaharjan90@gmail.com</a>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <div className="contact-detail-icon">
                                <Icon name="phone"></Icon>
                            </div>
                            <div className="contact-detail-text">
                                <strong>Phone</strong>
                                <a href="tel:+9779761610524">+977 9761610524</a>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <div className="contact-detail-icon">
                                <Icon name="location-dot"></Icon>
                            </div>
                            <div className="contact-detail-text">
                                <strong>Location</strong>
                                <span>Kathmandu, Nepal</span>
                            </div>
                        </div>

                        <div className="contact-social">
                            <a href="https://github.com/Pratyushhhd" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Icon name="github"></Icon>
                            </a>
                            <a href="https://www.linkedin.com/in/pratyush-maharjan-1205a533b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Icon name="linkedin-in"></Icon>
                            </a>
                            <a href="mailto:pratyushmaharjan90@gmail.com" aria-label="Email">
                                <Icon name="envelope"></Icon>
                            </a>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
                        <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" style={{ display: 'none' }} aria-hidden="true" />
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control-custom"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control-custom"
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-control-custom"
                                placeholder="Tell me about your project..."
                                value={form.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-primary-custom contact-submit" disabled={status === 'sending'}>
                            {label}
                        </button>
                        {status === 'error' && (
                            <p className="form-status" role="alert">
                                Couldn't send right now — please email me directly instead.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
