document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");
  const overlay = document.querySelector(".overlay");

  const emailWarning = document.querySelector(".message-email");
  const phoneWarning = document.querySelector(".message-phone");

  function closeSuccessMessage() {
    successMessage.style.display = "none";
  }

  function resetForm() {
    emailWarning.style.display = "none";
    phoneWarning.style.display = "none";
    form.reset();
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    emailWarning.style.display = "none";
    phoneWarning.style.display = "none";

    const email = form.querySelector('input[name="email"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();

    if (!validateEmail(email)) {
      emailWarning.style.display = "flex";
      return;
    }

    if (!validatePhone(phone)) {
      phoneWarning.style.display = "flex";
      return;
    }

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          successMessage.style.display = "flex";

          setTimeout(closeSuccessMessage, 3000);

          resetForm();
        } else {
          throw new Error("Erro ao enviar a mensagem.");
        }
      })
      .catch((error) => {
        alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
        console.error(error);
      });
  });

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex = /^\(?\d{2}\)?[\s]?\d{5}-?\d{4}$/;
    return phoneRegex.test(phone);
  }

  overlay.addEventListener("click", closeSuccessMessage);
});

// Navegação Responsiva

function initResponsiveNav() {
  const toggleIcon = document.querySelector(".toggle_icon");
  const closeIcon = document.querySelector(".close_icon");
  const mobileNav = document.getElementById("mobile-nav");

  if (!toggleIcon || !closeIcon || !mobileNav) return;

  const header = document.getElementById("header");
  const mobileLinks = mobileNav.querySelectorAll(".mobile-menu-link");

  function closeMobileNav() {
    mobileNav.classList.remove("open");
    // header.classList.remove("nav-open");
    // document.body.style.overflow = "";
    toggleIcon.style.display = "";
    closeIcon.style.display = "none";
  }

  function openMobileNav() {
    mobileNav.classList.add("open");
    // header.classList.add("nav-open");
    // document.body.style.overflow = "hidden";
    toggleIcon.style.display = "none";
    closeIcon.style.display = "";
  }

  // Initial state: show toggle, hide close
  closeIcon.style.display = "none";

  toggleIcon.addEventListener("click", openMobileNav);
  closeIcon.addEventListener("click", closeMobileNav);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  mobileNav.addEventListener("click", (e) => {
    if (e.target === mobileNav) {
      closeMobileNav();
    }
  });
}

window.addEventListener("load", initResponsiveNav);

// Header Dinâmico
function scrollHeader() {
  const header = document.getElementById("header");
  if (header) {
    window.scrollY >= 20
      ? header.classList.add("active")
      : header.classList.remove("active");
  }
}
window.addEventListener("scroll", scrollHeader);

// Animação de Digitação
const typed = document.querySelector(".typed");
if (typed) {
  const typedStrings = typed.getAttribute("data-typed-items").split(",");
  new Typed(".typed", {
    strings: typedStrings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
  });
}

// Rastreamento de Seções Ativas
function scrollActive() {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 50;
    const sectionId = section.getAttribute("id");
    const menuLink = document.querySelector(`.menu a[href*="${sectionId}"]`);

    if (menuLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        menuLink.classList.add("active-link");
      } else {
        menuLink.classList.remove("active-link");
      }
    }
  });
}
window.addEventListener("scroll", scrollActive);

// Filtros de Portfólio
function initPortifolioFilters() {
  const filtersItems = document.querySelectorAll(".portifolio_filters li");

  function activePortifolio(event) {
    const clickedElement = event.target;

    filtersItems.forEach((el) => el.classList.remove("filter-active"));
    clickedElement.classList.add("filter-active");
  }

  filtersItems.forEach((el) => el.addEventListener("click", activePortifolio));

  // Inicializa o MixItUp
  const portifolioContainer = document.querySelector(
    ".portifolio_wrap-container"
  );
  if (portifolioContainer) {
    mixitup(portifolioContainer, {
      selectors: {
        target: ".portifolio_item",
      },
      animation: {
        duration: 300,
      },
    });
  }
}
initPortifolioFilters();

// Animações

// Registre o ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Função para configurar as animações apenas para telas grandes
function setupAnimations() {
  const isLargeScreen = window.innerWidth >= 1024; // Verifica se a tela é maior ou igual a 1024px

  if (!isLargeScreen) return; // Sai da função se a tela for menor que 1024px

  // Animação do Header
  // gsap.from('.header', {
  //   opacity: 0,
  //   y: -100,
  //   duration: 0.5,
  //   ease: "power2.out",
  //   scrollTrigger: {
  //     trigger: '.header',
  //     start: 'top 80%',
  //     toggleActions: 'play none none none'
  //   }
  // });

  // Animação da Seção Hero
  gsap.from('.hero_content', {
    opacity: 0,
    x: -300,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.hero_content',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('.hero_img', {
    opacity: 0,
    x: 300,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.hero_img',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Animação da Seção Sobre
  gsap.from('.about', {
    opacity: 0,
    y: 300,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.about',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Animação da Seção Portifólio
  gsap.from('.portifolio', {
    opacity: 0,
    y: 200,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.portifolio',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Animação da Seção Contato
  gsap.from('.contact', {
    opacity: 0,
    x: 200,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
}

// Inicializa as animações
setupAnimations();

// Reajusta as animações quando a janela for redimensionada
window.addEventListener('resize', () => {
  // Limpa todas as animações existentes
  gsap.killTweensOf('.header');
  gsap.killTweensOf('.hero_content');
  gsap.killTweensOf('.hero_img');
  gsap.killTweensOf('.about');
  gsap.killTweensOf('.portifolio');
  gsap.killTweensOf('.contact');

  // Reconfigura as animações
  setupAnimations();
});


// document.addEventListener("DOMContentLoaded", function () {
//   // ===== Contact Form =====
//   const form = document.getElementById("contact-form");
//   const successMessage = document.getElementById("success-message");
//   const overlay = document.querySelector(".overlay");
//   const emailWarning = document.querySelector(".message-email");
//   const phoneWarning = document.querySelector(".message-phone");

//   function closeSuccessMessage() {
//     successMessage.style.display = "none";
//   }

//   function resetForm() {
//     emailWarning.style.display = "none";
//     phoneWarning.style.display = "none";
//     form.reset();
//   }

//   if (form) {
//     form.addEventListener("submit", function (event) {
//       event.preventDefault();
//       emailWarning.style.display = "none";
//       phoneWarning.style.display = "none";

//       const email = form.querySelector('input[name="email"]').value.trim();
//       const phone = form.querySelector('input[name="phone"]').value.trim();

//       if (!validateEmail(email)) {
//         emailWarning.style.display = "flex";
//         return;
//       }

//       if (!validatePhone(phone)) {
//         phoneWarning.style.display = "flex";
//         return;
//       }

//       const formData = new FormData(form);

//       fetch(form.action, {
//         method: "POST",
//         body: formData,
//         headers: { Accept: "application/json" },
//       })
//         .then((response) => {
//           if (response.ok) {
//             successMessage.style.display = "flex";
//             setTimeout(closeSuccessMessage, 3000);
//             resetForm();
//           } else {
//             throw new Error("Erro ao enviar a mensagem.");
//           }
//         })
//         .catch((error) => {
//           alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
//           console.error(error);
//         });
//     });
//   }

//   function validateEmail(email) {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   }

//   function validatePhone(phone) {
//     return /^\(?\d{2}\)?[\s]?\d{5}-?\d{4}$/.test(phone);
//   }

//   if (overlay) overlay.addEventListener("click", closeSuccessMessage);

//   // ===== Responsive Nav =====
//   const toggleIcon = document.querySelector(".toggle_icon");
//   const closeIcon = document.querySelector(".close_icon");
//   const mobileNav = document.getElementById("mobile-nav");
//   const mobileLinks = document.querySelectorAll(".mobile-menu-link");

//   if (toggleIcon && mobileNav) {
//     toggleIcon.addEventListener("click", () => mobileNav.classList.add("open"));
//   }
//   if (closeIcon && mobileNav) {
//     closeIcon.addEventListener("click", () => mobileNav.classList.remove("open"));
//   }
//   mobileLinks.forEach((link) => {
//     link.addEventListener("click", () => mobileNav.classList.remove("open"));
//   });

//   // ===== Header Scroll =====
//   const header = document.getElementById("header");
//   window.addEventListener("scroll", () => {
//     window.scrollY >= 20
//       ? header.classList.add("active")
//       : header.classList.remove("active");
//   });

//   // ===== Active Section Tracking =====
//   window.addEventListener("scroll", () => {
//     const sections = document.querySelectorAll("section[id]");
//     const scrollY = window.scrollY;
//     sections.forEach((section) => {
//       const h = section.offsetHeight;
//       const top = section.offsetTop - 120;
//       const id = section.getAttribute("id");
//       const link = document.querySelector(`.menu a[href*="${id}"]`);
//       if (link) {
//         scrollY > top && scrollY <= top + h
//           ? link.classList.add("active-link")
//           : link.classList.remove("active-link");
//       }
//     });
//   });

//   // ===== Typed.js =====
//   const typedEl = document.querySelector(".typed");
//   if (typedEl) {
//     const items = typedEl.getAttribute("data-typed-items").split(",");
//     new Typed(".typed", {
//       strings: items,
//       loop: true,
//       typeSpeed: 100,
//       backSpeed: 50,
//       backDelay: 2000,
//     });
//   }

//   // ===== Portfolio Filters (MixItUp) =====
//   const container = document.querySelector(".portifolio_wrap-container");
//   if (container && typeof mixitup === "function") {
//     mixitup(container, {
//       selectors: { target: ".portifolio_item" },
//       animation: { duration: 300 },
//     });
//   }

//   const filterItems = document.querySelectorAll(".portifolio_filters li");
//   filterItems.forEach((item) => {
//     item.addEventListener("click", () => {
//       filterItems.forEach((el) => el.classList.remove("filter-active"));
//       item.classList.add("filter-active");
//     });
//   });

//   // ===== GSAP Animations =====
//   gsap.registerPlugin(ScrollTrigger);

//   const animatedSelectors =
//     ".hero-badge,.hero-greeting,.hero-title,.hero-tagline,.hero-description,.hero-actions,.hero-stats,.hero-social,.hero-img-wrap,.about-body,.service-card,.skill-item,.contact-info-card,.contact-form,.cta-content";

//   function resetElementsVisibility() {
//     gsap.set(animatedSelectors, { clearProps: "all" });
//   }

//   function setupAnimations() {
//     const isLarge = window.innerWidth >= 1024;
//     if (!isLarge) {
//       resetElementsVisibility();
//       return;
//     }

//     // Hero entrance (always plays, no scroll trigger needed)
//     gsap.from(".hero-badge", { opacity: 0, y: 20, duration: 0.8, delay: 0.2 });
//     gsap.from(".hero-greeting", { opacity: 0, x: -30, duration: 0.8, delay: 0.3 });
//     gsap.from(".hero-title", { opacity: 0, x: -30, duration: 0.8, delay: 0.4 });
//     gsap.from(".hero-tagline", { opacity: 0, x: -30, duration: 0.8, delay: 0.5 });
//     gsap.from(".hero-description", { opacity: 0, x: -30, duration: 0.8, delay: 0.6 });
//     gsap.from(".hero-actions", { opacity: 0, y: 20, duration: 0.8, delay: 0.7 });
//     gsap.from(".hero-stats", { opacity: 0, y: 20, duration: 0.8, delay: 0.8 });
//     gsap.from(".hero-social", { opacity: 0, y: 20, duration: 0.8, delay: 0.9 });
//     gsap.from(".hero-img-wrap", { opacity: 0, x: 60, duration: 1, delay: 0.5 });

//     // Scroll-triggered sections (no portfolio — MixItUp handles it)
//     gsap.from(".about-body", {
//       opacity: 0, y: 40, duration: 1, ease: "power2.out",
//       scrollTrigger: { trigger: ".about-body", start: "top 85%", once: false },
//     });

//     gsap.from(".service-card", {
//       opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: "power2.out",
//       scrollTrigger: { trigger: ".services-grid", start: "top 85%", once: false },
//     });

//     gsap.from(".skill-item", {
//       opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: "power2.out",
//       scrollTrigger: { trigger: ".skills-grid", start: "top 85%", once: false },
//     });

//     gsap.from(".contact-info-card", {
//       opacity: 0, x: -30, stagger: 0.12, duration: 0.8, ease: "power2.out",
//       scrollTrigger: { trigger: ".contact-body", start: "top 85%", once: false },
//     });

//     gsap.from(".contact-form", {
//       opacity: 0, x: 30, duration: 0.8, ease: "power2.out",
//       scrollTrigger: { trigger: ".contact-body", start: "top 85%", once: false },
//     });

//     gsap.from(".cta-content", {
//       opacity: 0, y: 30, duration: 0.8, ease: "power2.out",
//       scrollTrigger: { trigger: ".cta-content", start: "top 85%", once: false },
//     });
//   }

//   setupAnimations();

//   let resizeTimer;
//   window.addEventListener("resize", () => {
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(() => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//       gsap.globalTimeline.clear();
//       resetElementsVisibility();
//       setupAnimations();
//     }, 150);
//   });
// });

// // ===== Subtle Particles Background =====
// (function () {
//   const canvas = document.getElementById("bg-particles");
//   if (!canvas) return;
//   const ctx = canvas.getContext("2d");
//   let particles = [];
//   const count = 50;

//   function resize() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   }
//   resize();
//   window.addEventListener("resize", resize);

//   for (let i = 0; i < count; i++) {
//     particles.push({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       r: Math.random() * 1.5 + 0.5,
//       dx: (Math.random() - 0.5) * 0.3,
//       dy: (Math.random() - 0.5) * 0.3,
//     });
//   }

//   function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     particles.forEach((p) => {
//       p.x += p.dx;
//       p.y += p.dy;
//       if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
//       if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
//       ctx.beginPath();
//       ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//       ctx.fillStyle = "rgba(6, 182, 212, 0.4)";
//       ctx.fill();
//     });

//     // Draw lines between close particles
//     for (let i = 0; i < particles.length; i++) {
//       for (let j = i + 1; j < particles.length; j++) {
//         const dx = particles[i].x - particles[j].x;
//         const dy = particles[i].y - particles[j].y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         if (dist < 120) {
//           ctx.beginPath();
//           ctx.moveTo(particles[i].x, particles[i].y);
//           ctx.lineTo(particles[j].x, particles[j].y);
//           ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 * (1 - dist / 120)})`;
//           ctx.stroke();
//         }
//       }
//     }
//     requestAnimationFrame(animate);
//   }
//   animate();
// })();
