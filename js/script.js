/* ===================================================================
   NAILS & BEAUTY BY JADE — MAIN SCRIPT
=================================================================== */
(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init(){
    setYear();
    initPreloader();
    initCursorGlow();
    initScrollProgress();
    initCookieBanner();
    initThemeToggle();
    initNavbar();
    initSmoothAnchors();
    initTypewriter();
    initAOS();
    initCounters();
    initGallery();
    initLightbox();
    initReviewsSlider();
    initReviewsSummary();
    initOpeningHours();
    initBookingForm();
    initNewsletter();
    initScrollTop();
  }

  function setYear(){
    const y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
  }

  /* ---------------- PRELOADER ---------------- */
  function initPreloader(){
    const preloader = document.getElementById('preloader');
    if(!preloader) return;
    const done = () => {
      preloader.classList.add('hide');
      document.body.style.overflow = '';
    };
    window.addEventListener('load', () => setTimeout(done, 600));
    // safety fallback in case load event is slow
    setTimeout(done, 3200);
  }

  /* ---------------- CURSOR GLOW ---------------- */
  function initCursorGlow(){
    const glow = document.getElementById('cursorGlow');
    if(!glow || window.matchMedia('(pointer: coarse)').matches) return;
    window.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ---------------- SCROLL PROGRESS ---------------- */
  function initScrollProgress(){
    const bar = document.getElementById('scrollProgress');
    if(!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = scrolled + '%';
    }, { passive:true });
  }

  /* ---------------- COOKIE BANNER ---------------- */
  function initCookieBanner(){
    const banner = document.getElementById('cookieBanner');
    if(!banner) return;
    const KEY = 'jade_cookie_consent';
    let stored = null;
    try { stored = localStorage.getItem(KEY); } catch(e){ /* storage unavailable */ }

    if(!stored){
      setTimeout(() => banner.classList.add('show'), 1400);
    }
    const close = (value) => {
      banner.classList.remove('show');
      try { localStorage.setItem(KEY, value); } catch(e){ /* ignore */ }
    };
    document.getElementById('cookieAccept')?.addEventListener('click', () => close('accepted'));
    document.getElementById('cookieDecline')?.addEventListener('click', () => close('declined'));
  }

  /* ---------------- THEME TOGGLE (light / dark) ---------------- */
  function initThemeToggle(){
    const btn = document.getElementById('themeToggle');
    if(!btn) return;
    const root = document.documentElement;
    const KEY = 'jade_theme';

    const getStored = () => {
      try { return localStorage.getItem(KEY); } catch(e){ return null; }
    };
    const store = (value) => {
      try { localStorage.setItem(KEY, value); } catch(e){ /* ignore */ }
    };

    // Theme was already set pre-paint in <head>; just sync state here.
    let current = root.getAttribute('data-theme') || getStored() || 'light';
    root.setAttribute('data-theme', current);
    btn.setAttribute('aria-pressed', String(current === 'dark'));

    btn.addEventListener('click', () => {
      current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', current);
      store(current);
      btn.setAttribute('aria-pressed', String(current === 'dark'));
      btn.animate(
        [{ transform:'scale(1) rotate(0deg)' }, { transform:'scale(.8) rotate(-25deg)' }, { transform:'scale(1) rotate(0deg)' }],
        { duration:420, easing:'cubic-bezier(.16,.8,.24,1)' }
      );
    });

    // Follow system preference changes only if the user hasn't chosen manually
    if(!getStored() && window.matchMedia){
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if(getStored()) return;
        const sys = e.matches ? 'dark' : 'light';
        root.setAttribute('data-theme', sys);
        btn.setAttribute('aria-pressed', String(sys === 'dark'));
      });
    }
  }

  /* ---------------- NAVBAR ---------------- */
  function initNavbar(){
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if(!navbar) return;

    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });

    hamburger?.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });

    navLinks?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger?.classList.remove('active');
      });
    });

    // Active link on scroll
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const links = Array.from(document.querySelectorAll('.nav-link'));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const id = entry.target.getAttribute('id');
          links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  function initSmoothAnchors(){
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if(id.length < 2) return;
        const target = document.querySelector(id);
        if(target){
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top:y, behavior:'smooth' });
        }
      });
    });
  }

  /* ---------------- TYPEWRITER (hero subtitle refinement) ---------------- */
  function initTypewriter(){
    const el = document.querySelector('.hero-subtitle');
    if(!el) return;
    const full = el.textContent;
    el.textContent = '';
    el.style.borderRight = '2px solid rgba(255,255,255,.6)';
    let i = 0;
    const type = () => {
      if(i <= full.length){
        el.textContent = full.slice(0, i);
        i++;
        setTimeout(type, 32);
      } else {
        el.style.borderRight = 'none';
      }
    };
    setTimeout(type, 1600);
  }

  /* ---------------- SCROLL REVEAL (AOS-lite) ---------------- */
  function initAOS(){
    const items = document.querySelectorAll('[data-aos], .section-title, .gallery-item');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.15 });
    items.forEach(i => io.observe(i));
  }

  /* ---------------- COUNTERS ---------------- */
  function initCounters(){
    const counters = document.querySelectorAll('.counter-number');
    if(!counters.length) return;
    const animate = (el) => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if(progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.6 });
    counters.forEach(c => io.observe(c));
  }

  /* ---------------- GALLERY ---------------- */
  const GALLERY_DATA = [
    { cat:'nagels', url:'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=700&auto=format&fit=crop', alt:'Nude gelnagels close-up' },
    { cat:'nagels', url:'https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=700&auto=format&fit=crop', alt:'Franse manicure' },
    { cat:'wimpers', url:'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=700&auto=format&fit=crop', alt:'Volle wimperextensions' },
    { cat:'beauty', url:'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=700&auto=format&fit=crop', alt:'Gezichtsbehandeling in de salon' },
    { cat:'nagels', url:'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=700&auto=format&fit=crop', alt:'Rosé gouden nail art' },
    { cat:'nagels', url:'https://images.unsplash.com/photo-1587909209111-5097ee578ec3?q=80&w=700&auto=format&fit=crop', alt:'Glanzende BIAB nagels' },
    { cat:'wimpers', url:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=700&auto=format&fit=crop', alt:'Lash lift resultaat' },
    { cat:'beauty', url:'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=700&auto=format&fit=crop', alt:'Rustgevende salonruimte' },
    { cat:'nagels', url:'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=700&auto=format&fit=crop', alt:'Chique acrylnagels' },
    { cat:'nagels', url:'https://images.unsplash.com/photo-1632344004970-4d6d2f0e7f3b?q=80&w=700&auto=format&fit=crop', alt:'Elegante nagel manicure' },
    { cat:'wimpers', url:'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80&w=700&auto=format&fit=crop', alt:'Wenkbrauw styling' },
    { cat:'beauty', url:'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=700&auto=format&fit=crop', alt:'Verzorgende handmassage' },
    { cat:'nagels', url:'https://images.unsplash.com/photo-1519014816548-bf5751d51d7e?q=80&w=700&auto=format&fit=crop', alt:'Pastel gelnagels' },
    { cat:'nagels', url:'https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=700&auto=format&fit=crop', alt:'Glitter nail art' },
    { cat:'wimpers', url:'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=700&auto=format&fit=crop', alt:'Natuurlijke wimperlook' },
    { cat:'beauty', url:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=700&auto=format&fit=crop', alt:'Beautyproducten in de salon' },
    { cat:'nagels', url:'https://images.unsplash.com/photo-1600628421055-4d30de868b8f?q=80&w=700&auto=format&fit=crop', alt:'Champagne gouden nagels' },
    { cat:'nagels', url:'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?q=80&w=700&auto=format&fit=crop', alt:'Klassieke nude manicure' }
  ];

  function initGallery(){
    const grid = document.getElementById('galleryGrid');
    if(!grid) return;

    grid.innerHTML = GALLERY_DATA.map((item, i) => `
      <figure class="gallery-item" data-category="${item.cat}" data-index="${i}" tabindex="0" role="button" aria-label="Vergroot foto: ${item.alt}">
        <img src="${item.url}" alt="${item.alt}" loading="lazy">
        <figcaption class="gallery-item-overlay">${item.alt}</figcaption>
      </figure>
    `).join('');

    // re-observe new items for reveal animation
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.1 });
    grid.querySelectorAll('.gallery-item').forEach(i => io.observe(i));

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        grid.querySelectorAll('.gallery-item').forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.classList.toggle('hidden', !show);
        });
      });
    });
  }

  /* ---------------- LIGHTBOX ---------------- */
  function initLightbox(){
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const grid = document.getElementById('galleryGrid');
    if(!lightbox || !grid) return;

    let currentIndex = 0;

    const visibleItems = () => Array.from(grid.querySelectorAll('.gallery-item:not(.hidden)'));

    const open = (index) => {
      const items = visibleItems();
      if(!items.length) return;
      currentIndex = index;
      const item = items[currentIndex];
      const src = item.querySelector('img').src;
      const alt = item.querySelector('img').alt;
      img.src = src; img.alt = alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    const step = (dir) => {
      const items = visibleItems();
      currentIndex = (currentIndex + dir + items.length) % items.length;
      const item = items[currentIndex];
      img.src = item.querySelector('img').src;
      img.alt = item.querySelector('img').alt;
    };

    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if(!item) return;
      const items = visibleItems();
      open(items.indexOf(item));
    });
    grid.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        const item = e.target.closest('.gallery-item');
        if(item){ e.preventDefault(); open(visibleItems().indexOf(item)); }
      }
    });

    document.getElementById('lightboxClose')?.addEventListener('click', close);
    document.getElementById('lightboxNext')?.addEventListener('click', () => step(1));
    document.getElementById('lightboxPrev')?.addEventListener('click', () => step(-1));
    lightbox.addEventListener('click', (e) => { if(e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
      if(!lightbox.classList.contains('open')) return;
      if(e.key === 'Escape') close();
      if(e.key === 'ArrowRight') step(1);
      if(e.key === 'ArrowLeft') step(-1);
    });
  }

  /* ---------------- REVIEWS SLIDER ---------------- */
  function initReviewsSlider(){
    const track = document.getElementById('reviewsTrack');
    const dotsWrap = document.getElementById('reviewsDots');
    if(!track || !dotsWrap) return;
    const slides = Array.from(track.children);
    let index = 0;
    let timer;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Ga naar review ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goTo(i){
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === index));
      resetTimer();
    }
    function resetTimer(){
      clearInterval(timer);
      timer = setInterval(() => goTo(index + 1), 5500);
    }
    resetTimer();
  }

  /* ---------------- REVIEWS SUMMARY (rating breakdown reveal) ---------------- */
  function initReviewsSummary(){
    const summary = document.querySelector('.reviews-summary');
    if(!summary) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.4 });
    io.observe(summary);
  }

  /* ---------------- OPENING HOURS ---------------- */
  function initOpeningHours(){
    const pill = document.getElementById('statusPill');
    const text = document.getElementById('statusText');
    const list = document.getElementById('hoursList');
    if(!pill || !text) return;

    const schedule = {
      1: [9 * 60, 17 * 60 + 30],
      2: [9 * 60, 17 * 60],
      3: [9 * 60, 17 * 60],
      4: [9 * 60, 17 * 60],
      5: [9 * 60, 17 * 60],
      6: null,
      0: null
    };

    const now = new Date();
    const day = now.getDay();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const today = schedule[day];
    const isOpen = today && minutes >= today[0] && minutes < today[1];

    pill.classList.toggle('closed', !isOpen);
    text.textContent = isOpen ? 'Nu geopend' : 'Nu gesloten';

    const todayItem = list?.querySelector(`li[data-day="${day}"]`);
    todayItem?.classList.add('today');
  }

  /* ---------------- BOOKING FORM ---------------- */
  function initBookingForm(){
    const form = document.getElementById('bookingForm');
    const successBox = document.getElementById('formSuccess');
    const progressBar = document.getElementById('formProgressBar');
    const submitBtn = document.getElementById('submitBtn');
    if(!form) return;

    const requiredFields = Array.from(form.querySelectorAll('[required]'));

    const updateProgress = () => {
      const filled = requiredFields.filter(f => {
        if(f.type === 'checkbox') return f.checked;
        return f.value.trim() !== '';
      }).length;
      const pct = Math.round((filled / requiredFields.length) * 100);
      if(progressBar) progressBar.style.width = pct + '%';
    };
    requiredFields.forEach(f => f.addEventListener('input', updateProgress));
    requiredFields.forEach(f => f.addEventListener('change', updateProgress));
    updateProgress();

    // Set min date to today
    const dateInput = document.getElementById('date');
    if(dateInput){
      const iso = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', iso);
    }

    // File upload UX
    const fileInput = document.getElementById('inspiration');
    const fileUpload = document.getElementById('fileUpload');
    const fileName = document.getElementById('fileUploadName');
    fileInput?.addEventListener('change', () => {
      fileName.textContent = fileInput.files.length ? fileInput.files[0].name : '';
    });
    ['dragover','dragleave','drop'].forEach(evt => {
      fileUpload?.addEventListener(evt, (e) => {
        e.preventDefault();
        fileUpload.classList.toggle('dragover', evt === 'dragover');
      });
    });

    const validators = {
      firstName: v => v.trim().length >= 2 || 'Vul je voornaam in (min. 2 tekens).',
      lastName: v => v.trim().length >= 2 || 'Vul je achternaam in (min. 2 tekens).',
      phone: v => /^[\d\s()+-]{8,}$/.test(v.trim()) || 'Vul een geldig telefoonnummer in.',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Vul een geldig e-mailadres in.',
      treatment: v => v !== '' || 'Kies een behandeling.',
      date: v => v !== '' || 'Kies een datum.',
      time: v => v !== '' || 'Kies een tijd.'
    };

    function validateField(field){
      const wrapper = field.closest('.field');
      const errorEl = wrapper?.querySelector('.field-error');
      const rule = validators[field.name];
      if(!rule){ return true; }
      const result = rule(field.value);
      if(result === true){
        wrapper.classList.remove('error');
        if(errorEl) errorEl.textContent = '';
        return true;
      } else {
        wrapper.classList.add('error');
        if(errorEl) errorEl.textContent = result;
        return false;
      }
    }

    Object.keys(validators).forEach(name => {
      const field = form.querySelector(`[name="${name}"]`);
      field?.addEventListener('blur', () => validateField(field));
      field?.addEventListener('input', () => {
        if(field.closest('.field').classList.contains('error')) validateField(field);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      Object.keys(validators).forEach(name => {
        const field = form.querySelector(`[name="${name}"]`);
        if(field && !validateField(field)) valid = false;
      });

      const terms = document.getElementById('terms');
      const termsError = document.getElementById('termsError');
      if(!terms.checked){
        termsError.textContent = 'Je moet akkoord gaan met de algemene voorwaarden.';
        valid = false;
      } else {
        termsError.textContent = '';
      }

      if(!valid){
        form.querySelector('.field.error, .checks .field-error:not(:empty)')
          ?.scrollIntoView({ behavior:'smooth', block:'center' });
        return;
      }

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Simulated submission (no backend configured)
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        form.style.display = 'none';
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior:'smooth', block:'center' });
      }, 1400);
    });
  }

  /* ---------------- NEWSLETTER ---------------- */
  function initNewsletter(){
    const form = document.getElementById('newsletterForm');
    const msg = document.getElementById('newsletterMsg');
    if(!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.textContent = 'Bedankt voor je aanmelding!';
      form.reset();
      setTimeout(() => msg.textContent = '', 4000);
    });
  }

  /* ---------------- SCROLL TO TOP ---------------- */
  function initScrollTop(){
    const btn = document.getElementById('scrollTop');
    if(!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 600);
    }, { passive:true });
    btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  }

})();
