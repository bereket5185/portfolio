const body       = document.body;
const menuToggle = document.querySelector("#menuToggle");
const themeToggle= document.querySelector("#themeToggle");
const nav        = document.querySelector("#nav");
const progress   = document.querySelector(".progress");

// Restore saved theme
if (localStorage.getItem("portfolio-theme") === "dark") body.classList.add("dark");

// Mobile menu
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Theme toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("portfolio-theme", body.classList.contains("dark") ? "dark" : "light");
});

// Scroll progress bar
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = scrollable > 0 ? `${(window.scrollY / scrollable) * 100}%` : "0%";
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Auto-dismiss flash messages
const flash = document.querySelector(".flash");
if (flash) setTimeout(() => flash.style.display = "none", 5000);

// ── Scroll-reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ── Active nav on scroll ──────────────────────────────────────
const sections  = document.querySelectorAll("section[id]");
const navLinks  = nav.querySelectorAll("a[href^='#']");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove("active"));
      const active = nav.querySelector(`a[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(s => navObserver.observe(s));

// ── Back-to-top ───────────────────────────────────────────────
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
