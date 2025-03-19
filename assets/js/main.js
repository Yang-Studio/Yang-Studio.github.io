// 监听滚动事件，添加section的显示动画和导航栏背景切换
document.addEventListener('DOMContentLoaded', () => {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    
    const handleScroll = () => {
        if (heroSection) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (window.scrollY > heroBottom - navbar.offsetHeight) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化时执行一次
    const sections = document.querySelectorAll('.section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // 平滑滚动功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});