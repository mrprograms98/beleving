/* ============================================================
   OLIVE TREE PSYCHOLOGY — SHARED SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── SCROLL PROGRESS BAR ── */
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
            progressBar.style.width = pct + '%';
        });
    }

    /* ── HEADER SCROLL EFFECT ── */
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));
    }

    /* ── MOBILE FULLSCREEN MENU ── */
    const menuToggle     = document.querySelector('.menu-toggle');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const menuClose      = document.querySelector('.menu-close');

    if (menuToggle && fullscreenMenu && menuClose) {
        menuToggle.addEventListener('click', () => {
            fullscreenMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        menuClose.addEventListener('click', () => {
            fullscreenMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    /* ── LANGUAGE DROPDOWN (header) ── */
    const langBtnHeader = document.querySelector('.lang-btn-header');
    const langMenu      = document.querySelector('.lang-menu');

    if (langBtnHeader && langMenu) {
        langBtnHeader.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = langMenu.style.display === 'block';
            langMenu.style.display = isOpen ? 'none' : 'block';
        });

        document.querySelectorAll('.lang-option').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                langMenu.style.display = 'none';
                langBtnHeader.textContent = btn.querySelector('.lang-label')
                    ? btn.querySelector('.lang-label').textContent + ' ▼'
                    : btn.textContent.replace(/🇳🇱|🇬🇧|🇸🇦/g,'').trim() + ' ▼';
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.lang-dropdown')) langMenu.style.display = 'none';
        });
    }

    /* ── FULLSCREEN MENU language buttons ── */
    document.querySelectorAll('.menu-bottom .lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.menu-bottom .lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    /* ── INTERSECTION OBSERVER — REVEAL ── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(
        '.value-box, .reveal, .team-card, .contact-container, .map-section, .treatment-grid > div'
    ).forEach(el => revealObserver.observe(el));

    /* ── INTAKE FORM SUBMIT ── */
    const intakeForm = document.querySelector('.intake-form');
    if (intakeForm) {
        intakeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.submit-btn');
            btn.innerText = 'Verzonden ✓';
            btn.style.background = '#6f8f87';
            btn.disabled = true;
        });
    }

    /* ── HERO PARALLAX ── */
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            heroImage.style.backgroundPositionY = (window.scrollY * 0.3) + 'px';
        });
    }

    /* ── HERO CURSOR TRAIL ── */
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position:absolute;
                width:5px;height:5px;
                border-radius:50%;
                background:var(--accent);
                opacity:0.35;
                pointer-events:none;
                left:${e.offsetX}px;top:${e.offsetY}px;
                z-index:1;
                transition:opacity 1s ease,transform 1s ease;
            `;
            hero.appendChild(dot);
            requestAnimationFrame(() => { dot.style.opacity='0'; dot.style.transform='scale(5)'; });
            setTimeout(() => dot.remove(), 1000);
        });
    }

});
