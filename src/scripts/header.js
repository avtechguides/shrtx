// ------------------------
// Mobile Menu Toggle
// ------------------------
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn?.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");

  // Toggle visibility
  mobileMenu.classList.toggle("hidden");

  // Animate smoothly using scale + opacity
  mobileMenu.style.transition = "transform 0.3s ease, opacity 0.3s ease";
  mobileMenu.style.transform = isOpen ? "scaleY(0.95)" : "scaleY(1)";
  mobileMenu.style.opacity = isOpen ? "0" : "1";

  // Accessibility
  menuBtn.setAttribute("aria-expanded", (!isOpen).toString());
});

// ------------------------
// Header Scroll Shadow
// ------------------------
const header = document.getElementById("site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("shadow-md");
  } else {
    header.classList.remove("shadow-md");
  }
});

// ------------------------
// Cookie Banner & Modal Logic
// ------------------------
const cookieBanner = document.getElementById("cookie-banner");
const cookieModal = document.getElementById("cookie-modal");
const acceptAllBtn = document.getElementById("accept-all-cookies");
const customizeBtn = document.getElementById("customize-cookies");
const saveBtn = document.getElementById("save-cookies");
const declineBtn = document.getElementById("decline-cookies");

// Load stored consent
const storedConsent = JSON.parse(localStorage.getItem("cookieConsent") || "{}");
if (!storedConsent.necessary) {
  cookieBanner.classList.remove("hidden");
}

// Accept All
acceptAllBtn?.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", JSON.stringify({ necessary: true, analytics: true }));
  cookieBanner.classList.add("hidden");
});

// Customize (show modal)
customizeBtn?.addEventListener("click", () => {
  cookieModal.classList.remove("hidden");
});

// Save preferences
saveBtn?.addEventListener("click", () => {
  const analytics = document.querySelector('#cookie-form input[name="analytics"]').checked;
  localStorage.setItem("cookieConsent", JSON.stringify({ necessary: true, analytics }));
  cookieBanner.classList.add("hidden");
  cookieModal.classList.add("hidden");
});

// Decline all optional cookies
declineBtn?.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", JSON.stringify({ necessary: true, analytics: false }));
  cookieBanner.classList.add("hidden");
  cookieModal.classList.add("hidden");
});
