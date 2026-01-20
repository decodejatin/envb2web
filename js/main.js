/**
 * MAIN.JS
 * Global logic for the Environmental Science Showcase
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavigation();
    initMobileMenu();
    initPageTransitions();
    initLazyLoad();
    renderTeam();

    // Add loaded class for text reveals
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

/* --- CUSTOM CURSOR --- */
function initCursor() {
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Movement
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with lag (done via CSS transition or requestAnimationFrame)
        // Simple approach: direct update, CSS handles smooth transition
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // Hover Effects
    const interactiveElements = document.querySelectorAll('a, button, .interactive');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(188, 108, 37, 0.1)'; // Terra with opacity
            cursorOutline.style.borderColor = 'transparent';
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'var(--color-primary-light)';
        });
    });
}

/* --- NAVIGATION --- */
function initNavigation() {
    const nav = document.querySelector('.main-nav');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Sticky Nav effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active Link Highlighting
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

/* --- MOBILE MENU --- */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/* --- PAGE TRANSITIONS --- */
function initPageTransitions() {
    const links = document.querySelectorAll('a');
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    document.body.appendChild(transitionOverlay);

    links.forEach(link => {
        // Only internal links
        if (link.hostname === window.location.hostname && !link.hash) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.href;

                // Animate out
                transitionOverlay.classList.add('active');

                // Wait for animation then navigate
                setTimeout(() => {
                    window.location.href = target;
                }, 800);
            });
        }
    });
}

/* --- UTILS --- */
function initLazyLoad() {
    // Basic Intersection Observer for fade-ins
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// Helper to render "Coming Soon"
function renderComingSoon(containerId, message = "Data Entry Pending") {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="coming-soon-container animate-on-scroll">
            <div class="icon-box">⌛</div>
            <h3>${message}</h3>
            <div class="loader-pulse"></div>
            <p class="text-muted">Our team is currently compiling field reports. Check back shortly.</p>
        </div>
    `;
}

// Render Team Members
function renderTeam() {
    const container = document.getElementById('team-grid');
    if (!container) return;

    // Check if teamMembers is defined in data.js
    if (typeof teamMembers !== 'undefined') {
        teamMembers.forEach(member => {
            const card = document.createElement('div');
            card.className = 'team-card animate-on-scroll';
            card.innerHTML = `
                <div class="member-avatar">${member.initials}</div>
                <h3 class="member-name">${member.name}</h3>
                <p class="member-role">${member.role}</p>
            `;
            container.appendChild(card);
        });
    }

    // "Others to be decided" card
    const placeholderCard = document.createElement('div');
    placeholderCard.className = 'team-card animate-on-scroll';
    placeholderCard.style.opacity = '0.7';
    placeholderCard.innerHTML = `
        <div class="member-avatar" style="border-style: dashed;">?</div>
        <h3 class="member-name">Team Members</h3>
        <p class="member-role">To Be Decided</p>
    `;
    container.appendChild(placeholderCard);

    // Add simple animation styles for team if not present
    // (Relies on animate-on-scroll class logic from initLazyLoad)
    const cards = document.querySelectorAll('.team-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;

        // Manual observer triggered
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        observer.observe(card);
    });
}
