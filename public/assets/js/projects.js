document.addEventListener("DOMContentLoaded", () => {
  const yearLinks = document.querySelectorAll(".year-link");
  const allProjectsLink = document.querySelector(".projects-text[data-year='all']");
  const projectItems = document.querySelectorAll(".gallery-item");
  const gallery = document.querySelector(".gallery");
  const FADE_TIME = 250;

  function setActiveFilter(selectedElement) {
    yearLinks.forEach((item) => item.classList.remove("active"));
    if (allProjectsLink) {
      allProjectsLink.classList.remove("active-filter");
    }

    if (selectedElement.classList.contains("year-link")) {
      selectedElement.classList.add("active");
    } else if (selectedElement === allProjectsLink) {
      allProjectsLink.classList.add("active-filter");
    }
  }

  function applyFilter(selectedYear) {
    gallery.classList.add("is-filtering");

    setTimeout(() => {
      projectItems.forEach((project) => {
        const projectYear = project.dataset.year;
        const shouldShow =
          selectedYear === "all" || projectYear === selectedYear;

        project.classList.toggle("is-hidden", !shouldShow);
      });

      gallery.classList.remove("is-filtering");
    }, FADE_TIME);
  }

  yearLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setActiveFilter(link);
      applyFilter(link.dataset.year);
    });
  });

  if (allProjectsLink) {
    allProjectsLink.addEventListener("click", (event) => {
      event.preventDefault();
      setActiveFilter(allProjectsLink);
      applyFilter("all");
    });
  }
});