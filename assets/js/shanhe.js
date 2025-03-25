// 监听滚动事件，添加导航栏背景切换
document.addEventListener('DOMContentLoaded', () => {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    const projectHeroSection = document.querySelector('.project-hero');
    
    const handleScroll = () => {
        if (projectHeroSection) {
            const heroBottom = projectHeroSection.offsetTop + projectHeroSection.offsetHeight;
            if (window.scrollY > heroBottom - navbar.offsetHeight) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        } else {
            // 如果没有找到project-hero，默认添加scrolled类
            navbar.classList.add('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化时执行一次
});