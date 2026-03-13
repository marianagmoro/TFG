document.addEventListener("DOMContentLoaded", () => {

  const images = document.querySelectorAll(".project-gallery-image");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const counter = document.getElementById("lightbox-counter");

  const sources = [...images].map(img => img.src);

  let index = 0;

  function openLightbox(i) {
    index = i;
    lightboxImage.src = sources[index];
    counter.textContent = `${index + 1} / ${sources.length}`;
    lightbox.classList.add("is-open");
  }

  function nextImage() {
    index = (index + 1) % sources.length;
    openLightbox(index);
  }

  function prevImage() {
    index = (index - 1 + sources.length) % sources.length;
    openLightbox(index);
  }

  images.forEach((img, i) => {
    img.addEventListener("click", () => openLightbox(i));
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nextImage();
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    prevImage();
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("is-open");
  });

  document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("is-open")) return;

    if (e.key === "Escape") lightbox.classList.remove("is-open");
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();

  });

});