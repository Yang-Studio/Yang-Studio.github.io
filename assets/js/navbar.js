// 处理导航栏的平滑滚动效果
document.addEventListener('DOMContentLoaded', () => {
    // 获取所有带有href属性的导航链接
    const navLinks = document.querySelectorAll('a[href^="#"]');

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
});