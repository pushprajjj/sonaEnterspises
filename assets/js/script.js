// Page loading animation
window.addEventListener('load', function() {
  const loader = document.querySelector('.page-loader');
  setTimeout(function() {
    loader.classList.add('hidden');
    setTimeout(function() {
      loader.style.display = 'none';
    }, 300);
  }, 800);
});

// Initialize AOS animations and sticky header
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 500,
    easing: 'ease-in-out',
    once: false,
    mirror: false
  });

  // Initialize sticky header
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;
  let isScrolling = false;

  function handleScroll() {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when page is scrolled more than header height
        if (currentScroll > headerHeight/2) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        isScrolling = false;
      });
    }
    isScrolling = true;
  }

  // Add scroll event listener with passive flag for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Initial check for scroll position
  handleScroll();
});

// Hero Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return; // Only run if slides exist

  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  const slider = document.querySelector(".hero-slider");

  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class from all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    // Remove active class from all dots
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current slide and dot
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    // Update current slide index
    currentSlide = index;
  }

  if (prevBtn && nextBtn) {
    // Event listener for previous button
    prevBtn.addEventListener("click", function () {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) {
        newIndex = slides.length - 1;
      }
      showSlide(newIndex);
    });

    // Event listener for next button
    nextBtn.addEventListener("click", function () {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) {
        newIndex = 0;
      }
      showSlide(newIndex);
    });
  }

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      showSlide(index);
    });
  });

  if (slider) {
    // Add touch swipe functionality for mobile
    slider.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slider.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        // Swipe left - show next slide
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) {
          newIndex = 0;
        }
        showSlide(newIndex);
      }
      if (touchEndX > touchStartX + 50) {
        // Swipe right - show previous slide
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
          newIndex = slides.length - 1;
        }
        showSlide(newIndex);
      }
    }

    // Auto slide change every 3 seconds
    let slideInterval = setInterval(function () {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) {
        newIndex = 0;
      }
      showSlide(newIndex);
    }, 3000);
    
    // Pause auto-slide when interacting with slider
    slider.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
      slideInterval = setInterval(function () {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) {
          newIndex = 0;
        }
        showSlide(newIndex);
      }, 3000);
    });
  }
});

// Contact Form Handling
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("query-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Basic validation
    if (!name || !email || !phone || !message) {
      alert("Please fill in all required fields");
      return;
    }

    // Add a loading effect to the submit button
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = "SENDING...";
    submitBtn.disabled = true;
    
    // Simulate server request with timeout
  // Simulate server request with timeout
setTimeout(function () {
  // Send data to PHP controller using jQuery AJAX
  $.ajax({
    url: "/_controller/ContactFormHandeler.php",
    type: "POST",
    data: {
      name: name,
      email: email,
      phone: phone,
      message: message
    },
    success: function (response) {
      if (response.success) {
        submitBtn.innerHTML = "SENT ✓";
        setTimeout(function () {
          submitBtn.innerHTML = "SUBMIT";
          submitBtn.disabled = false;
          alert(response.message); // Thank you message
          form.reset();
        }, 800);
      } else {
        submitBtn.innerHTML = "SUBMIT";
        submitBtn.disabled = false;
        alert(response.message); // Error message from server
      }
    }
    
  });
}, 1000);

  });

  // Add floating label effect
  const inputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
  );

  inputs.forEach((input) => {
    // Check if there's a value on load
    if (input.value) {
      input.classList.add("has-value");
    }

    // Check for changes to the input
    input.addEventListener("input", function () {
      if (this.value) {
        this.classList.add("has-value");
      } else {
        this.classList.remove("has-value");
      }
    });
  });
});

// Back to top functionality
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector(".back-to-top");
  if (!backToTopButton) return;

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Show/hide back to top button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.style.opacity = "1";
    } else {
      backToTopButton.style.opacity = "0.7";
    }
  });
});

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector('.hamburger-menu');
  const navContainer = document.querySelector('.nav-container');
  const body = document.body;
  
  if (hamburger && navContainer) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navContainer.classList.toggle('active');
      body.classList.toggle('no-scroll');
    });

    // Close menu when clicking on a link
    const navLinks = navContainer.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navContainer.classList.remove('active');
        body.classList.remove('no-scroll');
      });
    });
  }
});

// Highlight active menu item based on scroll position and URL
document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll("section[id]");
  const header = document.querySelector('header');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const navLinks = document.querySelectorAll('nav ul li a');
  const headerHeight = header ? header.offsetHeight : 0;
  
  // Get current page path and handle index.html case
  let currentPath = window.location.pathname;
  if (currentPath.endsWith('index.html')) {
    currentPath = '/';
  }
  
  function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / documentHeight) * 100;
    
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
  }
  
  function highlightNavItem() {
    const scrollPosition = window.scrollY + headerHeight;
    
    // Update scroll progress
    updateScrollProgress();
    
    // First, remove active class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Handle cross-page navigation active state
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Check if this is the current page
      if (href === currentPath || 
          (currentPath === '/' && href === '/#home') ||
          (href.startsWith('/') && href.split('#')[0] === currentPath)) {
        
        // If no hash, this is the active page
        if (!href.includes('#')) {
          link.classList.add('active');
        }
      }
    });
    
    // Handle in-page section highlighting
    if (sections.length > 0) {
      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 20;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const sectionId = section.getAttribute('id');
          
          // Find and activate corresponding nav link
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.includes('#' + sectionId)) {
              link.classList.add('active');
            }
          });
        }
      });
    }
  }
  
  // Throttle scroll event for better performance
  let isScrolling = false;
  window.addEventListener("scroll", function() {
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        highlightNavItem();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
  
  // Set initial states
  highlightNavItem();
  
  // Handle smooth scroll for anchor links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle same-page anchor links
      if (href.includes('#') && (!href.startsWith('/') || window.location.pathname === '/')) {
        e.preventDefault();
        const targetId = href.split('#')[1];
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const targetPosition = targetElement.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update active state
          navLinks.forEach(link => link.classList.remove('active'));
          this.classList.add('active');
        }
      }
    });
  });
});

// Mobile Slider Functionality
document.addEventListener("DOMContentLoaded", function() {
    const mobileSlider = document.querySelector('.mobile-slider');
    if (!mobileSlider) return;

    const slidesContainer = mobileSlider.querySelector('.mobile-slides-container');
    const slides = mobileSlider.querySelectorAll('.mobile-slide');
    const dots = mobileSlider.querySelectorAll('.mobile-dot');
    let currentSlide = 0;
    let startX = 0;
    let currentX = 0;

    // Touch event handlers
    slidesContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        slidesContainer.style.transition = 'none';
    });

    slidesContainer.addEventListener('touchmove', (e) => {
        if (!startX) return;
        
        const x = e.touches[0].clientX;
        const walk = x - startX;
        
        // Calculate position considering current slide
        currentX = -currentSlide * 100 + (walk / mobileSlider.offsetWidth * 100);
        
        // Restrict sliding past bounds with resistance
        if (currentX > 0) {
            currentX = currentX / 4;
        } else if (currentX < -(slides.length - 1) * 100) {
            const overScroll = currentX + (slides.length - 1) * 100;
            currentX = -(slides.length - 1) * 100 + overScroll / 4;
        }
        
        slidesContainer.style.transform = `translateX(${currentX}%)`;
    });

    slidesContainer.addEventListener('touchend', (e) => {
        slidesContainer.style.transition = 'transform 0.3s ease-out';
        
        // Determine if should move to next/prev slide
        const walk = currentX + currentSlide * 100;
        
        if (walk < -40) {
            currentSlide = Math.min(currentSlide + 1, slides.length - 1);
        } else if (walk > 40) {
            currentSlide = Math.max(currentSlide - 1, 0);
        }
        
        updateMobileSlider();
        startX = null;
    });

    // Update slider position and dots
    function updateMobileSlider() {
        slidesContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Handle dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateMobileSlider();
        });
    });

    // Auto advance slides
    let autoSlideInterval = setInterval(nextSlide, 3000);

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateMobileSlider();
    }

    // Pause auto-slide on touch
    mobileSlider.addEventListener('touchstart', () => {
        clearInterval(autoSlideInterval);
    });

    mobileSlider.addEventListener('touchend', () => {
        autoSlideInterval = setInterval(nextSlide, 3000);
    });
});

// Product Slider Functionality
document.addEventListener("DOMContentLoaded", function() {
    const productSliders = document.querySelectorAll('.product-slider');
    
    productSliders.forEach(slider => {
        const sliderId = slider.id;
        const slides = slider.querySelectorAll('.slide');
        const dots = slider.querySelectorAll(`[data-slider="${sliderId.split('-')[1]}"].dot`);
        const prevBtn = slider.querySelector(`[data-slider="${sliderId.split('-')[1]}"].prev-btn`);
        const nextBtn = slider.querySelector(`[data-slider="${sliderId.split('-')[1]}"].next-btn`);
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }
        
        // Event listeners for navigation buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let newIndex = currentSlide - 1;
                if (newIndex < 0) newIndex = slides.length - 1;
                showSlide(newIndex);
            });
            
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let newIndex = currentSlide + 1;
                if (newIndex >= slides.length) newIndex = 0;
                showSlide(newIndex);
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(index);
            });
        });
        
        // Auto advance slides
        let slideInterval = setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        }, 3000);
        
        // Pause auto-advance on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                let newIndex = currentSlide + 1;
                if (newIndex >= slides.length) newIndex = 0;
                showSlide(newIndex);
            }, 3000);
        });
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval);
        }, false);
        
        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            
            // Restart auto-advance
            slideInterval = setInterval(() => {
                let newIndex = currentSlide + 1;
                if (newIndex >= slides.length) newIndex = 0;
                showSlide(newIndex);
            }, 3000);
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - show next slide
                let newIndex = currentSlide + 1;
                if (newIndex >= slides.length) newIndex = 0;
                showSlide(newIndex);
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - show previous slide
                let newIndex = currentSlide - 1;
                if (newIndex < 0) newIndex = slides.length - 1;
                showSlide(newIndex);
            }
        }
    });
});
