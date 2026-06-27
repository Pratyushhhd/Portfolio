import { useState, useEffect, useRef } from 'react';

export default function Contact() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(entry.target); } },
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.name && form.email && form.message) {
            window.location.href = `mailto:pratyushmaharjan90@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
            setSubmitted(true);
            setForm({ name: '', email: '', message: '' });
        }
    };

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
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="contact-detail-text">
                                <strong>Email</strong>
                                <a href="mailto:pratyushmaharjan90@gmail.com">pratyushmaharjan90@gmail.com</a>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <div className="contact-detail-icon">
                                <i className="fas fa-phone"></i>
                            </div>
                            <div className="contact-detail-text">
                                <strong>Phone</strong>
                                <a href="tel:+9779761610524">+977 9761610524</a>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <div className="contact-detail-icon">
                                <i className="fas fa-location-dot"></i>
                            </div>
                            <div className="contact-detail-text">
                                <strong>Location</strong>
                                <span>Kathmandu, Nepal</span>
                            </div>
                        </div>

                        <div className="contact-social">
                            <a href="https://github.com/Pratyushhhd" target="_blank" rel="noopener" aria-label="GitHub">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/pratyush-maharjan-1205a533b" target="_blank" rel="noopener" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="mailto:pratyushmaharjan90@gmail.com" aria-label="Email">
                                <i className="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn btn-primary-custom w-100" style={{ justifyContent: 'center' }}>
                            {submitted ? (
                                <><i className="fas fa-check"></i> Message Sent!</>
                            ) : (
                                <><i className="fas fa-paper-plane"></i> Send Message</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
