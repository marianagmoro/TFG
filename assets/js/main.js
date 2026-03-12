// Navegación suave
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling para los enlaces de navegación
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navHeight = document.querySelector(".main-nav").offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Efecto parallax ligero en el hero
  const hero = document.querySelector(".hero-section");
  if (hero) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;

      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${parallax}px)`;
      }
    });
  }

  // Animación de aparición de las cards al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Aplicar animación a las cards de proyectos
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Cambiar opacidad de la navegación al hacer scroll
  const nav = document.querySelector(".main-nav");
  if (nav) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        nav.style.background = "rgba(255, 255, 255, 0.98)";
      } else {
        nav.style.background = "rgba(255, 255, 255, 0.95)";
      }
    });
  }

  // Filtrado por años - Versión simplificada
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("year-link")) {
      e.preventDefault();

      const selectedYear = e.target.textContent.trim();
      console.log("Año seleccionado:", selectedYear);

      // Obtener todas las imágenes de la galería
      const galleryItems = document.querySelectorAll(".gallery-item");
      console.log("Items encontrados:", galleryItems.length);

      // Remover clase activa de todos los años
      document.querySelectorAll(".year-link").forEach((link) => {
        link.classList.remove("active");
      });

      // Si ya está activo este año, mostrar todos
      if (e.target.classList.contains("was-active")) {
        e.target.classList.remove("was-active");
        galleryItems.forEach((item) => {
          item.style.display = "block";
        });
        console.log("Mostrando todos los proyectos");
        return;
      }

      // Marcar como activo
      e.target.classList.add("active");
      e.target.classList.add("was-active");

      // Filtrar por año
      let visibleCount = 0;
      galleryItems.forEach((item) => {
        const itemYear = item.getAttribute("data-year");
        console.log("Item año:", itemYear, "Año buscado:", selectedYear);

        if (itemYear === selectedYear) {
          item.style.display = "block";
          visibleCount++;
        } else {
          item.style.display = "none";
        }
      });

      console.log("Items visibles:", visibleCount);
    }
  });
});
