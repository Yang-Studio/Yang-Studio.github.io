// 移动端导航栏的展开/收起功能
document.addEventListener('DOMContentLoaded', () => {
    // 创建汉堡菜单按钮
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    let isMobile = window.innerWidth <= 768; // 判断是否为移动设备
    
    // 创建移动端导航菜单的函数
    function createMobileNav() {
        if (!document.querySelector('.menu-toggle') && window.innerWidth <= 768) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.setAttribute('aria-label', '切换导航菜单');
            menuToggle.innerHTML = '<span class="hamburger"></span>';
            navContainer.prepend(menuToggle);
            
            // 将导航链接和控制包装在一个nav-menu div中
            const navLinks = document.querySelector('.nav-links');
            const navControls = document.querySelector('.nav-controls');
            
            if (navLinks && navControls && !document.querySelector('.nav-menu')) {
                const navMenu = document.createElement('div');
                navMenu.className = 'nav-menu';
                navMenu.appendChild(navLinks.cloneNode(true));
                navMenu.appendChild(navControls.cloneNode(true));
                
                // 移除原始元素
                navLinks.remove();
                navControls.remove();
                
                // 添加新的导航菜单
                navContainer.appendChild(navMenu);
                
                // 添加点击事件
                menuToggle.addEventListener('click', () => {
                    menuToggle.classList.toggle('active');
                    navMenu.classList.toggle('active');
                    document.body.classList.toggle('menu-open');
                });
                
                // 点击导航链接时关闭菜单
                const menuLinks = navMenu.querySelectorAll('a');
                menuLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        menuToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    });
                });
            }
        }
    }
    
    // 初始化时创建移动端导航
    createMobileNav();
    
    // 窗口大小变化时处理导航栏
    window.addEventListener('resize', () => {
        const currentIsMobile = window.innerWidth <= 768;
        
        // 如果从桌面端切换到移动端，创建移动导航
        if (!isMobile && currentIsMobile) {
            createMobileNav();
        }
        
        // 如果从移动端切换到桌面端，刷新页面以恢复正常布局
        if (isMobile && !currentIsMobile) {
            location.reload();
        }
        
        // 更新当前状态
        isMobile = currentIsMobile;
    });
});