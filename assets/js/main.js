// SolarPro — minimal interactions
(function () {
  "use strict";

  document.documentElement.classList.add("js-on");

  // Header: float over hero while near top, solidify when scrolled past hero
  const heroHeader = document.querySelector("[data-hero-header]");
  if (heroHeader) {
    const hero = document.querySelector(".hero");
    const onScroll = () => {
      const threshold = hero ? hero.offsetHeight - 120 : 240;
      if (window.scrollY > threshold) {
        heroHeader.classList.remove("site-header--floating");
      } else {
        heroHeader.classList.add("site-header--floating");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile nav toggle
  const toggle = document.querySelector("[data-nav-toggle]");
  const mobile = document.querySelector("[data-nav-mobile]");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobile.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobile.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      })
    );
  }

  // Reveal on scroll
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
      )
    : null;
  document.querySelectorAll(".reveal").forEach((el) => io && io.observe(el));

  // Form validation (minimal)
  const form = document.querySelector("[data-lead-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector("[data-status]");
      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.textContent = "Надсилаємо…";
      setTimeout(() => {
        status.textContent = "Дякуємо! Ми зв'яжемось із вами протягом 15 хвилин.";
        status.style.color = "var(--c-accent-600)";
        form.reset();
        btn.disabled = false;
        btn.textContent = "Надіслати запит";
      }, 900);
    });
  }

  // Animated counters
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const decimals = (el.dataset.count.split(".")[1] || "").length;
        let cur = 0;
        const step = target / 60;
        const tick = () => {
          cur += step;
          if (cur >= target) {
            el.textContent = target.toFixed(decimals) + suffix;
          } else {
            el.textContent = cur.toFixed(decimals) + suffix;
            requestAnimationFrame(tick);
          }
        };
        tick();
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => co.observe(c));
  }
})();
