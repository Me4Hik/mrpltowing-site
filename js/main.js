// 02.03.2026 DB Refactoring cursor by Me4Hik START - MRPL Towing main.js: images, GBP, lightbox, CTA tracking, reveal

(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function markLoaded(img) {
    var block = img.closest(".media-block");
    if (!block) {
      return;
    }
    block.classList.add("is-loaded");
  }

  function markFailed(img) {
    var block = img.closest(".media-block");
    if (!block) {
      return;
    }
    block.classList.remove("is-loaded");
    img.removeAttribute("src");
    img.setAttribute("aria-hidden", "true");
    img.alt = "";
    var galleryItem = block.closest(".gallery-grid--photos li");
    if (galleryItem) {
      galleryItem.hidden = true;
    }
  }

  document.querySelectorAll(".media-block img").forEach(function (img) {
    if (img.complete && img.naturalWidth > 0) {
      markLoaded(img);
    } else if (img.complete) {
      markFailed(img);
    } else {
      img.addEventListener("load", function () {
        markLoaded(img);
      });
      img.addEventListener("error", function () {
        markFailed(img);
      });
    }
  });

  // 02.03.2026 DB Refactoring cursor by Me4Hik START - Google Ads phone click conversion
  var GOOGLE_ADS_PHONE_CONVERSION_SEND_TO = "AW-18004698091/3MFrCOq-jrgcEOvHp4lD";
  var TEL_CONVERSION_FALLBACK_MS = 800;

  function reportPhoneClickConversion(done) {
    if (typeof window.gtag !== "function") {
      if (typeof done === "function") {
        done();
      }
      return;
    }
    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_PHONE_CONVERSION_SEND_TO,
      event_callback: function () {
        if (typeof done === "function") {
          done();
        }
      }
    });
  }

  function applyCallClickFeedback(link) {
    link.classList.add("is-clicked");
    window.setTimeout(function () {
      link.classList.remove("is-clicked");
    }, 220);
  }

  document.querySelectorAll(".cta-phone").forEach(function (link) {
    link.addEventListener("click", function (event) {
      var phone = link.getAttribute("data-phone") || "+19715638979";
      var href = link.getAttribute("href") || "";
      var isTelLink = href.indexOf("tel:") === 0;
      var navigated = false;

      function followTelHref() {
        if (navigated || !isTelLink) {
          return;
        }
        navigated = true;
        applyCallClickFeedback(link);
        window.location.href = href;
      }

      console.info("Phone CTA clicked", phone);

      if (typeof window.gtag !== "function") {
        applyCallClickFeedback(link);
        return;
      }

      if (!isTelLink) {
        applyCallClickFeedback(link);
        reportPhoneClickConversion(null);
        return;
      }

      event.preventDefault();
      var fallbackTimer = window.setTimeout(followTelHref, TEL_CONVERSION_FALLBACK_MS);
      reportPhoneClickConversion(function () {
        window.clearTimeout(fallbackTimer);
        followTelHref();
      });
    });
  });
  // 02.03.2026 DB Refactoring cursor by Me4Hik END

  // 02.03.2026 DB Refactoring cursor by Me4Hik START - gallery lightbox with mobile-safe image loading
  var lightbox = document.getElementById("lightbox");
  var lightboxImage = document.getElementById("lightbox-image");
  var lightboxFallback = document.getElementById("lightbox-fallback");
  var lightboxClose = document.getElementById("lightbox-close");
  var lightboxPrev = document.getElementById("lightbox-prev");
  var lightboxNext = document.getElementById("lightbox-next");
  var galleryThumbs = Array.prototype.slice.call(
    document.querySelectorAll(".gallery-grid--photos .gallery-thumb")
  );
  var currentIndex = 0;
  var lastFocus = null;

  function getThumbSrc(img) {
    return img.currentSrc || img.getAttribute("src") || img.src || "";
  }

  function setLightboxImage(img) {
    if (!lightboxImage) {
      return;
    }
    var src = getThumbSrc(img);
    if (lightboxFallback) {
      lightboxFallback.hidden = true;
    }
    lightboxImage.hidden = false;
    lightboxImage.onload = function () {
      lightboxImage.hidden = false;
      if (lightboxFallback) {
        lightboxFallback.hidden = true;
      }
    };
    lightboxImage.onerror = function () {
      lightboxImage.hidden = true;
      if (lightboxFallback) {
        lightboxFallback.hidden = false;
      }
    };
    if (src) {
      lightboxImage.src = src;
      lightboxImage.alt = img.alt || "";
    } else {
      lightboxImage.hidden = true;
      if (lightboxFallback) {
        lightboxFallback.hidden = false;
      }
    }
  }

  function openLightbox(index) {
    if (!lightbox || !lightboxImage || !galleryThumbs.length) {
      return;
    }
    currentIndex = index;
    setLightboxImage(galleryThumbs[currentIndex]);
    lastFocus = document.activeElement;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    if (lightboxClose) {
      lightboxClose.focus();
    }
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) {
      return;
    }
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.onload = null;
    lightboxImage.onerror = null;
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    lightboxImage.hidden = false;
    if (lightboxFallback) {
      lightboxFallback.hidden = true;
    }
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  function showSlide(direction) {
    if (!lightboxImage || !galleryThumbs.length) {
      return;
    }
    currentIndex = (currentIndex + direction + galleryThumbs.length) % galleryThumbs.length;
    setLightboxImage(galleryThumbs[currentIndex]);
  }

  galleryThumbs.forEach(function (thumb, index) {
    var item = thumb.closest(".gallery-item");
    if (item) {
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      item.setAttribute("aria-label", "View larger photo: " + (thumb.alt || "Gallery photo"));
      item.addEventListener("click", function () {
        openLightbox(index);
      });
      item.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(index);
        }
      });
    }
  });

  if (lightbox) {
    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }
    lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (el) {
      el.addEventListener("click", closeLightbox);
    });
    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", function (event) {
        event.stopPropagation();
        showSlide(-1);
      });
    }
    if (lightboxNext) {
      lightboxNext.addEventListener("click", function (event) {
        event.stopPropagation();
        showSlide(1);
      });
    }
    var lightboxPanel = lightbox.querySelector(".lightbox-panel");
    if (lightboxPanel) {
      lightboxPanel.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    }

    document.addEventListener("keydown", function (event) {
      if (lightbox.hidden) {
        return;
      }
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showSlide(-1);
      } else if (event.key === "ArrowRight") {
        showSlide(1);
      }
    });
  }
  // 02.03.2026 DB Refactoring cursor by Me4Hik END

  // 02.03.2026 DB Refactoring cursor by Me4Hik START - fade-in on scroll via IntersectionObserver
  var revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length) {
    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: "0px 0px -48px 0px", threshold: 0.1 }
      );
      revealElements.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      revealElements.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }
  // 02.03.2026 DB Refactoring cursor by Me4Hik END
})();

// 02.03.2026 DB Refactoring cursor by Me4Hik END
