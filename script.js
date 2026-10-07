const pages = [...document.querySelectorAll(".page")];
const navLinks = [...document.querySelectorAll("[data-page]")];
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const loader = document.querySelector(".page-loader");
const toast = document.querySelector("#toast");

function showPage(id, updateHash = true) {
  const target = document.getElementById(id) || document.getElementById("home");
  pages.forEach(page => page.classList.toggle("active", page === target));
  navLinks.forEach(link => link.classList.toggle("active", link.dataset.page === target.id));
  mainNav.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (updateHash) history.pushState({ page: target.id }, "", `#${target.id}`);
}

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

window.addEventListener("popstate", () => showPage(location.hash.slice(1) || "home", false));
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => loader.classList.add("hide"), 450);
  showPage(location.hash.slice(1) || "home", false);
  document.querySelector("#year").textContent = new Date().getFullYear();
});

menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));

document.querySelector("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.currentTarget;
  const name = form.elements.name.value.trim();
  showToast(`Thanks ${name || "there"} — your message is ready to be connected to your email service.`);
  form.reset();
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 4000);
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") mainNav.classList.remove("open");
});
