/**
 * Theme.js - Handles dark mode toggle and persistence
 */

const themeManager = {
    init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        this.addToggleListeners();
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update any toggle buttons icon
        const toggles = document.querySelectorAll('.theme-toggle i');
        toggles.forEach(icon => {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });

        // Update checkbox switches
        const checkboxes = document.querySelectorAll('.theme-switch input');
        checkboxes.forEach(cb => {
            cb.checked = (theme === 'dark');
        });
    },

    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },

    addToggleListeners() {
        // Since we may add toggles dynamically or they might be on different pages
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                this.toggle();
            }
        });

        // Handle the new theme switch toggle
        document.addEventListener('change', (e) => {
            if (e.target.closest('.theme-switch') && e.target.matches('input')) {
                const theme = e.target.checked ? 'dark' : 'light';
                this.setTheme(theme);
            }
        });
    }
};

// Initialize early to avoid flash of light mode
themeManager.init();
