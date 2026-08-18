/* ═══════════════════════════════════════════════════════════════
   BEREKET G/ALIF — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════════════════════════════ */

"use strict";

/* ── 1. Theme ────────────────────────────────────────────────── */
(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark");
  }
})();

const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const sunIcon  = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  function updateIcon() {
    themeToggle.innerHTML = document.body.classList.contains("dark") ? sunIcon : moonIcon;
    themeToggle.setAttribute("aria-label", document.body.classList.contains("dark") ? "Switch to light mode" : "Switch to dark mode");
  }
  updateIcon();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    updateIcon();
  });
}

/* ── 2. Mobile menu ──────────────────────────────────────────── */
const menuToggle = document.getElementById("menuToggle");
const nav        = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open") && !nav.contains(e.target) && e.target !== menuToggle) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}

/* ── 3. Scroll progress bar ──────────────────────────────────── */
const progress = document.querySelector(".progress");
if (progress) {
  const updateProgress = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const pct = scrollHeight - clientHeight > 0
      ? (scrollTop / (scrollHeight - clientHeight)) * 100
      : 0;
    progress.style.width = pct + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

/* ── 4. Flash auto-dismiss ───────────────────────────────────── */
const flash = document.querySelector(".flash");
if (flash) {
  setTimeout(() => {
    flash.style.transition = "opacity 0.4s, transform 0.4s";
    flash.style.opacity    = "0";
    flash.style.transform  = "translateY(-6px)";
    setTimeout(() => flash.remove(), 420);
  }, 5000);
}

/* ── 5. Scroll reveal ────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach((el) => observer.observe(el));
})();

/* ── 6. Active nav highlight ─────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll("#nav a");
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const active = document.querySelector(`#nav a[href="#${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
})();

/* ── 7. Back to top ──────────────────────────────────────────── */
(function () {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;

  const toggle = () => btn.classList.toggle("visible", window.scrollY > 400);
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

/* ── 8. Typing animation ─────────────────────────────────────── */
(function () {
  const el = document.querySelector(".typing-text");
  if (!el) return;

  const phrases = [
    "Data Analyst",
    "ML Engineer",
    "Python Developer",
    "Time Series Modeler",
    "Credit-Risk Analyst",
    "NLP Practitioner",
    "Aspiring AI Engineer",
  ];

  let phraseIdx  = 0;
  let charIdx    = 0;
  let deleting   = false;
  let pauseTimer = null;

  const TYPE_SPEED   = 68;
  const DELETE_SPEED = 36;
  const PAUSE_FULL   = 2000;
  const PAUSE_EMPTY  = 500;

  function tick() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        pauseTimer = setTimeout(tick, PAUSE_FULL);
        return;
      }
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting   = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
        pauseTimer = setTimeout(tick, PAUSE_EMPTY);
        return;
      }
    }

    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
  }

  tick();
})();

/* ── 9. 3D card tilt ─────────────────────────────────────────── */
(function () {
  const cards = document.querySelectorAll(".project-card");
  if (!cards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width  - 0.5;
      const y = (e.clientY - top)  / height - 0.5;
      card.style.transform = `translateY(-5px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();

/* ── 10. Count-up animation ──────────────────────────────────── */
(function () {
  const metrics = document.querySelectorAll(".metric-row b");
  if (!metrics.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        const raw    = entry.target.textContent.trim();
        const target = parseInt(raw, 10);
        if (isNaN(target) || target === 0) return;

        const steps    = Math.min(target, 60);
        const interval = 1200 / steps;
        let   current  = 0;

        const timer = setInterval(() => {
          current = Math.min(current + Math.ceil(target / steps), target);
          entry.target.textContent = current;
          if (current >= target) clearInterval(timer);
        }, interval);
      });
    },
    { threshold: 0.5 }
  );

  metrics.forEach((m) => observer.observe(m));
})();

/* ── 11. Smooth anchor scroll (offset for sticky header) ─────── */
(function () {
  const HEADER_HEIGHT = 76;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
