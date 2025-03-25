// 处理导航栏的平滑滚动效果和滚动监听
document.addEventListener('DOMContentLoaded', () => {
    // 获取所有带有href属性的导航链接
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section, .hero');

    // 为每个导航链接添加点击事件监听器
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // 使用scrollIntoView进行平滑滚动
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center' // 确保目标section在屏幕中央
                });

                // 更新导航栏active状态
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // 添加滚动监听，根据当前可见的section更新导航栏active状态
    function highlightNavOnScroll() {
        let currentSection = '';
        let maxVisibility = 0;
        
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            if (!sectionId) return;
            
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // 计算section在视口中可见的比例
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visibleRatio = visibleHeight / section.offsetHeight;
            
            // 如果当前section的可见比例大于之前记录的最大可见比例，则更新currentSection
            if (visibleRatio > maxVisibility && visibleRatio > 0.2) { // 至少20%可见才考虑
                maxVisibility = visibleRatio;
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // 页面加载时执行一次，确保初始状态正确
    highlightNavOnScroll();
});