
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var sections = ['HOME', 'ABOUT', 'PORTFOLIO'];
    var navbar = document.getElementById('sideDotNavbar');

    sections.forEach(function(sectionId) {
        var dot = document.createElement('a');
        dot.href = '#' + sectionId;
        dot.className = 'dot';
        dot.dataset.tooltip = sectionId; 
        navbar.appendChild(dot);

        dot.addEventListener('mouseover', function() {
            var tooltip = document.createElement('div');
            tooltip.className = 'dot-tooltip';
            tooltip.textContent = this.dataset.tooltip; 
            tooltip.style.position = 'absolute';
            tooltip.style.alignSelf = 'center';
            tooltip.style.left = '150%'; 
            tooltip.style.fontWeight = 'bold';
            tooltip.style.color = '#fff';
            tooltip.style.fontSize = 'calc(0.7vw + 0.7vh)';
            this.appendChild(tooltip); 
        });

        dot.addEventListener('mouseout', function() {
            var tooltip = this.querySelector('.dot-tooltip');
            if (tooltip) {
                tooltip.remove(); 
            }
        });
    });
});

document.getElementById('sideDotNavbar').addEventListener('click', function(event) {
    var target = event.target;
    if (target.className === 'dot') {
        event.preventDefault();
        var sectionId = target.getAttribute('href').substring(1);
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }
});

function addTextShadow() {
    var text = document.getElementById('text');
    text.style.textShadow = '5px 5px 5px #fff';
  }
  
  window.onload = addTextShadow;