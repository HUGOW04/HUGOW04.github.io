document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const paginationContainer = document.querySelector('.pagination');

    const projectsPerPage = 8;
    let currentPage = 1;
    let filteredProjects = Array.from(projectCards);

    function displayProjects(page, projects) {
        const startIndex = (page - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;

        projectCards.forEach(card => card.style.display = 'none');

        const projectsToDisplay = projects.slice(startIndex, endIndex);
        projectsToDisplay.forEach(card => card.style.display = 'block');
    }

    function setupPagination(projects) {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(projects.length / projectsPerPage);

        if (pageCount > 1) {
            for (let i = 1; i <= pageCount; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.classList.add('page-btn');
                if (i === currentPage) {
                    button.classList.add('active');
                }
                button.addEventListener('click', () => {
                    currentPage = i;
                    document.querySelector('.page-btn.active').classList.remove('active');
                    button.classList.add('active');
                    displayProjects(currentPage, filteredProjects);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                paginationContainer.appendChild(button);
            }
        }
    }

    function filterAndDisplayProjects(category) {
        if (category === 'All Projects') {
            filteredProjects = Array.from(projectCards);
        } else {
            filteredProjects = Array.from(projectCards).filter(card =>
                card.dataset.category.split(' ').includes(category)
            );
        }
        currentPage = 1;
        displayProjects(currentPage, filteredProjects);
        setupPagination(filteredProjects);
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.textContent.trim();
            filterAndDisplayProjects(category);
        });
    });

    // Initial load
    filterAndDisplayProjects('All Projects');
});