const body        = document.body;
const menuToggle  = document.querySelector("#menuToggle");
const themeToggle = document.querySelector("#themeToggle");
const nav         = document.querySelector("#nav");
const progress    = document.querySelector(".progress");

// ── Restore saved theme ───────────────────────────────────────
if (localStorage.getItem("portfolio-theme") === "dark") body.classList.add("dark");

// ── Mobile menu ───────────────────────────────────────────────
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// ── Theme toggle ──────────────────────────────────────────────
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("portfolio-theme", body.classList.contains("dark") ? "dark" : "light");
});

// ── Scroll progress bar ───────────────────────────────────────
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = scrollable > 0 ? `${(window.scrollY / scrollable) * 100}%` : "0%";
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// ── Auto-dismiss flash messages ───────────────────────────────
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
const sections = document.querySelectorAll("section[id]");
const navLinks = nav.querySelectorAll("a[href^='#']");

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

// ── Typing animation ──────────────────────────────────────────
(function initTyping() {
  const el = document.querySelector(".typing-text");
  if (!el) return;

  const phrases = [
    "Data Analyst",
    "ML Engineer",
    "Python Developer",
    "Credit-Risk Modeler",
    "Aspiring AI Engineer",
  ];

  let phraseIdx  = 0;
  let charIdx    = 0;
  let deleting   = false;
  let pauseTimer = null;

  const TYPE_SPEED   = 70;   // ms per character forward
  const DELETE_SPEED = 38;   // ms per character backward
  const PAUSE_AFTER  = 1800; // ms pause at full word
  const PAUSE_BEFORE = 400;  // ms pause before typing next

  function tick() {
    const current = phrases[phraseIdx];

    if (deleting) {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        pauseTimer = setTimeout(tick, PAUSE_BEFORE);
        return;
      }
      pauseTimer = setTimeout(tick, DELETE_SPEED);
    } else {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        pauseTimer = setTimeout(tick, PAUSE_AFTER);
        return;
      }
      pauseTimer = setTimeout(tick, TYPE_SPEED);
    }
  }

  // Start after a short delay so page load feels clean
  setTimeout(tick, 800);
})();

// ── Project card 3-D tilt on hover ───────────────────────────
(function initTilt() {
  const cards = document.querySelectorAll(".project-card");
  const MAX_TILT = 6; // degrees

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotateX = -dy * MAX_TILT;
      const rotateY =  dx * MAX_TILT;
      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition =
        "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s cubic-bezier(0.22,1,0.36,1)";
      // reset transition after it completes so mousemove feels responsive again
      setTimeout(() => { card.style.transition = ""; }, 500);
    });

    card.addEventListener("mouseenter", () => {
      card.style.transition = "none";
    });
  });
})();

// ── Metric count-up animation ─────────────────────────────────
(function initCountUp() {
  const metrics = document.querySelectorAll(".metric-row b");

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.textContent, 10);
      if (isNaN(target)) return;

      let current  = 0;
      const step   = Math.ceil(target / 30);
      const timer  = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 40);

      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  metrics.forEach(m => countObserver.observe(m));
})();
