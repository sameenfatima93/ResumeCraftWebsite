/**
 * View Resumes Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    loadResumes();
});

function loadResumes() {
    const resumes = app.getUserResumes();
    const container = document.getElementById('resumesGrid');
    const noMsg = document.getElementById('noResumesMsg');

    container.innerHTML = '';

    if (resumes.length === 0) {
        noMsg.classList.remove('d-none');
        return;
    }

    noMsg.classList.add('d-none');

    resumes.forEach(resume => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';
        card.innerHTML = `
            <div class="card h-100 shadow-sm border-0 resume-item-card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <h5 class="card-title fw-bold text-truncate">${resume.fullName || 'Untitled'}</h5>
                        <span class="badge bg-primary rounded-pill">${resume.template || 'Modern'}</span>
                    </div>
                    <p class="card-text text-muted small">
                        <i class="far fa-clock me-1"></i> Created: ${new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                    <p class="card-text text-truncate small">${resume.summary || 'No summary provided.'}</p>
                </div>
                <div class="card-footer bg-white border-top-0 d-flex justify-content-between pb-3">
                    <button class="btn btn-outline-primary btn-sm" onclick="editResume('${resume.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <div>
                         <button class="btn btn-info btn-sm text-white me-1" onclick="previewResume('${resume.id}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteResume('${resume.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function editResume(id) {
    window.location.href = `create-resume.html?id=${id}`;
}

function previewResume(id) {
    window.location.href = `preview.html?id=${id}`;
}

function deleteResume(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            if (app.deleteResume(id)) {
                Swal.fire(
                    'Deleted!',
                    'Your resume has been deleted.',
                    'success'
                );
                loadResumes();
            } else {
                Swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                );
            }
        }
    })
}
