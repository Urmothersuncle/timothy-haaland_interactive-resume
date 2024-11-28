document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('photoSlider');
    const slides = document.querySelectorAll('.slide');
    const descriptions = document.querySelectorAll('.image-description');
    let currentSlideIndex = 0;
    const scrollThreshold = 100;
    let scrollDelta = 0;

    let startY = 0;
    let endY = 0;
    let isSwipe = false;
    let isSwipingOnSlider = false;

    function hideAllSlides() {
      slides.forEach((slide) => {
        slide.style.display = 'none';
      });
    }

    function showSlide(index) {
      hideAllSlides();
      slides[index].style.display = 'block';

      const descriptionBox = slides[index].querySelector('.image-description');
      if (descriptionBox) {
        descriptionBox.style.display = 'none';
      }

      adjustDescriptionPosition();
    }

    function adjustDescriptionPosition() {
      const viewportWidth = window.innerWidth;
      if (viewportWidth <= 768) {
        const currentSlide = slides[currentSlideIndex];
        const descriptionBox = currentSlide.querySelector('.image-description');

        if (descriptionBox && descriptionBox.style.display === 'block') {
          const photoRect = currentSlide.getBoundingClientRect();

          descriptionBox.style.position = 'fixed';
          descriptionBox.style.top = `${photoRect.bottom + 10}px`;
          descriptionBox.style.bottom = 'auto';
          descriptionBox.style.right = '10px'; 
          descriptionBox.style.width = '90vw'; 
          descriptionBox.style.zIndex = '99999'; 
          descriptionBox.style.padding = '10px'; 
          descriptionBox.style.boxSizing = 'border-box';
          descriptionBox.style.transform = 'translateX(-80%)'; 
        }
      }
    }

    showSlide(currentSlideIndex);
    slider.addEventListener('wheel', function (event) {
      scrollDelta += event.deltaY;

      if (scrollDelta >= scrollThreshold) {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        scrollDelta = 0;
      } else if (scrollDelta <= -scrollThreshold) {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        scrollDelta = 0;
      }

      showSlide(currentSlideIndex);
      event.preventDefault();
    });

    slider.addEventListener('touchstart', function (event) {
      startY = event.touches[0].clientY;
      isSwipe = false;
      isSwipingOnSlider = event.target.closest('#photoSlider') !== null;
    });

    slider.addEventListener('touchmove', function (event) {
      endY = event.touches[0].clientY;
      if (Math.abs(endY - startY) > scrollThreshold) {
        isSwipe = true;
      }
    });

    slider.addEventListener('touchend', function () {
      if (isSwipe && isSwipingOnSlider) {
        const swipeDistance = endY - startY;
        if (swipeDistance < 0) {
          currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        } else {
          currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        }
        showSlide(currentSlideIndex);
      }
    });

    descriptions.forEach((description) => {
      description.addEventListener('touchstart', function (event) {
        event.stopPropagation();
        startY = event.touches[0].clientY;
        isSwipe = false;
      });

      description.addEventListener('touchmove', function (event) {
        endY = event.touches[0].clientY;
        if (Math.abs(endY - startY) > scrollThreshold) {
          isSwipe = true;
        }
      });

      description.addEventListener('touchend', function (event) {
        event.stopPropagation();
        if (isSwipe) {
          const swipeDistance = endY - startY;
          if (swipeDistance < 0) {
            description.scrollTop += 30; 
          } else {
            description.scrollTop -= 30; 
          }
        }
      });
    });

    slides.forEach((slide) => {
      slide.addEventListener('click', function () {
        const descriptionBox = this.querySelector('.image-description');
        if (descriptionBox) {
          const isVisible = descriptionBox.style.display === 'block';
          if (isVisible) {
            descriptionBox.style.display = 'none';
          } else {
            descriptionBox.style.display = 'block';
            adjustDescriptionPosition(); 
          }
        }
      });
    });

    window.addEventListener('resize', adjustDescriptionPosition);
  });
