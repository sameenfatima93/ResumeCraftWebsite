/**
 * App.js - Main Application Logic
 */

class App {
    constructor() {
        this.resumes = JSON.parse(localStorage.getItem('resumes')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    }

    /**
     * Get resumes for the current logged in user
     */
    getUserResumes() {
        if (!this.currentUser) return [];
        return this.resumes.filter(resume => resume.userId === this.currentUser.id);
    }

    /**
     * Save a new resume
     * @param {object} resumeData 
     */
    saveResume(resumeData) {
        if (!this.currentUser) return false;

        const newResume = {
            id: Date.now().toString(),
            userId: this.currentUser.id,
            createdAt: new Date().toISOString(),
            ...resumeData
        };

        this.resumes.push(newResume);
        this.updateLocalStorage();
        return newResume.id;
    }

    /**
     * Update an existing resume
     * @param {string} id 
     * @param {object} updatedData 
     */
    updateResume(id, updatedData) {
        const index = this.resumes.findIndex(r => r.id === id && r.userId === this.currentUser.id);
        if (index !== -1) {
            this.resumes[index] = { ...this.resumes[index], ...updatedData, updatedAt: new Date().toISOString() };
            this.updateLocalStorage();
            return true;
        }
        return false;
    }

    /**
     * Delete a resume
     * @param {string} id 
     */
    deleteResume(id) {
        const initialLength = this.resumes.length;
        this.resumes = this.resumes.filter(r => r.id !== id);

        if (this.resumes.length !== initialLength) {
            this.updateLocalStorage();
            return true;
        }
        return false;
    }

    /**
     * Get a specific resume by ID
     * @param {string} id 
     */
    getResume(id) {
        return this.resumes.find(r => r.id === id);
    }

    updateLocalStorage() {
        localStorage.setItem('resumes', JSON.stringify(this.resumes));
    }
}

const app = new App();
