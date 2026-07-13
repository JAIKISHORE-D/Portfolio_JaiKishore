/**
 * Jai Kishore D - Portfolio Application Scripts
 * Phase 1: Setup, Navigation, and Hero Actions
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    /* ==========================================================================
       STICKY NAVBAR EFFECT
       ========================================================================== */
    const handleScrollNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    
    /* ==========================================================================
       MOBILE MENU NAVIGATION
       ========================================================================== */
    const toggleMenu = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll'); // Prevent background scroll when menu is open
    };

    const closeMenu = () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on resize to desktop dimensions
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    /* ==========================================================================
       SCROLL SPY (ACTIVE LINK ON SCROLL)
       ========================================================================== */
    const scrollSpy = () => {
        let currentSectionId = '';
        
        // Account for navbar height in calculation
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    // Combined scroll event listener throttled by requestAnimationFrame for maximum performance
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScrollNavbar();
                scrollSpy();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Run on initial load to set active states and navbar styling
    handleScrollNavbar();
    scrollSpy();

    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* ==========================================================================
       LOG INITIALIZATION
       ========================================================================== */
    console.log('Premium Portfolio Website Initialized. Welcome to Jai Kishore D\'s Portfolio.');
});
