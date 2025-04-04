
// DOM Elements
const header = document.getElementById('header');
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contactForm');
const skillProgress = document.querySelectorAll('.skill-progress');

// Theme Management
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

function setTheme(isDark) {
  const themeIcon = isDark ? 'fa-sun' : 'fa-moon';
  document.body.classList.toggle('dark', isDark);
  themeToggle.innerHTML = `<i class="fas ${themeIcon}"></i>`;
  themeToggleMobile.innerHTML = `<i class="fas ${themeIcon}"></i>`;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme
if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
  setTheme(true);
} else {
  setTheme(false);
}

// Theme Toggle Event Listeners
themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));
themeToggleMobile.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('hidden');
  mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Scroll Event for Header
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Animate skill bars when they become visible
function animateSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const percentage = progressBar.getAttribute('data-percentage');
        progressBar.style.width = `${percentage}%`;
      }
    });
  }, { threshold: 0.2 });

  skillProgress.forEach(bar => {
    observer.observe(bar);
  });
}

// Animate timeline items when they become visible
function animateTimelineItems() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

// Contact Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
      alert('Please fill out all fields');
      return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
      alert('Message sent! I\'ll get back to you soon.');
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }, 1500);
  });
}

// Make sure we create a placeholder.jpg file
const createPlaceholderImage = () => {
  // This is just to check if the file exists - in a real site
  // you would replace placeholder.jpg with an actual profile image
  const img = new Image();
  img.onerror = function() {
    console.warn('placeholder.jpg not found. Please add a profile image.');
  };
  img.src = 'placeholder.jpg';
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  animateSkillBars();
  animateTimelineItems();
  createPlaceholderImage();
});