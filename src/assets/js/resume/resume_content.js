document.addEventListener('DOMContentLoaded', function() {
    const jobTitles = document.querySelectorAll('.job-title');
    jobTitles.forEach(jobTitle => {
        jobTitle.addEventListener('click', function(event) {
            event.stopPropagation();  

            const detailId = this.getAttribute('data-detail-id');
            const details = document.getElementById(detailId);
            details.style.display = (details.style.display === 'none' || details.style.display === '') ? 'block' : 'none';

            this.classList.add('active');
        });
    });

    const subDetails = document.querySelectorAll('.sub-detail');
    subDetails.forEach(subDetail => {
        subDetail.addEventListener('click', function(event) {
            event.stopPropagation();  

            const contentElement = this.nextElementSibling;
            if (contentElement && contentElement.style.display === 'none') {
                contentElement.style.display = 'block'; 
            } else if (contentElement) {
                contentElement.style.display = 'none';  
            }
        });
    });
});
