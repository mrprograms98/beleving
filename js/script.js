// Smooth reveal animation

const elements = document.querySelectorAll(".team-card, .treatment-grid div, .contact-container");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.15 });

elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(60px)";
    el.style.transition = "all 1.2s ease";
    observer.observe(el);
});

const menuToggle = document.querySelector(".menu-toggle");
const fullscreenMenu = document.querySelector(".fullscreen-menu");
const menuClose = document.querySelector(".menu-close");

menuToggle.addEventListener("click", () => {
    fullscreenMenu.classList.add("active");
});

menuClose.addEventListener("click", () => {
    fullscreenMenu.classList.remove("active");
});
// Dropdown toggle
const langBtnHeader = document.querySelector('.lang-btn-header');
const langMenu = document.querySelector('.lang-menu');

langBtnHeader.addEventListener('click', () => {
    langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block';
});

// Selecteer taal
document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        langMenu.style.display = 'none';
        langBtnHeader.textContent = btn.textContent + " ▼";
        // Hier kun je eventueel de taal switch functionaliteit toevoegen
        console.log("Gekozen taal:", btn.dataset.lang);
    });
});

// Sluiten als je buiten klikt
document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-dropdown')) {
        langMenu.style.display = 'none';
    }
});

window.addEventListener("scroll", function() {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

document.querySelector(".intake-form").addEventListener("submit", function(e){
    e.preventDefault();
    const btn = this.querySelector(".submit-btn");
    btn.innerText = "Verzonden ✓";
    btn.style.background = "#6f8f87";
});
