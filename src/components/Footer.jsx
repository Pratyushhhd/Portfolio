import { useState } from 'react';

export default function Footer() {
    const [year] = useState(new Date().getFullYear());

    return (
        <footer className="footer">
            <div className="container">
                <p className="footer-brand">
                    Praty<span>ush</span>
                </p>
                <p>&copy; {year} Pratyush Maharjan. All rights reserved.</p>
                <p style={{ fontSize: '0.8rem', marginTop: 4 }}>
                    Built with <i className="fas fa-heart" style={{ color: 'var(--accent)' }}></i> using React &amp; Bootstrap
                </p>
            </div>
        </footer>
    );
}
