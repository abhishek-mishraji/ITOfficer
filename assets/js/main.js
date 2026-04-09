// ============= REVEAL ANIMATION ON SCROLL =============
const revealItems = document.querySelectorAll('.reveal');

if (revealItems.length > 0) {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, options);

    revealItems.forEach(item => observer.observe(item));
}

// ============= EXAM CARD INTERACTION =============
const examCards = document.querySelectorAll('[data-exam-card]');
const previewTitle = document.querySelector('[data-launch-preview-title]');
const previewText = document.querySelector('[data-launch-preview-text]');
const previewMeta = document.querySelector('[data-launch-preview-meta]');
const previewLink = document.querySelector('[data-launch-preview-link]');

function activateExamCard(card) {
    examCards.forEach((item) => item.classList.remove('is-active'));
    card.classList.add('is-active');

    if (previewTitle) {
        previewTitle.textContent = card.dataset.launchTitle || '';
    }

    if (previewText) {
        previewText.textContent = card.dataset.launchText || '';
    }

    if (previewMeta) {
        previewMeta.textContent = card.dataset.launchMeta || '';
    }

    if (previewLink) {
        previewLink.textContent = card.dataset.launchLinkLabel || 'Open site';
        previewLink.href = card.dataset.href || '#';
    }
}

if (examCards.length > 0) {
    examCards.forEach((card) => {
        // Click functionality
        card.addEventListener('click', () => {
            activateExamCard(card);
        });

        // Hover functionality
        card.addEventListener('mouseenter', () => {
            activateExamCard(card);
        });

        // Keyboard focus
        card.addEventListener('focusin', () => {
            activateExamCard(card);
        });

        // Touch support for mobile
        card.addEventListener('touchstart', () => {
            activateExamCard(card);
        });
    });

    // Activate first card by default
    activateExamCard(examCards[0]);
}

// ============= BUTTON REDIRECT FUNCTIONALITY =============
document.querySelectorAll('[data-href]').forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const href = button.dataset.href;
        if (href) {
            // Add smooth transition before redirect
            document.body.style.opacity = '0.9';
            setTimeout(() => {
                window.location.href = href;
            }, 150);
        }
    });
});

// ============= CURRENT DATE UPDATE =============
const currentDate = document.querySelector('[data-current-date]');
if (currentDate) {
    const today = new Date();
    const options = { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    };
    currentDate.textContent = new Intl.DateTimeFormat('en-IN', options).format(today);
}

// ============= SMOOTH SCROLL BEHAVIOR =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============= NAVBAR SCROLL EFFECT =============
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (navbar) {
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============= ADD ANIMATION TO BUTTONS ON CLICK =============
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove old ripples
        const ripples = this.querySelectorAll('.ripple');
        ripples.forEach(r => r.remove());

        this.appendChild(ripple);
    });
});

// ============= KEYBOARD NAVIGATION =============
document.addEventListener('keydown', (e) => {
    // Arrow key navigation for exam cards
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeCard = document.querySelector('[data-exam-card].is-active');
        if (activeCard) {
            let nextCard;
            if (e.key === 'ArrowLeft') {
                nextCard = activeCard.previousElementSibling;
                if (nextCard && !nextCard.hasAttribute('data-exam-card')) {
                    nextCard = null;
                }
            } else {
                nextCard = activeCard.nextElementSibling;
                if (nextCard && !nextCard.hasAttribute('data-exam-card')) {
                    nextCard = null;
                }
            }

            if (nextCard) {
                activateExamCard(nextCard);
                nextCard.focus();
            }
        }
    }

    // Enter key to activate card
    if (e.key === 'Enter') {
        const activeCard = document.querySelector('[data-exam-card].is-active');
        if (activeCard) {
            const button = activeCard.querySelector('.button');
            if (button) button.click();
        }
    }
});

// ============= PERFORMANCE OPTIMIZATION - LAZY LOAD IMAGES =============
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============= MOBILE MENU TOGGLE (if needed in future) =============
function handleMobileNavigation() {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.innerWidth <= 768) {
        navbar.style.position = 'fixed';
    }
}

window.addEventListener('resize', handleMobileNavigation);
handleMobileNavigation();

// ============= ACCESSIBILITY FOCUS MANAGEMENT =============
let currentFocusIndex = 0;
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusElements = Array.from(document.querySelectorAll(focusableElements));
        
        if (e.shiftKey) {
            currentFocusIndex--;
            if (currentFocusIndex < 0) {
                currentFocusIndex = focusElements.length - 1;
            }
        } else {
            currentFocusIndex++;
            if (currentFocusIndex >= focusElements.length) {
                currentFocusIndex = 0;
            }
        }
    }
});

// ============= ADD LOADING STATE ON PAGE TRANSITION =============
window.addEventListener('beforeunload', () => {
    document.body.style.transition = 'opacity 0.3s ease-out';
    document.body.style.opacity = '0.95';
});

console.log('✅ Government IT Officer Prep Platform - Scripts Loaded Successfully');
