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
