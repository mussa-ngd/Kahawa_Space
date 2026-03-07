// Shared main JavaScript for Kahawa Space
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            if (navLinks) navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }

    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Highlight active page in mobile menu
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
});
