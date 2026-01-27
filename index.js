/* ===== SCROLL ANIMATION ===== */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".animate").forEach(el => observer.observe(el));

/* ===== TYPING EFFECT ===== */
const words = ["Frontend Developer", "UI Developer", "Web Developer"];
let i = 0, j = 0, isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
    const word = words[i];
    typingElement.textContent = word.substring(0, j);

    if (!isDeleting && j < word.length) {
        j++;
    } else if (isDeleting && j > 0) {
        j--;
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) i = (i + 1) % words.length;
    }
    setTimeout(typeEffect, isDeleting ? 80 : 120);
}
typeEffect();

/* ===== DARK MODE TOGGLE ===== */
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});

// Automatically set current year in footer
document.addEventListener("DOMContentLoaded", function () {
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
