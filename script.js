const body = document.body;
const menuToggle = document.querySelector("#menuToggle");
const themeToggle = document.querySelector("#themeToggle");
const nav = document.querySelector("#nav");
const progress = document.querySelector(".progress");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("portfolio-theme", body.classList.contains("dark") ? "dark" : "light");
});

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
