import Icon from './Icon';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <p className="footer-brand">
                    Praty<span>ush</span>
                </p>
                <p>&copy; {year} Pratyush Maharjan. All rights reserved.</p>
                <p style={{ fontSize: '0.8rem', marginTop: 4 }}>
                    Built with <Icon name="heart" style={{ color: 'var(--accent)' }}></Icon> using React
                </p>
            </div>
        </footer>
    );
}
