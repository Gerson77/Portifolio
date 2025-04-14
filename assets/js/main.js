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
  const iconToggle = document.querySelector(".toggle_icon");
  const navBar = document.querySelector(".menu");
  const menuLinks = document.querySelectorAll(".menu_link");
  const iconClose = document.querySelector(".close_icon");

  if (!iconToggle || !navBar || !iconClose) {
    console.error("Elementos de navegação não encontrados no DOM.");
    return;
  }

  iconToggle.addEventListener("click", () => navBar.classList.toggle("active"));
  iconClose.addEventListener("click", () => navBar.classList.remove("active"));

  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", () => navBar.classList.remove("active"));
  });
}
initResponsiveNav();

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
  gsap.from('.header', {
    opacity: 0,
    y: -100,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.header',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

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