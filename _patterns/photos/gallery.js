(function () {
  "use strict";

  const ui = {
    btn: null,
    gallery: null,
    current: null,
    total: null,
    carousel: null,
    img: null,
    next: null,
    prev: null,
    close: null,
  };

  let currentIndex = 0;
  let imgs = [];

  const canCarouselOpen = () => {
    return Boolean(
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--gallery-carousel-can-open",
        ),
        10,
      ),
    );
  };

  const findElems = () => {
    ui.btn = document.querySelector('[data-control="gallery-btn"]');
    ui.gallery = document.querySelector('[data-control="gallery"]');
    ui.current = document.querySelector('[data-control="gallery-carousel-current"]');
    ui.total = document.querySelector('[data-control="gallery-carousel-total"]');
    ui.carousel = document.querySelector('[data-control="gallery-carousel"]');
    ui.img = document.querySelector('[data-control="gallery-carousel-img"]');
    ui.next = document.querySelector('[data-control="gallery-btn-next"]');
    ui.prev = document.querySelector('[data-control="gallery-btn-prev"]');
    ui.close = document.querySelector('[data-control="gallery-btn-close"]');
  };

  const setStatus = () => {
    ui.current.innerText = currentIndex + 1;
  };

  const open = (e, loc) => {
    if (!canCarouselOpen()) {
      return;
    }
    ui.total.innerText = imgs.length;
    ui.carousel.hidden = false;
    ui.carousel.setAttribute("aria-hidden", false);
    document.documentElement.style.overflow = "hidden";
    currentIndex = loc || 0;
    ui.img.setAttribute("src", imgs[currentIndex]);
    setStatus();
  };

  const close = () => {
    ui.carousel.hidden = true;
    ui.carousel.setAttribute("aria-hidden", true);
    document.documentElement.style.overflow = "auto";
  };

  const next = () => {
    let nextIndex = currentIndex + 1;
    currentIndex++;
    if (nextIndex >= imgs.length) {
      nextIndex = 0;
      currentIndex = 0;
    }
    ui.img.setAttribute("src", imgs[nextIndex]);
    setStatus();
  };

  const prev = () => {
    let prevIndex = currentIndex - 1;
    currentIndex--;
    if (prevIndex < 0) {
      prevIndex = imgs.length - 1;
      currentIndex = imgs.length - 1;
    }
    ui.img.setAttribute("src", imgs[prevIndex]);
    setStatus();
  };

  const initImages = () => {
    const imgElems = ui.gallery.querySelectorAll("img");
    imgs = [].map.call(imgElems, (e) => e.getAttribute("src"));
    ui.gallery.classList.add("is-clickable");
    ui.gallery.addEventListener("click", (e) => {
      if (e.target.matches(".gallery-row img")) {
        open(e, imgs.indexOf(e.target.getAttribute("src")));
      }
    });
  };

  const initBtns = (btn) => {
    ui.btn.hidden = false;
    ui.btn.setAttribute("aria-hidden", false);
    ui.btn.addEventListener("click", open);
    ui.close.addEventListener("click", close);
    ui.next.addEventListener("click", next);
    ui.prev.addEventListener("click", prev);
  };

  const initKeys = () => {
    document.addEventListener("keydown", (e) => {
      if (ui.carousel.hidden) {
        return;
      }
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          next();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          prev();
          break;
        case "Escape":
          close();
          break;
        case "Tab":
          e.preventDefault();
          break;
      }
    });
  };

  const init = () => {
    if (!document.querySelector('[data-control="gallery-btn"]')) {
      return;
    }
    findElems();
    initImages();
    initBtns();
    initKeys();
  };

  init();
})();
