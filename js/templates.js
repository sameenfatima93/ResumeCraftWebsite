/**
 * Templates.js - Stores resume templates and rendering logic
 */

const Templates = {
    // Template 1: Modern
    modern: (data) => `
        <div class="resume-template modern p-4 bg-white shadow-sm" id="print-area">
            <style>
                .resume-template.modern { font-family: 'Poppins', sans-serif; color: #333; }
                .modern .header { background: #0C7D74; color: white; padding: 2rem; border-radius: 10px; text-align: center; }
                .modern h1 { margin: 0; font-size: 2.5rem; font-weight: 700; }
                .modern .contact-info { margin-top: 1rem; font-size: 0.9rem; }
                .modern .section-title { color: #0C7D74; border-bottom: 2px solid #0C7D74; padding-bottom: 0.5rem; margin: 1.5rem 0 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
                .modern .job-title { font-weight: 600; font-size: 1.1rem; }
                .modern .company-date { font-style: italic; color: #666; font-size: 0.9rem; margin-bottom: 0.5rem; }
                .modern .skill-tag { display: inline-block; background: #f0f2f5; padding: 5px 10px; border-radius: 5px; margin: 3px; font-size: 0.9rem; }
            </style>
            <div class="header">
                <h1>${data.fullName}</h1>
                <div class="contact-info">
                    ${data.email} | ${data.phone} | ${data.address}
                    ${data.linkedin ? ` | ${data.linkedin}` : ''}
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-md-12">
                     <p class="lead">${data.summary}</p>
                </div>
            </div>

            <div class="row">
                <div class="col-md-8">
                    ${data.experience.length > 0 ? `<h3 class="section-title">Experience</h3>` : ''}
                    ${data.experience.map(job => `
                        <div class="mb-3">
                            <div class="job-title">${job.title}</div>
                            <div class="company-date">${job.company} | ${job.startDate} - ${job.endDate}</div>
                            <p>${job.description}</p>
                        </div>
                    `).join('')}

                    ${data.education.length > 0 ? `<h3 class="section-title">Education</h3>` : ''}
                    ${data.education.map(edu => `
                        <div class="mb-3">
                            <div class="job-title">${edu.degree}</div>
                            <div class="company-date">${edu.school} | ${edu.gradDate}</div>
                            <p>${edu.description}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div class="col-md-4">
                    ${data.skills.length > 0 ? `<h3 class="section-title">Skills</h3>` : ''}
                    <div class="d-flex flex-wrap">
                        ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>

                    ${data.languages.length > 0 ? `<h3 class="section-title">Languages</h3> <ul class="list-unstyled">` : ''}
                    ${data.languages.map(lang => `<li>${lang}</li>`).join('')}
                    ${data.languages.length > 0 ? `</ul>` : ''}
                </div>
            </div>
        </div>
    `,

    // Template 2: Simple/Classic
    simple: (data) => `
        <div class="resume-template simple p-5 bg-white shadow-sm" id="print-area">
             <style>
                .resume-template.simple { font-family: 'Times New Roman', serif; color: #000; line-height: 1.6; }
                .simple h1 { font-size: 2.2rem; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
                .simple .contact-info { margin-bottom: 20px; font-size: 1rem; }
                .simple .section-title { font-weight: bold; font-size: 1.2rem; margin-top: 20px; margin-bottom: 10px; text-decoration: underline; }
                .simple .item-header { font-weight: bold; }
                .simple .date { float: right; }
            </style>
            <h1>${data.fullName}</h1>
            <div class="contact-info">
                ${data.address}<br>
                ${data.email} | ${data.phone}<br>
                ${data.linkedin ? `${data.linkedin}` : ''}
            </div>

            <div class="section-title">PROFESSIONAL SUMMARY</div>
            <p>${data.summary}</p>

            ${data.experience.length > 0 ? `<div class="section-title">EXPERIENCE</div>` : ''}
            ${data.experience.map(job => `
                <div class="mb-3">
                    <div class="item-header">${job.title}, ${job.company} <span class="date">${job.startDate} - ${job.endDate}</span></div>
                    <p>${job.description}</p>
                </div>
            `).join('')}

            ${data.education.length > 0 ? `<div class="section-title">EDUCATION</div>` : ''}
            ${data.education.map(edu => `
                <div class="mb-3">
                    <div class="item-header">${edu.degree}, ${edu.school} <span class="date">${edu.gradDate}</span></div>
                    <div class="text-muted">${edu.description}</div>
                </div>
            `).join('')}

            <div class="row">
                 <div class="col-md-6">
                    ${data.skills.length > 0 ? `<div class="section-title">SKILLS</div>` : ''}
                    <ul>
                        ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                 </div>
                 <div class="col-md-6">
                    ${data.languages.length > 0 ? `<div class="section-title">LANGUAGES</div>` : ''}
                     <ul>
                        ${data.languages.map(lang => `<li>${lang}</li>`).join('')}
                    </ul>
                 </div>
            </div>
        </div>
    `,

    // Template 3: Creative (Dark Sidebar)
    creative: (data) => `
        <div class="resume-template creative bg-white shadow-sm" id="print-area">
             <style>
                .resume-template.creative { display: flex; font-family: 'Open Sans', sans-serif; min-height: 1000px; }
                .creative .sidebar { width: 35%; background: #2c3e50; color: white; padding: 2rem; text-align: left; }
                .creative .main-content { width: 65%; padding: 2rem; color: #34495e; }
                .creative .name { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; color: white; }
                .creative .contact-item { margin-bottom: 0.5rem; font-size: 0.85rem; }
                .creative .section-title { font-size: 1.2rem; font-weight: 700; text-transform: uppercase; margin-bottom: 1rem; border-bottom: 2px solid #34495e; padding-bottom: 0.2rem; }
                .creative .sidebar .section-title { border-color: white; color: #ecf0f1; margin-top: 2rem; }
                .creative .job-item, .creative .edu-item { margin-bottom: 1.5rem; }
                .creative .item-title { font-weight: 700; font-size: 1.05rem; }
                .creative .item-subtitle { font-style: italic; color: #7f8c8d; font-size: 0.9rem; }
                .creative .skill-item { background: rgba(255,255,255,0.1); padding: 5px; margin-bottom: 5px; display: block; border-radius: 4px; }
            </style>
            
            <div class="sidebar">
                <div class="name">${data.fullName}</div>
                <div class="contact-info mt-4">
                    <div class="contact-item"><i class="fas fa-envelope"></i> ${data.email}</div>
                    <div class="contact-item"><i class="fas fa-phone"></i> ${data.phone}</div>
                    <div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${data.address}</div>
                    ${data.linkedin ? `<div class="contact-item"><i class="fab fa-linkedin"></i> ${data.linkedin}</div>` : ''}
                </div>

                ${data.skills.length > 0 ? `<div class="section-title">Skills</div>` : ''}
                ${data.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}

                ${data.languages.length > 0 ? `<div class="section-title">Languages</div>` : ''}
                 ${data.languages.map(lang => `<div class="contact-item">${lang}</div>`).join('')}
            </div>

            <div class="main-content">
                <div class="section-title">Profile</div>
                <p>${data.summary}</p>

                ${data.experience.length > 0 ? `<div class="section-title">Experience</div>` : ''}
                 ${data.experience.map(job => `
                    <div class="job-item">
                        <div class="item-title">${job.title}</div>
                        <div class="item-subtitle">${job.company} | ${job.startDate} - ${job.endDate}</div>
                        <p class="mt-2">${job.description}</p>
                    </div>
                `).join('')}

                ${data.education.length > 0 ? `<div class="section-title">Education</div>` : ''}
                 ${data.education.map(edu => `
                    <div class="edu-item">
                        <div class="item-title">${edu.degree}</div>
                        <div class="item-subtitle">${edu.school} | ${edu.gradDate}</div>
                        <div class="mt-1">${edu.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `,

    // Template 4: Elegant
    elegant: (data) => `
        <div class="resume-template elegant p-5 bg-white shadow-sm" id="print-area">
            <style>
                .resume-template.elegant { font-family: 'Playfair Display', serif; color: #444; }
                .elegant .header { text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 2rem; margin-bottom: 2rem; }
                .elegant h1 { font-family: 'Montserrat', sans-serif; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; font-size: 2.5rem; }
                .elegant .contact { font-family: 'Montserrat', sans-serif; font-size: 0.8rem; letter-spacing: 1px; color: #888; margin-top: 1rem; }
                .elegant .section-title { font-family: 'Montserrat', sans-serif; font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #222; margin-top: 2rem; margin-bottom: 1rem; }
                .elegant .job-header { display: flex; justify-content: space-between; align-items: baseline; }
                .elegant .job-title { font-weight: 700; font-size: 1.1rem; }
                .elegant .job-company { font-style: italic; color: #666; }
                .elegant .job-date { font-family: 'Montserrat', sans-serif; font-size: 0.8rem; color: #888; }
            </style>
            <div class="header">
                <h1>${data.fullName}</h1>
                <div class="contact">
                    ${data.email} &bull; ${data.phone} &bull; ${data.address}
                </div>
            </div>

            <div class="section-title">About Me</div>
            <p>${data.summary}</p>

            <div class="row">
                <div class="col-8">
                     ${data.experience.length > 0 ? `<div class="section-title">Experience</div>` : ''}
                     ${data.experience.map(job => `
                        <div class="mb-4">
                            <div class="job-header">
                                <span class="job-title">${job.title}</span>
                                <span class="job-date">${job.startDate} - ${job.endDate}</span>
                            </div>
                            <div class="job-company mb-2">${job.company}</div>
                            <p>${job.description}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="col-4">
                     ${data.education.length > 0 ? `<div class="section-title">Education</div>` : ''}
                     ${data.education.map(edu => `
                        <div class="mb-3">
                            <div class="fw-bold">${edu.degree}</div>
                            <div class="text-muted small">${edu.school}</div>
                            <div class="text-muted small">${edu.gradDate}</div>
                        </div>
                    `).join('')}

                     ${data.skills.length > 0 ? `<div class="section-title">Skills</div>` : ''}
                     <ul class="list-unstyled">
                        ${data.skills.map(skill => `<li class="mb-1">${skill}</li>`).join('')}
                     </ul>
                </div>
            </div>
        </div>
    `
};

const TemplateUtils = {
    render: (templateName, data) => {
        if (Templates[templateName]) {
            return Templates[templateName](data);
        }
        return Templates.modern(data); // Default
    }
};
