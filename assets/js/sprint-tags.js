// Sprint Tags System JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Get all sprint tags and content sections
    const sprintTags = document.querySelectorAll('.sprint-tag');
    const sprintContents = document.querySelectorAll('.sprint-content');

    // Function to activate a specific sprint tag and content
    const activateSprint = (index) => {
        // Remove active class from all tags and contents
        sprintTags.forEach(tag => tag.classList.remove('active'));
        sprintContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to selected tag and content
        if (sprintTags[index]) {
            sprintTags[index].classList.add('active');
        }
        if (sprintContents[index]) {
            sprintContents[index].classList.add('active');
        }

        // Save the active sprint index to localStorage
        localStorage.setItem('activeSprint', index);
    };

    // Add click event listeners to all sprint tags
    sprintTags.forEach((tag, index) => {
        tag.addEventListener('click', () => {
            activateSprint(index);
        });
    });

    // Check if there's a saved active sprint in localStorage
    const savedSprint = localStorage.getItem('activeSprint');
    
    // If there's a saved sprint, activate it, otherwise activate the first sprint
    if (savedSprint !== null && sprintTags[savedSprint]) {
        activateSprint(parseInt(savedSprint));
    } else if (sprintTags.length > 0) {
        activateSprint(0);
    }
});