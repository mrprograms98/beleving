/* ============================================================
   OLIVE TREE PSYCHOLOGY — SHARED SCRIPT
   ============================================================ */

// ── PRELOADER
(function () {
    const bl = document.getElementById('bl');
    const bf = document.getElementById('bf');
    const pb = document.getElementById('pb');

    const phases = [
        { label: 'adem rustig in',    dur: 4000, from: 0,   to: 100 },
        { label: 'houd even vast',    dur: 2000, from: 100, to: 100 },
        { label: 'adem langzaam uit', dur: 6000, from: 100, to: 0   },
        { label: '',                  dur: 600,  from: 0,   to: 0   },
    ];

    let pi = 0, ps = null;

    function ease(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

    function breath(ts) {
        if (!ps) ps = ts;
        const p = phases[pi];
        const e = ts - ps;
        const v = p.from + (p.to - p.from) * ease(Math.min(e / p.dur, 1));
        bf.style.width = v + '%';
        if (e < p.dur) {
            requestAnimationFrame(breath);
        } else {
            pi = (pi + 1) % phases.length;
            ps = null;
            bl.textContent = phases[pi].label;
            requestAnimationFrame(breath);
        }
    }

    requestAnimationFrame(breath);

    // voortgangsbalk
    let prog = 0;
    const iv = setInterval(() => {
        prog += Math.random() * 6 + 2;
        if (prog >= 100) { prog = 100; clearInterval(iv); }
        pb.style.width = prog + '%';
    }, 200);

    // verbergen na laden (minimaal 5 seconden)
    const start = Date.now();
    window.addEventListener('load', () => {
        const wait = Math.max(0, 5000 - (Date.now() - start));
        setTimeout(hide, wait);
    });
    setTimeout(hide, 7000); // absolute fallback

    function hide() {
        document.getElementById('preloader').classList.add('fade-out');
    }
})();

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

/* ── LUXURY FORM REVEAL ── */
    document.querySelectorAll('.luxury-form').forEach(el => revealObserver.observe(el));

    /* ── FORM FILLED STATE (floating label) ── */
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(el => {
        el.addEventListener('input', () => {
            el.closest('.form-group').classList.toggle('filled', el.value.trim() !== '');
        });
    });

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

