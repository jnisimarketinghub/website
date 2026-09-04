
window.dataLayer = window.dataLayer || [];

function trackEvent(eventName, params = {}) {
  window.dataLayer.push({ event: eventName, ...params });
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

document.querySelectorAll(".track-whatsapp").forEach(el => {
  el.addEventListener("click", () => trackEvent("whatsapp_click", { location: "floating_button" }));
});

document.querySelectorAll(".track-consultation").forEach(el => {
  el.addEventListener("click", () => trackEvent("consultation_click"));
});

document.querySelectorAll(".track-quote").forEach(el => {
  el.addEventListener("click", () => trackEvent("quote_button_click"));
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {
  quoteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(quoteForm);
    const name = data.get("name");
    const business = data.get("business");
    const contact = data.get("contact");
    const service = data.get("service");
    const budget = data.get("budget") || "Not specified";
    const message = data.get("message");

    const text =
`Hello JNISI Marketing Hub,

I would like to request a quote.

Name: ${name}
Business: ${business}
Email/WhatsApp: ${contact}
Service required: ${service}
Approximate budget: ${budget}

Project details:
${message}`;

    trackEvent("quote_form_submit", {
      service_required: service,
      budget_range: budget
    });

    const url = "https://wa.me/256780446883?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener");
  });
}
