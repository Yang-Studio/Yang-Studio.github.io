document.addEventListener('DOMContentLoaded', () => {
    // 初始化加载动画
    initLoadingScreen();
    
    // 初始化作品集
    initPortfolio();
    
    // 初始化技能树
    initSkillTree();
    initSkillsAnimation();
    
    // 初始化表单处理
    initContactForm();
    
    // 初始化弹窗功能
    initProjectPopup();
});

// 加载屏幕控制
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // 模拟加载过程
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// 作品集初始化
function initPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    // 作品数据
    const projects = [
        {
            title: 'ShanHe',
            description: 'A Wuxia-style RPG game',
            image: 'https://dl.dropboxusercontent.com/scl/fi/qmii6yali9qm5y2828xjq/ShanHe.png?rlkey=lrjdol1itcrkpfwav62wr1v7p&st=kpi3hoag',
            link: './ShanHe.html'
        },
        {
            title: 'Auk Odessey',
            description: 'Genetically engineered penguins escape with their lives',
            image: 'https://dl.dropboxusercontent.com/scl/fi/zp3cfnvdkgjaenza2kozk/356.png?rlkey=x03q5htcfbv6stu4hq0mz3i4w&st=r9hiyvog&dl=',
            link: './Coming Soon.html'
        },
        {
            title: 'Bio-lab',
            description: 'The dilapidated genetic modification lab.',
            image: 'https://dl.dropboxusercontent.com/scl/fi/kb7z69g0a4iitu7rzoud0/336.png?rlkey=mk6mvh59hhpxhg46vqe9dbz0j&st=f8mi7a3a',
            link: './Coming Soon.html'
        },
        // 可以添加更多项目
    ];
    
    // 生成作品卡片
    projects.forEach(project => {
        const card = createProjectCard(project);
        portfolioGrid.appendChild(card);
    });
}

// 创建项目卡片
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
            </div>
            <div class="card-back">
                <p>${project.description}</p>
                <a href="${project.link}" class="btn btn-primary">Details</a>
            </div>
        </div>
    `;
    
    return card;
}

// 技能树初始化
function initSkillTree() {
    const skillTree = document.querySelector('.skill-tree');
    if (!skillTree) return;
    
    const skills = [
        {
            category: 'Game Design',
            skills: [
                { name: 'Mechanics', level: 70 },
                { name: 'Aesthetics', level: 60 },
                { name: 'Dynamic', level: 80 }
            ]
        },
        {
            category: 'Technical Skills',
            skills: [
                { name: 'C++', level: 50 },
                { name: 'Unreal', level: 90 },
                { name: 'Python', level: 60 }
            ]
        },
        {
            category: 'Software',
            skills: [
                { name: 'Photoshop', level: 85 },
                { name: 'Illustrator', level: 90 },
                { name: 'After Effect', level: 30 },
                { name: 'Substance 3D Painter', level: 30 },
                { name: 'Autodesk Maya', level: 85 },
                { name: 'Blender', level: 60 },
                { name: 'Figma', level: 90 }
            ]
        }
    ];
    
    // 清空现有内容
    skillTree.innerHTML = '';
    
    // 生成技能树
    skills.forEach(category => {
        const section = createSkillSection(category);
        skillTree.appendChild(section);
    });
}

// 创建技能分类区块
function createSkillSection(category) {
    const section = document.createElement('div');
    section.className = 'skill-category';
    
    // 添加分类标题
    section.innerHTML = `<h3>${category.category}</h3>`;
    
    // 添加该分类下的所有技能
    category.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <div class="skill-header">
                <div class="skill-name">${skill.name}</div>
                <div class="skill-percentage">${skill.level}%</div>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" data-progress="${skill.level}" style="width: 0%"></div>
            </div>
        `;
        section.appendChild(skillItem);
    });
    
    return section;
}

// 技能条动画
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.dataset.progress + '%';
                progressBar.style.width = targetWidth;
            }
        });
    }, {
        threshold: 0.2
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 添加页面加载进度指示
function initPageLoadProgress() {
    const progress = document.createElement('div');
    progress.className = 'page-load-progress';
    document.body.appendChild(progress);

    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progress.style.opacity = '0';
                setTimeout(() => progress.remove(), 300);
            }, 500);
        } else {
            width++;
            progress.style.width = width + '%';
        }
    }, 10);
}

// 图片懒加载优化
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}