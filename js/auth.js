/**
 * Auth.js - Handles all authentication related logic
 */

class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
    }

    /**
     * Register a new user
     * @param {string} fullName 
     * @param {string} email 
     * @param {string} password 
     * @param {string} profileImage 
     * @returns {object} result - { success: boolean, message: string }
     */
    register(fullName, email, password, profileImage = null) {
        if (!fullName || !email || !password) {
            return { success: false, message: 'All fields are required.' };
        }

        if (this.users.find(user => user.email === email)) {
            return { success: false, message: 'Email already registered.' };
        }

        const newUser = {
            id: Date.now().toString(),
            fullName,
            email,
            password,
            profileImage, // Base64 string or null
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsers();
        return { success: true, message: 'Registration successful! You can now login.' };
    }

    /**
     * Login a user
     * @param {string} email 
     * @param {string} password 
     * @returns {object} result - { success: boolean, message: string }
     */
    login(email, password) {
        if (!email || !password) {
            return { success: false, message: 'Please enter both email and password.' };
        }

        const user = this.users.find(u => u.email === email && u.password === password);

        if (user) {
            this.loggedInUser = user;
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            return { success: true, message: 'Login successful!' };
        } else {
            return { success: false, message: 'Invalid email or password.' };
        }
    }

    /**
     * Logout the current user
     */
    logout() {
        this.loggedInUser = null;
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    }

    /**
     * Check if user is authenticated
     */
    checkAuth() {
        if (!this.loggedInUser) {
            window.location.href = 'login.html';
        }
    }
    
    /**
     * Redirect if already logged in (for login/signup pages)
     */
    redirectIfLoggedIn() {
        if (this.loggedInUser) {
            window.location.href = 'dashboard.html';
        }
    }

    /**
     * Save users to Local Storage
     */
    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }
    
    /**
     * Get current user
     */
    getCurrentUser() {
        return this.loggedInUser;
    }
}

const auth = new Auth();
