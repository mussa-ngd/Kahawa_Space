// js/auth.js - Authentication Modal System for Kahawa Space

// Modal HTML Template
const authModalHTML = `
<div id="authModal" class="auth-modal" style="display: none;">
    <div class="auth-modal-content">
        <div class="auth-modal-header">
            <h2 id="authModalTitle">Welcome to Kahawa Space</h2>
            <button class="auth-modal-close">&times;</button>
        </div>
        
        <!-- Login Form -->
        <div id="loginForm" class="auth-form active">
            <p class="auth-subtitle">Sign in to your account</p>
            <form id="loginFormElement">
                <div class="auth-form-group">
                    <label for="loginEmail">Email Address</label>
                    <input type="email" id="loginEmail" name="email" placeholder="you@example.com" required>
                </div>
                <div class="auth-form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" name="password" placeholder="Enter your password" required>
                </div>
                <div class="auth-form-options">
                    <label class="checkbox-label">
                        <input type="checkbox" id="rememberMe"> Remember me
                    </label>
                    <a href="#" class="forgot-password">Forgot password?</a>
                </div>
                <button type="submit" class="auth-submit-btn">Log In</button>
            </form>
            <p class="auth-switch">
                Don't have an account? 
                <a href="#" id="switchToSignup">Sign up</a>
            </p>
        </div>
        
        <!-- Sign Up Form -->
        <div id="signupForm" class="auth-form">
            <p class="auth-subtitle">Create your Kahawa Space account</p>
            <form id="signupFormElement">
                <div class="auth-form-group">
                    <label for="signupFullName">Full Name</label>
                    <input type="text" id="signupFullName" name="fullName" placeholder="John Doe" required>
                </div>
                <div class="auth-form-group">
                    <label for="signupEmail">Email Address</label>
                    <input type="email" id="signupEmail" name="email" placeholder="you@example.com" required>
                </div>
                <div class="auth-form-group">
                    <label for="signupPassword">Password</label>
                    <input type="password" id="signupPassword" name="password" placeholder="Create a password" required>
                </div>
                <div class="auth-form-group">
                    <label for="signupConfirmPassword">Confirm Password</label>
                    <input type="password" id="signupConfirmPassword" name="confirmPassword" placeholder="Confirm your password" required>
                </div>
                <div class="auth-form-group">
                    <label for="signupRole">I am a...</label>
                    <select id="signupRole" name="role" required>
                        <option value="">Select your role</option>
                        <option value="buyer">Buyer (Roaster, Café Owner, Importer)</option>
                        <option value="seller">Seller (Farmer, Cooperative, Exporter)</option>
                        <option value="individual">Coffee Lover / Individual</option>
                    </select>
                </div>
                <div class="auth-form-group seller-fields" style="display: none;">
                    <label for="signupBusinessName">Business Name</label>
                    <input type="text" id="signupBusinessName" name="businessName" placeholder="Your business name">
                </div>
                <div class="auth-form-group seller-fields" style="display: none;">
                    <label for="signupBusinessReg">Business Registration Number (BRELA)</label>
                    <input type="text" id="signupBusinessReg" name="businessReg" placeholder="e.g., 123456-789">
                </div>
                <div class="auth-form-group seller-fields" style="display: none;">
                    <label for="signupCountry">Country</label>
                    <select id="signupCountry" name="country">
                        <option value="">Select country</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="auth-form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="termsAgree" required> I agree to the 
                        <a href="#" target="_blank">Terms of Service</a> and 
                        <a href="#" target="_blank">Privacy Policy</a>
                    </label>
                </div>
                <button type="submit" class="auth-submit-btn">Create Account</button>
            </form>
            <p class="auth-switch">
                Already have an account? 
                <a href="#" id="switchToLogin">Log in</a>
            </p>
        </div>
        
        <!-- Success Message -->
        <div id="authSuccessMessage" class="auth-success" style="display: none;">
            <i class="fas fa-check-circle"></i>
            <h3>Success!</h3>
            <p id="successMessageText"></p>
        </div>
        
        <!-- Error Message -->
        <div id="authErrorMessage" class="auth-error" style="display: none;">
            <i class="fas fa-exclamation-circle"></i>
            <p id="errorMessageText"></p>
        </div>
    </div>
</div>
`;

// Add modal styles to the page
const authModalStyles = `
<style>
.auth-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
}

.auth-modal-content {
    background: var(--white, #ffffff);
    border-radius: 24px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: slideUp 0.3s ease;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.auth-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--gray-light, #f0e9e0);
    background: linear-gradient(135deg, var(--primary-dark, #2c1810) 0%, #3d2a1c 100%);
    border-radius: 24px 24px 0 0;
}

.auth-modal-header h2 {
    color: white;
    margin: 0;
    font-size: 1.5rem;
}

.auth-modal-close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.auth-modal-close:hover {
    background: var(--accent-gold, #c9a227);
    transform: rotate(90deg);
}

.auth-form {
    padding: 2rem;
    display: none;
}

.auth-form.active {
    display: block;
}

.auth-subtitle {
    text-align: center;
    color: var(--gray, #9b8b7a);
    margin-bottom: 1.5rem;
}

.auth-form-group {
    margin-bottom: 1.25rem;
}

.auth-form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--primary-dark, #2c1810);
}

.auth-form-group input,
.auth-form-group select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid var(--gray-light, #f0e9e0);
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s;
    font-family: 'Inter', sans-serif;
}

.auth-form-group input:focus,
.auth-form-group select:focus {
    outline: none;
    border-color: var(--accent-gold, #c9a227);
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1);
}

.auth-form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: normal;
}

.forgot-password {
    color: var(--primary-brown, #8b5a2b);
    text-decoration: none;
    font-size: 0.9rem;
}

.forgot-password:hover {
    color: var(--accent-gold, #c9a227);
}

.auth-submit-btn {
    width: 100%;
    padding: 0.875rem;
    background: var(--primary-dark, #2c1810);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 0.5rem;
}

.auth-submit-btn:hover {
    background: var(--primary-brown, #8b5a2b);
    transform: translateY(-2px);
}

.auth-switch {
    text-align: center;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--gray-light, #f0e9e0);
    color: var(--gray, #9b8b7a);
}

.auth-switch a {
    color: var(--primary-brown, #8b5a2b);
    text-decoration: none;
    font-weight: 600;
}

.auth-switch a:hover {
    color: var(--accent-gold, #c9a227);
}

.auth-success,
.auth-error {
    padding: 2rem;
    text-align: center;
}

.auth-success i,
.auth-error i {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.auth-success i {
    color: var(--success, #2e7d32);
}

.auth-error i {
    color: #d32f2f;
}

.auth-success h3 {
    color: var(--success, #2e7d32);
    margin-bottom: 0.5rem;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .auth-modal-content {
        width: 95%;
        max-height: 85vh;
    }
    
    .auth-form {
        padding: 1.5rem;
    }
    
    .auth-modal-header {
        padding: 1rem 1.5rem;
    }
    
    .auth-modal-header h2 {
        font-size: 1.25rem;
    }
}
</style>
`;

// Authentication Manager Class
class AuthManager {
    constructor() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.init();
    }
    
    init() {
        // Add modal HTML and styles to page
        if (!document.getElementById('authModal')) {
            document.body.insertAdjacentHTML('beforeend', authModalStyles);
            document.body.insertAdjacentHTML('beforeend', authModalHTML);
        }
        
        // Check for existing session
        this.checkSession();
        
        // Setup event listeners
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Login button listeners
        const loginBtns = document.querySelectorAll('.btn-login');
        loginBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal('login');
            });
        });
        
        // Signup button listeners
        const signupBtns = document.querySelectorAll('.btn-signup');
        signupBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal('signup');
            });
        });
        
        // Close modal
        const closeBtn = document.querySelector('.auth-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideModal());
        }
        
        // Click outside modal to close
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal();
                }
            });
        }
        
        // Switch between login and signup
        const switchToSignup = document.getElementById('switchToSignup');
        const switchToLogin = document.getElementById('switchToLogin');
        
        if (switchToSignup) {
            switchToSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal('signup');
            });
        }
        
        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal('login');
            });
        }
        
        // Role selection for signup
        const roleSelect = document.getElementById('signupRole');
        if (roleSelect) {
            roleSelect.addEventListener('change', (e) => {
                const sellerFields = document.querySelectorAll('.seller-fields');
                if (e.target.value === 'seller') {
                    sellerFields.forEach(field => field.style.display = 'block');
                } else {
                    sellerFields.forEach(field => field.style.display = 'none');
                }
            });
        }
        
        // Form submissions
        const loginForm = document.getElementById('loginFormElement');
        const signupForm = document.getElementById('signupFormElement');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }
    
    showModal(type = 'login') {
        const modal = document.getElementById('authModal');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const successMsg = document.getElementById('authSuccessMessage');
        const errorMsg = document.getElementById('authErrorMessage');
        const title = document.getElementById('authModalTitle');
        
        // Hide all forms and messages
        if (loginForm) loginForm.classList.remove('active');
        if (signupForm) signupForm.classList.remove('active');
        if (successMsg) successMsg.style.display = 'none';
        if (errorMsg) errorMsg.style.display = 'none';
        
        // Show selected form
        if (type === 'login') {
            if (loginForm) loginForm.classList.add('active');
            if (title) title.textContent = 'Welcome Back';
        } else {
            if (signupForm) signupForm.classList.add('active');
            if (title) title.textContent = 'Join Kahawa Space';
        }
        
        if (modal) modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    hideModal() {
        const modal = document.getElementById('authModal');
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Clear forms and messages
        this.clearForms();
    }
    
    clearForms() {
        const loginForm = document.getElementById('loginFormElement');
        const signupForm = document.getElementById('signupFormElement');
        const errorMsg = document.getElementById('authErrorMessage');
        const successMsg = document.getElementById('authSuccessMessage');
        
        if (loginForm) loginForm.reset();
        if (signupForm) signupForm.reset();
        if (errorMsg) errorMsg.style.display = 'none';
        if (successMsg) successMsg.style.display = 'none';
        
        // Hide seller fields
        const sellerFields = document.querySelectorAll('.seller-fields');
        sellerFields.forEach(field => field.style.display = 'none');
    }
    
    showMessage(type, message) {
        const successMsg = document.getElementById('authSuccessMessage');
        const errorMsg = document.getElementById('authErrorMessage');
        const successText = document.getElementById('successMessageText');
        const errorText = document.getElementById('errorMessageText');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        // Hide forms
        if (loginForm) loginForm.classList.remove('active');
        if (signupForm) signupForm.classList.remove('active');
        
        if (type === 'success') {
            if (successMsg) {
                if (successText) successText.textContent = message;
                successMsg.style.display = 'block';
            }
            // Auto close after 2 seconds
            setTimeout(() => {
                this.hideModal();
            }, 2000);
        } else {
            if (errorMsg) {
                if (errorText) errorText.textContent = message;
                errorMsg.style.display = 'block';
            }
            // Auto hide error after 3 seconds and show form again
            setTimeout(() => {
                if (errorMsg) errorMsg.style.display = 'none';
                if (loginForm && !signupForm.classList.contains('active')) {
                    loginForm.classList.add('active');
                } else if (signupForm) {
                    signupForm.classList.add('active');
                }
            }, 3000);
        }
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe')?.checked || false;
        
        if (!email || !password) {
            this.showMessage('error', 'Please fill in all fields');
            return;
        }
        
        // Show loading state
        const submitBtn = e.target.querySelector('.auth-submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;
        
        try {
            // API call to backend (to be implemented)
            const response = await this.loginAPI(email, password);
            
            if (response.success) {
                this.isLoggedIn = true;
                this.currentUser = response.user;
                
                // Save session if remember me
                if (rememberMe) {
                    localStorage.setItem('kahawa_session', JSON.stringify({
                        user: response.user,
                        token: response.token
                    }));
                } else {
                    sessionStorage.setItem('kahawa_session', JSON.stringify({
                        user: response.user,
                        token: response.token
                    }));
                }
                
                this.showMessage('success', `Welcome back, ${response.user.fullName || response.user.email}!`);
                this.updateUIAfterLogin(response.user);
            } else {
                this.showMessage('error', response.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showMessage('error', 'Network error. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async handleSignup(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('signupFullName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const role = document.getElementById('signupRole').value;
        const termsAgree = document.getElementById('termsAgree').checked;
        
        // Validation
        if (!fullName || !email || !password || !confirmPassword || !role) {
            this.showMessage('error', 'Please fill in all required fields');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showMessage('error', 'Passwords do not match');
            return;
        }
        
        if (password.length < 8) {
            this.showMessage('error', 'Password must be at least 8 characters');
            return;
        }
        
        if (!termsAgree) {
            this.showMessage('error', 'Please agree to the Terms of Service');
            return;
        }
        
        // Additional seller fields
        let businessName = null;
        let businessReg = null;
        let country = null;
        
        if (role === 'seller') {
            businessName = document.getElementById('signupBusinessName')?.value;
            businessReg = document.getElementById('signupBusinessReg')?.value;
            country = document.getElementById('signupCountry')?.value;
            
            if (!businessName || !businessReg || !country) {
                this.showMessage('error', 'Please fill in all seller information');
                return;
            }
            
            // Validate Tanzania BRELA format if country is Tanzania
            if (country === 'Tanzania') {
                const brelaPattern = /^\d{6,8}-\d{3,5}$/;
                if (!brelaPattern.test(businessReg)) {
                    this.showMessage('error', 'Invalid BRELA number format. Should be like: 123456-789');
                    return;
                }
            }
        }
        
        // Show loading state
        const submitBtn = e.target.querySelector('.auth-submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating account...';
        submitBtn.disabled = true;
        
        try {
            // API call to backend
            const response = await this.signupAPI({
                fullName,
                email,
                password,
                role,
                businessName,
                businessReg,
                country
            });
            
            if (response.success) {
                this.showMessage('success', 'Account created successfully! Please check your email to verify your account.');
                
                // Auto login after signup
                setTimeout(() => {
                    this.showModal('login');
                }, 2000);
            } else {
                this.showMessage('error', response.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            this.showMessage('error', 'Network error. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    // API Methods (to be connected to backend)
    async loginAPI(email, password) {
        // This will be replaced with actual API call
        // For now, simulate API response
        return new Promise((resolve) => {
            setTimeout(() => {
                // Demo: Accept any email/password for testing
                if (email && password) {
                    resolve({
                        success: true,
                        user: {
                            id: 1,
                            email: email,
                            fullName: email.split('@')[0],
                            role: 'buyer'
                        },
                        token: 'demo-token-12345'
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Invalid credentials'
                    });
                }
            }, 1000);
        });
    }
    
    async signupAPI(userData) {
        // This will be replaced with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: 'Account created successfully'
                });
            }, 1500);
        });
    }
    
    checkSession() {
        // Check for existing session
        const session = localStorage.getItem('kahawa_session') || sessionStorage.getItem('kahawa_session');
        if (session) {
            try {
                const data = JSON.parse(session);
                this.isLoggedIn = true;
                this.currentUser = data.user;
                this.updateUIAfterLogin(data.user);
            } catch (e) {
                console.error('Session parse error:', e);
            }
        }
    }
    
    updateUIAfterLogin(user) {
        // Update UI to show logged in state
        const authButtons = document.querySelectorAll('.auth-buttons');
        
        authButtons.forEach(container => {
            // Create logged in user menu
            const userMenu = document.createElement('div');
            userMenu.className = 'user-menu';
            userMenu.innerHTML = `
                <div class="user-avatar">
                    <i class="fas fa-user-circle"></i>
                    <span class="user-name">${user.fullName || user.email.split('@')[0]}</span>
                </div>
                <div class="user-dropdown">
                    <a href="dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                    <a href="profile.html"><i class="fas fa-user"></i> Profile</a>
                    <a href="settings.html"><i class="fas fa-cog"></i> Settings</a>
                    <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            `;
            
            // Add styles for user menu
            const style = document.createElement('style');
            style.textContent = `
                .user-menu {
                    position: relative;
                    cursor: pointer;
                }
                .user-avatar {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 0.5rem 1rem;
                    background: var(--cream);
                    border-radius: 30px;
                }
                .user-avatar i {
                    font-size: 1.2rem;
                    color: var(--primary-brown);
                }
                .user-name {
                    font-weight: 500;
                    color: var(--primary-dark);
                }
                .user-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    min-width: 200px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    display: none;
                    z-index: 100;
                    margin-top: 0.5rem;
                }
                .user-menu:hover .user-dropdown {
                    display: block;
                }
                .user-dropdown a {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 0.75rem 1rem;
                    color: var(--primary-dark);
                    text-decoration: none;
                    transition: background 0.3s;
                }
                .user-dropdown a:hover {
                    background: var(--cream);
                }
                .user-dropdown a i {
                    width: 20px;
                    color: var(--primary-brown);
                }
            `;
            
            document.head.appendChild(style);
            
            // Replace buttons with user menu
            container.innerHTML = '';
            container.appendChild(userMenu);
            
            // Add logout functionality
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });
            }
        });
    }
    
    logout() {
        // Clear session
        localStorage.removeItem('kahawa_session');
        sessionStorage.removeItem('kahawa_session');
        this.isLoggedIn = false;
        this.currentUser = null;
        
        // Reload page to reset UI
        window.location.reload();
    }
}

// Initialize auth when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});