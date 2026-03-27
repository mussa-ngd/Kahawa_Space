// kahawa-main.js - Master JavaScript for Kahawa Space
// All pages functionality in one file

document.addEventListener('DOMContentLoaded', function () {

    // ===== MOBILE MENU FUNCTIONALITY =====
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuBtn && navLinks) {
            // Remove any existing event listeners to prevent duplicates
            const newBtn = mobileMenuBtn.cloneNode(true);
            mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);

            const updatedBtn = document.querySelector('.mobile-menu');

            updatedBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                navLinks.classList.toggle('active');
                this.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    updatedBtn.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function (event) {
                if (navLinks.classList.contains('active') &&
                    !navLinks.contains(event.target) &&
                    !updatedBtn.contains(event.target)) {
                    navLinks.classList.remove('active');
                    updatedBtn.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }

    // ===== SEARCH FUNCTIONALITY =====
    function initSearch() {
        const searchInput = document.querySelector('.search-bar input');
        const searchBtn = document.querySelector('.search-bar button');

        if (searchBtn && searchInput) {
            const performSearch = () => {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                } else {
                    showNotification('Please enter a search term', 'info');
                }
            };

            // Remove existing listeners
            const newBtn = searchBtn.cloneNode(true);
            searchBtn.parentNode.replaceChild(newBtn, searchBtn);

            const updatedBtn = document.querySelector('.search-bar button');
            const updatedInput = document.querySelector('.search-bar input');

            updatedBtn.addEventListener('click', performSearch);
            updatedInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }

    // ===== NEWSLETTER SUBSCRIPTION =====
    function initNewsletter() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');

        newsletterForms.forEach(form => {
            const emailInput = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('button');

            if (submitBtn && emailInput) {
                // Remove existing listeners
                const newBtn = submitBtn.cloneNode(true);
                submitBtn.parentNode.replaceChild(newBtn, submitBtn);

                const updatedBtn = form.querySelector('button');
                const updatedInput = form.querySelector('input[type="email"]');

                updatedBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const email = updatedInput.value.trim();

                    if (!email) {
                        showNotification('Please enter your email address', 'error');
                        return;
                    }

                    if (!isValidEmail(email)) {
                        showNotification('Please enter a valid email address', 'error');
                        return;
                    }

                    try {
                        await subscribeNewsletter(email);
                        showNotification('Successfully subscribed to newsletter!', 'success');
                        updatedInput.value = '';
                    } catch (error) {
                        showNotification('Something went wrong. Please try again.', 'error');
                    }
                });
            }
        });
    }

    // ===== CATEGORY CARD CLICKS =====
    function initCategoryCards() {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);

            newCard.addEventListener('click', () => {
                const title = newCard.querySelector('h3')?.textContent;
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
    }

    // ===== COURSE CARD CLICKS =====
    function initCourseCards() {
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);

            newCard.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-enroll') ||
                    e.target.classList.contains('btn-product') ||
                    e.target.closest('button')) {
                    return;
                }
                const title = newCard.querySelector('.course-title')?.textContent;
                if (title) {
                    window.location.href = `course-details.html?course=${encodeURIComponent(title)}`;
                }
            });
        });
    }

    // ===== PRODUCT CARD CLICKS =====
    function initProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);

            newCard.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                    return;
                }
                const title = newCard.querySelector('.product-title')?.textContent;
                if (title) {
                    window.location.href = `product.html?product=${encodeURIComponent(title)}`;
                }
            });
        });
    }

    // ===== REEL CARD CLICKS =====
    function initReelCards() {
        const reelCards = document.querySelectorAll('.reel-card');
        reelCards.forEach(card => {
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);

            newCard.addEventListener('click', () => {
                const title = newCard.querySelector('.reel-title')?.textContent;
                if (title) {
                    window.location.href = `video.html?v=${encodeURIComponent(title)}`;
                }
            });
        });
    }

    // ===== TOUR CARD CLICKS =====
    function initTourCards() {
        const tourCards = document.querySelectorAll('.tour-card, .destination-card');
        tourCards.forEach(card => {
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);

            newCard.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                    return;
                }
                const title = newCard.querySelector('.destination-title, .tour-card h3')?.textContent;
                if (title) {
                    window.location.href = `tour-details.html?tour=${encodeURIComponent(title)}`;
                }
            });
        });
    }

    // ===== AUTH BUTTONS =====
    function initAuthButtons() {
        const loginBtns = document.querySelectorAll('.btn-login');
        const signupBtns = document.querySelectorAll('.btn-signup');

        loginBtns.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'login.html';
            });
        });

        signupBtns.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'signup.html';
            });
        });
    }

    // ===== LOGO CLICK =====
    function initLogo() {
        const logo = document.querySelector('.logo');
        if (logo) {
            const newLogo = logo.cloneNode(true);
            logo.parentNode.replaceChild(newLogo, logo);
            newLogo.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    }

    // ===== SESSION MANAGEMENT =====
    function initSession() {
        // Check if user is logged in
        const session = localStorage.getItem('kahawa_session') || sessionStorage.getItem('kahawa_session');
        const userMenu = document.querySelector('.user-menu');
        const authButtons = document.querySelector('.auth-buttons');

        if (session && userMenu) {
            try {
                const data = JSON.parse(session);
                if (data.expires && data.expires > new Date().getTime()) {
                    // User is logged in - update UI if needed
                    if (authButtons && !authButtons.querySelector('.user-menu')) {
                        // Update user name
                        const userNameSpan = userMenu.querySelector('.user-name');
                        if (userNameSpan && data.user) {
                            userNameSpan.textContent = data.user.fullName || data.user.email.split('@')[0];
                        }
                    }
                } else {
                    // Session expired
                    localStorage.removeItem('kahawa_session');
                    sessionStorage.removeItem('kahawa_session');
                }
            } catch (e) {
                console.error('Session parse error:', e);
            }
        }
    }

    // ===== NOTIFICATION SYSTEM =====
    window.showNotification = function (message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;

        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2e7d32' : type === 'error' ? '#d32f2f' : '#ff9800'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            font-weight: 500;
            max-width: 350px;
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    // ===== HELPER FUNCTIONS =====
    window.isValidEmail = function (email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    window.subscribeNewsletter = async function (email) {
        // Replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Subscribed:', email);
                resolve({ success: true });
            }, 500);
        });
    };

    // ===== DASHBOARD SPECIFIC FUNCTIONS =====
    window.negotiatePrice = function (product) {
        showNotification(`Initiating price negotiation for ${product}`, 'info');
    };

    window.viewRFQ = function () {
        showNotification('Viewing RFQ responses', 'info');
    };

    window.addListing = function () {
        showNotification('Create new coffee listing', 'info');
        window.location.href = 'listings.html?action=add';
    };

    window.editListing = function () {
        showNotification('Edit listing', 'info');
    };

    window.viewListing = function () {
        showNotification('View listing details', 'info');
    };

    window.processOrder = function () {
        showNotification('Processing order', 'info');
    };

    window.respondInquiry = function () {
        showNotification('Respond to buyer inquiry', 'info');
    };

    window.uploadAvatar = function () {
        showNotification('Avatar upload feature coming soon!', 'info');
    };

    window.uploadDocument = function () {
        showNotification('Document upload feature coming soon!', 'info');
    };

    window.enable2FA = function () {
        showNotification('2FA setup will be available soon!', 'info');
    };

    window.connectGoogle = function () {
        showNotification('Google account connection coming soon!', 'info');
    };

    window.connectFacebook = function () {
        showNotification('Facebook account connection coming soon!', 'info');
    };

    window.connectApple = function () {
        showNotification('Apple ID connection coming soon!', 'info');
    };

    window.connectLinkedIn = function () {
        showNotification('LinkedIn connection coming soon!', 'info');
    };

    window.deleteAccount = function () {
        if (confirm('Are you absolutely sure? This action cannot be undone and all your data will be permanently deleted.')) {
            showNotification('Account deletion request submitted. You will receive a confirmation email.', 'info');
        }
    };

    // ===== INITIALIZE ALL =====
    function initAll() {
        initMobileMenu();
        initSearch();
        initNewsletter();
        initCategoryCards();
        initCourseCards();
        initProductCards();
        initReelCards();
        initTourCards();
        initAuthButtons();
        initLogo();
        initSession();

        // Add animation keyframes if not present
        if (!document.querySelector('#kahawa-animations')) {
            const style = document.createElement('style');
            style.id = 'kahawa-animations';
            style.textContent = `
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
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initAll();
});

// ===== LOGIN PAGE SPECIFIC =====
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email')?.value.trim();
            const password = document.getElementById('password')?.value;
            const rememberMe = document.getElementById('rememberMe')?.checked;

            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            const loginBtn = document.getElementById('loginBtn');
            const btnText = document.getElementById('btnText');
            const btnLoader = document.getElementById('btnLoader');

            if (btnText && btnLoader) {
                btnText.style.display = 'none';
                btnLoader.style.display = 'inline-block';
                if (loginBtn) loginBtn.disabled = true;
            }

            try {
                // Simulate login - replace with actual API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                const sessionData = {
                    user: { email: email, fullName: email.split('@')[0], role: 'buyer' },
                    token: 'demo_token_' + Math.random().toString(36).substr(2, 32),
                    expires: new Date().getTime() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)
                };

                if (rememberMe) {
                    localStorage.setItem('kahawa_session', JSON.stringify(sessionData));
                } else {
                    sessionStorage.setItem('kahawa_session', JSON.stringify(sessionData));
                }

                showNotification(`Welcome back, ${sessionData.user.fullName}!`, 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } catch (error) {
                showNotification('Login failed. Please try again.', 'error');
            } finally {
                if (btnText && btnLoader) {
                    btnText.style.display = 'inline';
                    btnLoader.style.display = 'none';
                    if (loginBtn) loginBtn.disabled = false;
                }
            }
        });
    }
});

// ===== SIGNUP PAGE SPECIFIC =====
document.addEventListener('DOMContentLoaded', function () {
    // Password toggle
    window.togglePassword = function (inputId, element) {
        const input = document.getElementById(inputId);
        if (input) {
            if (input.type === 'password') {
                input.type = 'text';
                element.classList.remove('fa-eye');
                element.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                element.classList.remove('fa-eye-slash');
                element.classList.add('fa-eye');
            }
        }
    };

    // Password strength
    const passwordInput = document.getElementById('password');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    if (passwordInput) {
        passwordInput.addEventListener('input', function () {
            const password = this.value;
            let strength = 0;

            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
            if (password.match(/\d/)) strength++;
            if (password.match(/[^a-zA-Z\d]/)) strength++;

            let result = { level: 0, text: '', class: '' };
            if (password.length === 0) result = { level: 0, text: '', class: '' };
            else if (strength === 1) result = { level: 1, text: 'Weak', class: 'weak' };
            else if (strength === 2) result = { level: 2, text: 'Fair', class: 'fair' };
            else if (strength === 3) result = { level: 3, text: 'Good', class: 'good' };
            else if (strength >= 4) result = { level: 4, text: 'Strong', class: 'strong' };

            if (strengthFill) strengthFill.className = `strength-meter-fill ${result.class}`;
            if (strengthText) strengthText.textContent = result.text ? `Password strength: ${result.text}` : '';
        });
    }

    // Role selection
    const roleOptions = document.querySelectorAll('.role-option');
    if (roleOptions.length) {
        roleOptions.forEach(option => {
            option.addEventListener('click', function () {
                roleOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');

                const role = this.dataset.role;
                const buyerFields = document.getElementById('buyerFields');
                const sellerFields = document.getElementById('sellerFields');
                const individualFields = document.getElementById('individualFields');

                if (buyerFields) buyerFields.classList.remove('show');
                if (sellerFields) sellerFields.classList.remove('show');
                if (individualFields) individualFields.classList.remove('show');

                if (role === 'buyer' && buyerFields) buyerFields.classList.add('show');
                else if (role === 'seller' && sellerFields) sellerFields.classList.add('show');
                else if (role === 'individual' && individualFields) individualFields.classList.add('show');
            });
        });
    }

    // Signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const password = document.getElementById('password')?.value;
            const confirmPassword = document.getElementById('confirmPassword')?.value;
            const termsAgree = document.getElementById('termsAgree')?.checked;

            if (!fullName || !email || !password || !confirmPassword) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }

            if (password.length < 8) {
                showNotification('Password must be at least 8 characters', 'error');
                return;
            }

            if (!termsAgree) {
                showNotification('Please agree to the Terms of Service', 'error');
                return;
            }

            const signupBtn = document.getElementById('signupBtn');
            const btnText = document.getElementById('btnText');
            const btnLoader = document.getElementById('btnLoader');

            if (btnText && btnLoader) {
                btnText.style.display = 'none';
                btnLoader.style.display = 'inline-block';
                if (signupBtn) signupBtn.disabled = true;
            }

            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                showNotification('Account created successfully! Please check your email to verify your account.', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html?verified=pending';
                }, 2000);
            } catch (error) {
                showNotification('Signup failed. Please try again.', 'error');
            } finally {
                if (btnText && btnLoader) {
                    btnText.style.display = 'inline';
                    btnLoader.style.display = 'none';
                    if (signupBtn) signupBtn.disabled = false;
                }
            }
        });
    }
});

// ===== ORDERS PAGE SPECIFIC =====
document.addEventListener('DOMContentLoaded', function () {
    // Tab switching for orders page
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                // Add your tab switching logic here
            });
        });
    }

    // Filter orders
    window.filterOrders = function () {
        const statusFilter = document.getElementById('statusFilter')?.value;
        const dateFilter = document.getElementById('dateFilter')?.value;
        const searchInput = document.getElementById('searchInput')?.value;
        // Add your filter logic here
        showNotification('Filtering orders...', 'info');
    };

    // View tracking
    window.viewTracking = function (orderId) {
        showNotification(`Viewing tracking for order ${orderId}`, 'info');
    };

    // Write review
    window.writeReview = function (orderId) {
        showNotification(`Write a review for order ${orderId}`, 'info');
    };

    // Reorder
    window.reorder = function (orderId) {
        showNotification(`Adding items from order ${orderId} to cart...`, 'info');
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 1500);
    };

    // Cancel order
    window.cancelOrder = function (orderId) {
        if (confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
            showNotification(`Order ${orderId} has been cancelled.`, 'info');
        }
    };

    // View order details
    window.viewOrderDetails = function (orderId) {
        showNotification(`Viewing details for order ${orderId}`, 'info');
    };

    // Submit review
    window.submitReview = function () {
        const rating = document.querySelectorAll('#ratingStars i.active').length;
        const reviewText = document.getElementById('reviewText')?.value;
        if (rating === 0) {
            showNotification('Please select a rating', 'error');
            return;
        }
        if (!reviewText?.trim()) {
            showNotification('Please write a review', 'error');
            return;
        }
        showNotification('Thank you for your review!', 'success');
        closeReviewModal();
    };

    // Close review modal
    window.closeReviewModal = function () {
        const modal = document.getElementById('reviewModal');
        if (modal) modal.classList.remove('active');
    };

    // Close tracking modal
    window.closeTrackingModal = function () {
        const modal = document.getElementById('trackingModal');
        if (modal) modal.classList.remove('active');
    };
});

// ===== PROFILE PAGE SPECIFIC =====
document.addEventListener('DOMContentLoaded', function () {
    // Profile section switching
    const profileLinks = document.querySelectorAll('.profile-menu a');
    if (profileLinks.length) {
        profileLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const section = this.dataset.section;

                profileLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                document.querySelectorAll('.profile-section').forEach(s => s.classList.remove('active'));
                const targetSection = document.getElementById(`${section}-section`);
                if (targetSection) targetSection.classList.add('active');
            });
        });
    }

    // Interest tag toggle
    document.querySelectorAll('.interest-tag').forEach(tag => {
        tag.addEventListener('click', function (e) {
            const checkbox = this.querySelector('input');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                this.classList.toggle('selected', checkbox.checked);
            }
        });
    });

    // Form submissions
    const personalForm = document.getElementById('personalForm');
    if (personalForm) {
        personalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Personal information updated successfully!', 'success');
        });
    }

    const businessForm = document.getElementById('businessForm');
    if (businessForm) {
        businessForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Business information updated successfully!', 'success');
        });
    }

    const preferencesForm = document.getElementById('preferencesForm');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Preferences saved successfully!', 'success');
        });
    }

    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
        securityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPass = document.getElementById('newPassword')?.value;
            const confirmPass = document.getElementById('confirmPassword')?.value;
            if (newPass && newPass !== confirmPass) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            if (newPass && newPass.length < 8) {
                showNotification('Password must be at least 8 characters', 'error');
                return;
            }
            showNotification('Password updated successfully!', 'success');
        });
    }

    const billingForm = document.getElementById('billingForm');
    if (billingForm) {
        billingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Billing information updated!', 'success');
        });
    }
});

// ===== SETTINGS PAGE SPECIFIC =====
document.addEventListener('DOMContentLoaded', function () {
    // Settings section switching
    const settingsLinks = document.querySelectorAll('.settings-menu a');
    if (settingsLinks.length) {
        settingsLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const section = this.dataset.section;

                settingsLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
                const targetSection = document.getElementById(`${section}-section`);
                if (targetSection) targetSection.classList.add('active');
            });
        });
    }

    // Settings form submissions
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Account information updated successfully!', 'success');
        });
    }

    const notificationsForm = document.getElementById('notificationsForm');
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Notification preferences saved!', 'success');
        });
    }

    const privacyForm = document.getElementById('privacyForm');
    if (privacyForm) {
        privacyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Security settings updated!', 'success');
        });
    }

    const preferencesSettingsForm = document.getElementById('preferencesForm');
    if (preferencesSettingsForm && !preferencesSettingsForm.closest('#preferences-section')) {
        preferencesSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Preferences saved!', 'success');
        });
    }

    const billingSettingsForm = document.getElementById('billingForm');
    if (billingSettingsForm) {
        billingSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Billing information updated!', 'success');
        });
    }
});

// ===== LISTINGS PAGE SPECIFIC =====
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('listingsGrid')) {
        window.filterByStatus = function (status) {
            showNotification(`Filtering by ${status} listings`, 'info');
        };

        window.openAddListingModal = function () {
            showNotification('Add new listing feature coming soon', 'info');
        };

        window.deleteListing = function (id) {
            if (confirm('Are you sure you want to delete this listing?')) {
                showNotification('Listing deleted', 'info');
            }
        };

        window.closeModal = function () {
            const modal = document.getElementById('listingModal');
            if (modal) modal.classList.remove('active');
        };

        window.saveListing = function () {
            showNotification('Listing saved successfully!', 'success');
            closeModal();
        };
    }
});

// ===== SELLER ORDERS PAGE SPECIFIC =====
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('ordersList') && window.location.pathname.includes('ordersforseller')) {
        window.openStatusModal = function (orderId, action) {
            showNotification(`Opening status update for order ${orderId}`, 'info');
        };

        window.closeStatusModal = function () {
            const modal = document.getElementById('statusModal');
            if (modal) modal.classList.remove('active');
        };

        window.updateOrderStatus = function () {
            showNotification('Order status updated!', 'success');
            closeStatusModal();
        };

        window.declineOrder = function (orderId) {
            if (confirm('Are you sure you want to decline this order?')) {
                showNotification(`Order ${orderId} declined`, 'info');
            }
        };
    }
});
// kahawa-main.js - Helper functions for Kahawa Space
// This file ONLY adds helper functions, does not override existing code

// ===== HELPER FUNCTIONS =====

// Show notification function
function showNotification(message, type = 'success') {
    // Check if notification already exists
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// BRELA validation for Tanzania
function validateBRELA(number) {
    const brelaPattern = /^\d{6,8}-\d{3,5}$/;
    return brelaPattern.test(number);
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    if (password.length === 0) return { level: 0, text: '', class: '' };
    if (strength === 1) return { level: 1, text: 'Weak', class: 'weak' };
    if (strength === 2) return { level: 2, text: 'Fair', class: 'fair' };
    if (strength === 3) return { level: 3, text: 'Good', class: 'good' };
    return { level: 4, text: 'Strong', class: 'strong' };
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Get user session
function getUserSession() {
    const session = localStorage.getItem('kahawa_session') || sessionStorage.getItem('kahawa_session');
    if (session) {
        try {
            const data = JSON.parse(session);
            if (data.expires && data.expires > new Date().getTime()) {
                return data;
            } else {
                // Session expired
                localStorage.removeItem('kahawa_session');
                sessionStorage.removeItem('kahawa_session');
                return null;
            }
        } catch (e) {
            return null;
        }
    }
    return null;
}

// Save user session
function saveUserSession(userData, rememberMe = false) {
    const sessionData = {
        user: userData,
        token: 'kahawa_token_' + Math.random().toString(36).substr(2, 32),
        expires: new Date().getTime() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)
    };

    if (rememberMe) {
        localStorage.setItem('kahawa_session', JSON.stringify(sessionData));
    } else {
        sessionStorage.setItem('kahawa_session', JSON.stringify(sessionData));
    }

    return sessionData;
}

// Clear user session
function clearUserSession() {
    localStorage.removeItem('kahawa_session');
    sessionStorage.removeItem('kahawa_session');
}

// Check if user is logged in
function isUserLoggedIn() {
    return getUserSession() !== null;
}

// Redirect to login if not logged in
function requireLogin(redirectUrl = 'login.html') {
    if (!isUserLoggedIn()) {
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = redirectUrl;
        return false;
    }
    return true;
}

// Get URL parameters
function getUrlParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }
    return params;
}

// ===== DASHBOARD HELPER FUNCTIONS =====

// Negotiate price (for buyer dashboard)
function negotiatePrice(product) {
    showNotification(`Initiating price negotiation for ${product}`, 'info');
}

// View RFQ (for buyer dashboard)
function viewRFQ() {
    showNotification('Viewing RFQ responses', 'info');
}

// Add listing (for seller dashboard)
function addListing() {
    showNotification('Create new coffee listing', 'info');
}

// Edit listing
function editListing() {
    showNotification('Edit listing', 'info');
}

// View listing
function viewListing() {
    showNotification('View listing details', 'info');
}

// Process order
function processOrder() {
    showNotification('Processing order', 'info');
}

// Respond to inquiry
function respondInquiry() {
    showNotification('Respond to buyer inquiry', 'info');
}

// Upload avatar
function uploadAvatar() {
    showNotification('Avatar upload feature coming soon!', 'info');
}

// Upload document
function uploadDocument() {
    showNotification('Document upload feature coming soon!', 'info');
}

// Enable 2FA
function enable2FA() {
    showNotification('2FA setup will be available soon!', 'info');
}

// Connect social accounts
function connectGoogle() { showNotification('Google account connection coming soon!', 'info'); }
function connectFacebook() { showNotification('Facebook account connection coming soon!', 'info'); }
function connectApple() { showNotification('Apple ID connection coming soon!', 'info'); }
function connectLinkedIn() { showNotification('LinkedIn connection coming soon!', 'info'); }

// Delete account
function deleteAccount() {
    if (confirm('Are you absolutely sure? This action cannot be undone and all your data will be permanently deleted.')) {
        showNotification('Account deletion request submitted. You will receive a confirmation email.', 'info');
    }
}

// ===== ORDERS PAGE HELPER FUNCTIONS =====

// View tracking
function viewTracking(orderId) {
    showNotification(`Viewing tracking for order ${orderId}`, 'info');
}

// Write review
function writeReview(orderId) {
    showNotification(`Write a review for order ${orderId}`, 'info');
}

// Reorder
function reorder(orderId) {
    showNotification(`Adding items from order ${orderId} to cart...`, 'info');
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 1500);
}

// Cancel order
function cancelOrder(orderId) {
    if (confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
        showNotification(`Order ${orderId} has been cancelled.`, 'info');
    }
}

// View order details
function viewOrderDetails(orderId) {
    showNotification(`Viewing details for order ${orderId}`, 'info');
}

// Submit review
function submitReview() {
    const activeStars = document.querySelectorAll('#ratingStars i.active');
    const rating = activeStars.length;
    const reviewText = document.getElementById('reviewText')?.value;

    if (rating === 0) {
        showNotification('Please select a rating', 'error');
        return;
    }
    if (!reviewText?.trim()) {
        showNotification('Please write a review', 'error');
        return;
    }

    showNotification('Thank you for your review!', 'success');
    closeReviewModal();
}

// Close review modal
function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) modal.classList.remove('active');
}

// Close tracking modal
function closeTrackingModal() {
    const modal = document.getElementById('trackingModal');
    if (modal) modal.classList.remove('active');
}

// ===== LISTINGS PAGE HELPER FUNCTIONS =====

// Filter by status
function filterByStatus(status) {
    showNotification(`Filtering by ${status} listings`, 'info');
}

// Open add listing modal
function openAddListingModal() {
    showNotification('Add new listing feature coming soon', 'info');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('listingModal');
    if (modal) modal.classList.remove('active');
}

// Save listing
function saveListing() {
    showNotification('Listing saved successfully!', 'success');
    closeModal();
}

// Delete listing
function deleteListing(id) {
    if (confirm('Are you sure you want to delete this listing?')) {
        showNotification('Listing deleted', 'info');
    }
}

// ===== SELLER ORDERS HELPER FUNCTIONS =====

// Open status modal
function openStatusModal(orderId, action) {
    showNotification(`Opening status update for order ${orderId}`, 'info');
}

// Close status modal
function closeStatusModal() {
    const modal = document.getElementById('statusModal');
    if (modal) modal.classList.remove('active');
}

// Update order status
function updateOrderStatus() {
    showNotification('Order status updated!', 'success');
    closeStatusModal();
}

// Decline order
function declineOrder(orderId) {
    if (confirm('Are you sure you want to decline this order?')) {
        showNotification(`Order ${orderId} declined`, 'info');
    }
}

// ===== FILTER ORDERS FUNCTION =====
function filterOrders() {
    const statusFilter = document.getElementById('statusFilter')?.value;
    const dateFilter = document.getElementById('dateFilter')?.value;
    const searchInput = document.getElementById('searchInput')?.value;
    showNotification('Filtering orders...', 'info');
}

// ===== TOGGLE PASSWORD VISIBILITY =====
function togglePassword(inputId, element) {
    const input = document.getElementById(inputId);
    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
            element.classList.remove('fa-eye');
            element.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            element.classList.remove('fa-eye-slash');
            element.classList.add('fa-eye');
        }
    }
}

// ===== INITIALIZATION - ONLY ADDS EVENT LISTENERS, DOESN'T OVERWRITE =====
document.addEventListener('DOMContentLoaded', function () {
    // Only add event listeners if they don't already exist

    // Password toggle buttons (only if function exists and buttons are present)
    if (typeof togglePassword === 'function') {
        document.querySelectorAll('.toggle-password').forEach(btn => {
            if (!btn.hasAttribute('data-listener')) {
                btn.setAttribute('data-listener', 'true');
                const inputId = btn.getAttribute('data-input') ||
                    (btn.previousElementSibling?.id || btn.parentElement?.querySelector('input')?.id);
                if (inputId) {
                    btn.onclick = () => togglePassword(inputId, btn);
                }
            }
        });
    }

    // Profile section switching (only if elements exist)
    const profileLinks = document.querySelectorAll('.profile-menu a');
    if (profileLinks.length && !profileLinks[0].hasAttribute('data-listener')) {
        profileLinks.forEach(link => {
            link.setAttribute('data-listener', 'true');
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const section = this.dataset.section;

                profileLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                document.querySelectorAll('.profile-section').forEach(s => s.classList.remove('active'));
                const targetSection = document.getElementById(`${section}-section`);
                if (targetSection) targetSection.classList.add('active');
            });
        });
    }

    // Settings section switching (only if elements exist)
    const settingsLinks = document.querySelectorAll('.settings-menu a');
    if (settingsLinks.length && !settingsLinks[0].hasAttribute('data-listener')) {
        settingsLinks.forEach(link => {
            link.setAttribute('data-listener', 'true');
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const section = this.dataset.section;

                settingsLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
                const targetSection = document.getElementById(`${section}-section`);
                if (targetSection) targetSection.classList.add('active');
            });
        });
    }

    // Interest tag toggle
    document.querySelectorAll('.interest-tag').forEach(tag => {
        if (!tag.hasAttribute('data-listener')) {
            tag.setAttribute('data-listener', 'true');
            tag.addEventListener('click', function () {
                const checkbox = this.querySelector('input');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    this.classList.toggle('selected', checkbox.checked);
                }
            });
        }
    });

    // Password strength meter
    const passwordInput = document.getElementById('password');
    if (passwordInput && typeof checkPasswordStrength === 'function' && !passwordInput.hasAttribute('data-listener')) {
        passwordInput.setAttribute('data-listener', 'true');
        passwordInput.addEventListener('input', function () {
            const result = checkPasswordStrength(this.value);
            const strengthFill = document.getElementById('strengthFill');
            const strengthText = document.getElementById('strengthText');

            if (strengthFill) strengthFill.className = `strength-meter-fill ${result.class}`;
            if (strengthText) strengthText.textContent = result.text ? `Password strength: ${result.text}` : '';
        });
    }

    // Role selection for signup
    const roleOptions = document.querySelectorAll('.role-option');
    if (roleOptions.length && !roleOptions[0].hasAttribute('data-listener')) {
        roleOptions.forEach(option => {
            option.setAttribute('data-listener', 'true');
            option.addEventListener('click', function () {
                roleOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');

                const role = this.dataset.role;
                const buyerFields = document.getElementById('buyerFields');
                const sellerFields = document.getElementById('sellerFields');
                const individualFields = document.getElementById('individualFields');

                if (buyerFields) buyerFields.classList.remove('show');
                if (sellerFields) sellerFields.classList.remove('show');
                if (individualFields) individualFields.classList.remove('show');

                if (role === 'buyer' && buyerFields) buyerFields.classList.add('show');
                else if (role === 'seller' && sellerFields) sellerFields.classList.add('show');
                else if (role === 'individual' && individualFields) individualFields.classList.add('show');
            });
        });
    }

    // Rating stars
    const ratingStars = document.getElementById('ratingStars');
    if (ratingStars && !ratingStars.hasAttribute('data-listener')) {
        ratingStars.setAttribute('data-listener', 'true');
        ratingStars.addEventListener('click', function (e) {
            const star = e.target.closest('i');
            if (star) {
                const rating = parseInt(star.dataset.rating);
                let selectedRating = rating;

                document.querySelectorAll('#ratingStars i').forEach((s, index) => {
                    if (index < rating) {
                        s.classList.remove('far');
                        s.classList.add('fas', 'active');
                    } else {
                        s.classList.remove('fas', 'active');
                        s.classList.add('far');
                    }
                });

                // Store rating in a variable for form submission
                window.selectedRating = selectedRating;
            }
        });
    }
});
// ============================================
// Mobile Menu JavaScript - Kahawa Space
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Check if elements exist
    if (!mobileMenuBtn || !navLinks) return;

    // Mobile menu toggle function
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Add click event to mobile menu button
    mobileMenuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close mobile menu when clicking a navigation link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        link.addEventListener('click', function () {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(event.target) &&
            !mobileMenuBtn.contains(event.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Handle escape key to close menu
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Optional: Handle window resize - close menu if resizing to desktop
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }, 250);
    });
});
// Export functions for global use
window.showNotification = showNotification;
window.isValidEmail = isValidEmail;
window.validateBRELA = validateBRELA;
window.checkPasswordStrength = checkPasswordStrength;
window.formatDate = formatDate;
window.getUserSession = getUserSession;
window.saveUserSession = saveUserSession;
window.clearUserSession = clearUserSession;
window.isUserLoggedIn = isUserLoggedIn;
window.requireLogin = requireLogin;
window.getUrlParams = getUrlParams;
window.negotiatePrice = negotiatePrice;
window.viewRFQ = viewRFQ;
window.addListing = addListing;
window.editListing = editListing;
window.viewListing = viewListing;
window.processOrder = processOrder;
window.respondInquiry = respondInquiry;
window.uploadAvatar = uploadAvatar;
window.uploadDocument = uploadDocument;
window.enable2FA = enable2FA;
window.connectGoogle = connectGoogle;
window.connectFacebook = connectFacebook;
window.connectApple = connectApple;
window.connectLinkedIn = connectLinkedIn;
window.deleteAccount = deleteAccount;
window.viewTracking = viewTracking;
window.writeReview = writeReview;
window.reorder = reorder;
window.cancelOrder = cancelOrder;
window.viewOrderDetails = viewOrderDetails;
window.submitReview = submitReview;
window.closeReviewModal = closeReviewModal;
window.closeTrackingModal = closeTrackingModal;
window.filterByStatus = filterByStatus;
window.openAddListingModal = openAddListingModal;
window.closeModal = closeModal;
window.saveListing = saveListing;
window.deleteListing = deleteListing;
window.openStatusModal = openStatusModal;
window.closeStatusModal = closeStatusModal;
window.updateOrderStatus = updateOrderStatus;
window.declineOrder = declineOrder;
window.filterOrders = filterOrders;
window.togglePassword = togglePassword;