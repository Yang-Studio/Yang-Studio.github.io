// Feature Showcase System JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Get all feature tags and content sections
    const featureTags = document.querySelectorAll('.feature-tag');
    const featureContents = document.querySelectorAll('.feature-content');

    // Function to activate a specific feature tag and content
    const activateFeature = (index) => {
        // Remove active class from all tags and contents
        featureTags.forEach(tag => tag.classList.remove('active'));
        featureContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to selected tag and content
        if (featureTags[index]) {
            featureTags[index].classList.add('active');
        }
        if (featureContents[index]) {
            featureContents[index].classList.add('active');
        }

        // Save the active feature index to localStorage
        localStorage.setItem('activeFeature', index);
    };

    // Add click event listeners to all feature tags
    featureTags.forEach((tag, index) => {
        tag.addEventListener('click', () => {
            activateFeature(index);
        });
    });

    // Check if there's a saved active feature in localStorage
    const savedFeature = localStorage.getItem('activeFeature');
    
    // If there's a saved feature, activate it, otherwise activate the first feature
    if (savedFeature !== null && featureTags[savedFeature]) {
        activateFeature(parseInt(savedFeature));
    } else if (featureTags.length > 0) {
        activateFeature(0);
    }
});