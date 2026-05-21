/**
 * Resume Builder Logic
 */

let educationCount = 0;
let experienceCount = 0;
let skills = [];
let languages = [];
let currentTemplate = 'modern';
let quill; // Quill instance

// Initialize
let editingId = null;
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Quill
    quill = new Quill('#summary-editor', {
        theme: 'snow',
        placeholder: 'Write your professional summary...',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['clean']
            ]
        }
    });

    // Sync Quill with hidden input and update preview
    quill.on('text-change', () => {
        const summaryInput = document.getElementById('summaryInput');
        if (summaryInput) summaryInput.value = quill.root.innerHTML;
        updatePreview();
    });

    // Check for edit mode
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        loadResumeData(id);
    } else {
        addEducationField(); // Start with one
        addExperienceField(); // Start with one
        updatePreview();
    }

    // Auto update preview on input change
    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        resumeForm.addEventListener('input', () => {
            updatePreview();
        });
    }
});

function loadResumeData(id) {
    const resume = app.getResume(id);
    if (!resume) {
        Swal.fire('Error', 'Resume not found.', 'error').then(() => window.location.href = 'view-resumes.html');
        return;
    }

    editingId = id;

    // Populate simple fields
    const form = document.querySelector('#resumeForm');
    form.querySelector('[name="fullName"]').value = resume.fullName;
    form.querySelector('[name="email"]').value = resume.email;
    form.querySelector('[name="phone"]').value = resume.phone;
    form.querySelector('[name="address"]').value = resume.address;
    form.querySelector('[name="linkedin"]').value = resume.linkedin;

    // Set Quill content
    if (resume.summary) {
        quill.root.innerHTML = resume.summary;
        document.getElementById('summaryInput').value = resume.summary;
    }

    // Populate Arrays
    skills = resume.skills || [];
    renderTags('skillsContainer', skills, 'removeSkill');

    languages = resume.languages || [];
    renderTags('langContainer', languages, 'removeLang');

    // Clear existing dynamic fields before adding loaded ones
    document.getElementById('educationContainer').innerHTML = '';
    document.getElementById('experienceContainer').innerHTML = '';
    educationCount = 0;
    experienceCount = 0;

    // Populate Dynamic objects
    if (resume.education && resume.education.length > 0) {
        resume.education.forEach(edu => {
            addEducationField(edu); // Modify function to accept data
        });
    } else {
        addEducationField();
    }

    if (resume.experience && resume.experience.length > 0) {
        resume.experience.forEach(exp => {
            addExperienceField(exp); // Modify function to accept data
        });
    } else {
        addExperienceField();
    }

    // Template
    if (resume.template) {
        const el = document.querySelector(`.template-card[onclick*="'${resume.template}'"]`);
        if (el) selectTemplate(resume.template, el);
    } else {
        updatePreview();
    }
}

// Dynamic Fields - Education (Modified to accept data)
function addEducationField(data = null) {
    educationCount++;
    const container = document.getElementById('educationContainer');
    const html = `
        <div class="card mb-2 border-light bg-light" id="edu-${educationCount}">
            <div class="card-body p-3">
                <div class="d-flex justify-content-end mb-2">
                    <button type="button" class="btn-close btn-sm" onclick="removeElement('edu-${educationCount}')"></button>
                </div>
                <div class="row g-2">
                    <div class="col-md-6">
                        <input type="text" class="form-control form-control-sm edu-degree" placeholder="Degree/Certificate" value="${data ? data.degree : ''}" oninput="updatePreview()">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control form-control-sm edu-school" placeholder="School/University" value="${data ? data.school : ''}" oninput="updatePreview()">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control form-control-sm edu-date" placeholder="Graduation Year" value="${data ? data.gradDate : ''}" oninput="updatePreview()">
                    </div>
                    <div class="col-12">
                        <textarea class="form-control form-control-sm edu-desc" placeholder="Description (Optional)" rows="2" oninput="updatePreview()">${data ? data.description : ''}</textarea>
                    </div>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
    // Only update preview if we are NOT in the middle of bulk loading (handled by loadResumeData calling updatePreview at end if needed, but here we call it for single adds)
    if (!editingId || data === null) updatePreview();
    else updatePreview(); // Update anyway needed for bulk load to render correctly
}

// Dynamic Fields - Experience (Modified to accept data)
function addExperienceField(data = null) {
    experienceCount++;
    const container = document.getElementById('experienceContainer');
    const html = `
        <div class="card mb-2 border-light bg-light" id="exp-${experienceCount}">
            <div class="card-body p-3">
                <div class="d-flex justify-content-end mb-2">
                    <button type="button" class="btn-close btn-sm" onclick="removeElement('exp-${experienceCount}')"></button>
                </div>
                <div class="row g-2">
                    <div class="col-md-6">
                        <input type="text" class="form-control form-control-sm exp-title" placeholder="Job Title" value="${data ? data.title : ''}" oninput="updatePreview()">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control form-control-sm exp-company" placeholder="Company" value="${data ? data.company : ''}" oninput="updatePreview()">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control form-control-sm exp-start" placeholder="Start Date" value="${data ? data.startDate : ''}" oninput="updatePreview()">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control form-control-sm exp-end" placeholder="End Date" value="${data ? data.endDate : ''}" oninput="updatePreview()">
                    </div>
                    <div class="col-12">
                        <textarea class="form-control form-control-sm exp-desc" placeholder="Job Description" rows="2" oninput="updatePreview()">${data ? data.description : ''}</textarea>
                    </div>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
    if (!editingId || data === null) updatePreview();
    else updatePreview();
}

function removeElement(id) {
    document.getElementById(id).remove();
    updatePreview();
}

// Skills handling
function addSkill() {
    const input = document.getElementById('skillInput');
    const val = input.value.trim();
    if (val) {
        skills.push(val);
        input.value = '';
        renderTags('skillsContainer', skills, 'removeSkill');
        updatePreview();
    }
}

function removeSkill(index) {
    skills.splice(index, 1);
    renderTags('skillsContainer', skills, 'removeSkill');
    updatePreview();
}

// Languages handling
function addLang() {
    const input = document.getElementById('langInput');
    const val = input.value.trim();
    if (val) {
        languages.push(val);
        input.value = '';
        renderTags('langContainer', languages, 'removeLang');
        updatePreview();
    }
}

function removeLang(index) {
    languages.splice(index, 1);
    renderTags('langContainer', languages, 'removeLang');
    updatePreview();
}

function renderTags(containerId, array, removeFunction) {
    const container = document.getElementById(containerId);
    container.innerHTML = array.map((item, index) => `
        <span class="badge text-white p-2" style="background-color: #0C7D74">
            ${item} <i class="fas fa-times ms-1 pointer" onclick="${removeFunction}(${index})" style="cursor:pointer"></i>
        </span>
    `).join('');
}

// Template Selection
function selectTemplate(name, el) {
    currentTemplate = name;
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    updatePreview();
}

// Data Collection
function getFormData() {
    const form = document.querySelector('#resumeForm');
    const formData = new FormData(form);

    // Collect specific arrays
    const eduList = [];
    document.querySelectorAll('#educationContainer .card').forEach(card => {
        eduList.push({
            degree: card.querySelector('.edu-degree').value,
            school: card.querySelector('.edu-school').value,
            gradDate: card.querySelector('.edu-date').value,
            description: card.querySelector('.edu-desc').value
        });
    });

    const expList = [];
    document.querySelectorAll('#experienceContainer .card').forEach(card => {
        expList.push({
            title: card.querySelector('.exp-title').value,
            company: card.querySelector('.exp-company').value,
            startDate: card.querySelector('.exp-start').value,
            endDate: card.querySelector('.exp-end').value,
            description: card.querySelector('.exp-desc').value
        });
    });

    return {
        fullName: formData.get('fullName') || 'Your Name',
        email: formData.get('email') || 'email@example.com',
        phone: formData.get('phone') || '+1 234 567 8900',
        address: formData.get('address') || 'City, Country',
        linkedin: formData.get('linkedin') || '',
        summary: quill.root.innerHTML || 'Professional summary goes here...',
        skills: skills,
        languages: languages,
        education: eduList,
        experience: expList,
        template: currentTemplate
    };
}

// Render Preview
function updatePreview() {
    const data = getFormData();
    const html = TemplateUtils.render(currentTemplate, data);
    document.getElementById('resumePreview').innerHTML = html;
}

// Save Resume
function saveResume() {
    const data = getFormData();
    // Validate basics
    if (data.fullName === 'Your Name') {
        Swal.fire('Error', 'Please fill in your name.', 'error');
        return;
    }

    try {
        let success = false;

        if (editingId) {
            success = app.updateResume(editingId, data);
        } else {
            const id = app.saveResume(data);
            success = !!id;
        }

        if (success) {
            Swal.fire({
                title: 'Success!',
                text: 'Resume saved successfully.',
                icon: 'success',
                confirmButtonText: 'View My Resumes'
            }).then(() => {
                window.location.href = 'view-resumes.html';
            });
        } else {
            Swal.fire('Error', 'Could not save resume.', 'error');
        }
    } catch (e) {
        console.error(e);
        Swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
}
