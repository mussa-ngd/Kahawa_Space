// js/main.js - Main JavaScript for Kahawa Space

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');

    if (searchBtn && searchInput) {
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                console.log('Searching for:', query);
                // Redirect to search results page
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Newsletter subscription
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button');

        if (submitBtn && emailInput) {
            submitBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                const email = emailInput.value.trim();

                if (!email) {
                    showNotification('Please enter your email address', 'error');
                    return;
                }

                if (!isValidEmail(email)) {
                    showNotification('Please enter a valid email address', 'error');
                    return;
                }

                // Simulate subscription
                try {
                    // Replace with actual API call
                    await subscribeNewsletter(email);
                    showNotification('Successfully subscribed to newsletter!', 'success');
                    emailInput.value = '';
                } catch (error) {
                    showNotification('Something went wrong. Please try again.', 'error');
                }
            });
        }
    });

    // Category card clicks (redirect to marketplace)
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3')?.textContent;
            if (title === 'Green Coffee Trade') {
                window.location.href = 'marketplace.html?category=green';
            } else if (title === 'Roasted Coffee') {
                window.location.href = 'marketplace.html?category=roasted';
            } else if (title === 'Coffee Equipment') {
                window.location.href = 'marketplace.html?category=equipment';
            } else if (title === 'Books & Education') {
                window.location.href = 'education.html';
            }
        });
    });

    // Course card clicks
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't redirect if clicking on the enroll button
            if (e.target.classList.contains('btn-enroll') || e.target.classList.contains('btn-product')) {
                return;
            }
            const title = card.querySelector('.course-title')?.textContent;
            if (title) {
                window.location.href = `course-details.html?course=${encodeURIComponent(title)}`;
            }
        });
    });

    // Product card clicks
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't redirect if clicking on buttons
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            const title = card.querySelector('.product-title')?.textContent;
            if (title) {
                window.location.href = `product.html?product=${encodeURIComponent(title)}`;
            }
        });
    });

    // Reel card clicks
    const reelCards = document.querySelectorAll('.reel-card');
    reelCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.reel-title')?.textContent;
            if (title) {
                window.location.href = `video.html?v=${encodeURIComponent(title)}`;
            }
        });
    });

    // Tour card clicks
    const tourCards = document.querySelectorAll('.tour-card, .destination-card');
    tourCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            const title = card.querySelector('.destination-title, .tour-card h3')?.textContent;
            if (title) {
                window.location.href = `tour-details.html?tour=${encodeURIComponent(title)}`;
            }
        });
    });
});

// Helper Functions
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

async function subscribeNewsletter(email) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Subscribed:', email);
            resolve({ success: true });
        }, 500);
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            font-weight: 500;
            max-width: 350px;
        }
        .notification-success {
            border-left: 4px solid var(--success, #2e7d32);
        }
        .notification-error {
            border-left: 4px solid #d32f2f;
        }
        .notification-info {
            border-left: 4px solid var(--accent-gold, #c9a227);
        }
        .notification i {
            font-size: 1.2rem;
        }
        .notification-success i {
            color: var(--success, #2e7d32);
        }
        .notification-error i {
            color: #d32f2f;
        }
        .notification-info i {
            color: var(--accent-gold, #c9a227);
        }
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;

    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add slide out animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(slideOutStyle);