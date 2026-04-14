// ===== Header scroll effect =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    header.classList.toggle('header--scrolled', currentScroll > 50);
    lastScroll = currentScroll;
}, { passive: true });

// ===== Mobile menu =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

nav.querySelectorAll('.header__link, .header__nav-mobile-cta .btn').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header__link');

function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ===== Scroll reveal animations =====
function addRevealClasses() {
    const revealElements = [
        '.section__header',
        '.about__text',
        '.about__images',
        '.service-card',
        '.products__showcase',
        '.products__gallery img',
        '.portfolio-card',
        '.portfolio__nova',
        '.leasing__content',
        '.leasing__image',
        '.gallery__item',
        '.faq__item',
        '.contacts__form',
        '.contacts__info'
    ];

    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('reveal');
            if (i > 0 && i < 4) {
                el.classList.add('reveal-delay-' + i);
            }
        });
    });
}

addRevealClasses();

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Counter animation =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const count = parseInt(target.dataset.count);
            if (!count) return;

            let current = 0;
            const step = Math.ceil(count / 60);
            const timer = setInterval(() => {
                current += step;
                if (current >= count) {
                    current = count;
                    clearInterval(timer);
                }
                target.textContent = current.toLocaleString('uk-UA');
            }, 25);

            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ===== Contact form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name')?.trim();
    const phone = formData.get('phone')?.trim();

    if (!name || !phone) {
        const firstEmpty = !name
            ? contactForm.querySelector('#name')
            : contactForm.querySelector('#phone');
        firstEmpty.focus();
        firstEmpty.style.borderColor = '#ef4444';
        setTimeout(() => firstEmpty.style.borderColor = '', 2000);
        return;
    }

    // Show success state
    contactForm.innerHTML = `
        <div class="form-success">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F5C518" stroke-width="2" style="margin: 0 auto 16px">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <h3>Дякуємо за звернення!</h3>
            <p>Ми зв'яжемося з вами найближчим часом.</p>
        </div>
    `;
});

// Remove red border on input
document.querySelectorAll('.form__input').forEach(input => {
    input.addEventListener('input', () => {
        input.style.borderColor = '';
    });
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
