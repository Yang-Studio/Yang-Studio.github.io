// 核心功能模块
const Core = {
    init() {
        this.initNavigation();
        this.initScrollEffects();
        this.initLazyLoading();
        this.initAccessibility();
    },

    // 导航功能
    initNavigation() {
        const navbar = document.querySelector('.navbar');
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const navLinks = document.querySelector('.nav-links');

        // 滚动效果
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // 移动端菜单
        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuButton.setAttribute('aria-expanded', 
                    navLinks.classList.contains('active'));
            });
        }

        // 平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // 关闭移动端菜单
                    navLinks.classList.remove('active');
                }
            });
        });
    },

    // 滚动效果
    initScrollEffects() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 观察所有section元素
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        });

        // 观察所有带有animate-on-scroll类的元素
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    },

    // 图片懒加载
    initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // 回退方案
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }
    },

    // 可访问性增强
    initAccessibility() {
        // 键盘导航
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('using-keyboard');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        });

        // ARIA标签
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === window.location.pathname) {
                link.setAttribute('aria-current', 'page');
            }
        });
    }
};

// 错误处理
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};

// 处理技能节点的悬停效果
document.querySelectorAll('.skill-node[data-projects]').forEach(node => {
    node.addEventListener('mouseenter', function() {
        const projects = this.getAttribute('data-projects').split('|');
        const randomProject = projects[Math.floor(Math.random() * projects.length)];
        const [projectName, imagePath] = randomProject.split(':');
        
        // 设置项目图片
        this.style.setProperty('--project-image', `url('${imagePath}')`);
        
        // 设置项目名称
        this.setAttribute('data-project-name', projectName);
    });
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    Core.init();
});