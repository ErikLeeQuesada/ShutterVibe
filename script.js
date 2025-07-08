// Counter Animation
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;
function animateCounters() {
  if (hasAnimated) return;
  const section = document.querySelector('#stats');
  if (section.getBoundingClientRect().top < window.innerHeight) {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/,/g, '');
        const inc = target/200;
        if (count < target) {
          counter.innerText = Math.ceil(count + inc).toLocaleString();
          setTimeout(updateCount,15);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };
      updateCount();
    });
    hasAnimated = true;
  }
}
// Counter Animation Ends
window.addEventListener('scroll', animateCounters);
animateCounters();

// Get all gallery images
const galleryImages = document.querySelectorAll('.gallery img');
let currentImageIndex = 0;

// Initialize lightbox
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        const lightbox = new bootstrap.Modal(document.getElementById('lightboxModal'));
        document.getElementById('lightboxImage').src = img.src;
        lightbox.show();
    });
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal.classList.contains('show')) {
        if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'Escape') {
            bootstrap.Modal.getInstance(lightboxModal).hide();
        }
    }
});

// Handle navigation buttons
document.getElementById('prevImage').addEventListener('click', showPreviousImage);
document.getElementById('nextImage').addEventListener('click', showNextImage);

// Handle touch swipe
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightboxImage').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('lightboxImage').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        showNextImage();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        showPreviousImage();
    }
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    document.getElementById('lightboxImage').src = galleryImages[currentImageIndex].src;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    document.getElementById('lightboxImage').src = galleryImages[currentImageIndex].src;
}

// Close modal when clicking outside
document.getElementById('lightboxModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        bootstrap.Modal.getInstance(e.currentTarget).hide();
    }
});

// Portfolio Grid Icon Click Handler
const scrollToPortfolio = () => {
  document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
};

document.getElementById('portfolioGridIcon').addEventListener('click', scrollToPortfolio);
document.getElementById('mobilePortfolioGridIcon').addEventListener('click', scrollToPortfolio);