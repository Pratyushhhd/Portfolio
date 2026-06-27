/* ===== SCROLL PROGRESS BAR ===== */
(function() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    }, { passive: true });
})();

/* ===== BACK TO TOP ===== */
(function() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* ===== FLOATING NAV DOTS ===== */
(function() {
    const nav = document.getElementById('floatingNav');
    if (!nav) return;
    const sections = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
    ];
    sections.forEach(s => {
        const a = document.createElement('a');
        a.href = '#' + s.id;
        a.setAttribute('aria-label', s.label);
        a.innerHTML = `<span class="nav-tooltip">${s.label}</span>`;
        nav.appendChild(a);
    });
    // Update active dot
    const dots = nav.querySelectorAll('a');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = sections.findIndex(s => s.id === entry.target.id);
                if (idx !== -1) {
                    dots.forEach(d => d.classList.remove('active'));
                    if (dots[idx]) dots[idx].classList.add('active');
                }
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) obs.observe(el);
    });
})();
