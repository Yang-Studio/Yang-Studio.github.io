document.addEventListener('DOMContentLoaded', function() {
    // 创建查看器overlay
    const overlay = document.createElement('div');
    overlay.className = 'media-viewer-overlay';
    overlay.innerHTML = `
        <div class="media-viewer-content">
            <button class="close-viewer">&times;</button>
            <div class="viewer-container"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    const viewerContainer = overlay.querySelector('.viewer-container');
    const closeButton = overlay.querySelector('.close-viewer');

    // 关闭查看器
    function closeViewer() {
        overlay.classList.remove('active');
        viewerContainer.innerHTML = '';
    }

    // 点击overlay背景关闭
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeViewer();
        }
    });

    // 点击关闭按钮
    closeButton.addEventListener('click', closeViewer);

    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeViewer();
        }
    });

    // 处理所有媒体项
    document.querySelectorAll('.media-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const iframe = this.querySelector('iframe');
            
            if (img) {
                // 处理图片
                viewerContainer.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
            } else if (iframe) {
                // 处理视频
                const videoSrc = iframe.src;
                // 移除controls=0和pointer-events: none
                const enhancedVideoSrc = videoSrc
                    .replace('controls=0', 'controls=1')
                    .replace('&disablekb=1', '');
                viewerContainer.innerHTML = `<iframe src="${enhancedVideoSrc}" frameborder="0" allowfullscreen></iframe>`;
            }
            
            overlay.classList.add('active');
        });
    });
}); 