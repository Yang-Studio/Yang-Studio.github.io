document.addEventListener('DOMContentLoaded', function() {
    // 相册数据
    const albums = {
        nature: [
            './assets/photo/Photo/Nature/1.jpg',
            './assets/photo/Photo/Nature/2.jpg',
            './assets/photo/Photo/Nature/3.jpg',
            // 添加更多图片
        ],
        urban: [
            './assets/photo/Photo/Urban/1.jpg',
            './assets/photo/Photo/Urban/2.jpg',
            './assets/photo/Photo/Urban/3.jpg',
            // 添加更多图片
        ],
        portrait: [
            './assets/photo/Photo/Portrait/1.jpg',
            './assets/photo/Photo/Portrait/2.jpg',
            './assets/photo/Photo/Portrait/3.jpg',
            // 添加更多图片
        ]
    };

    // 获取DOM元素
    const photoViewer = document.getElementById('photoViewer');
    const mainImage = photoViewer.querySelector('.main-image');
    const thumbnailsContainer = photoViewer.querySelector('.thumbnails');
    const closeBtn = photoViewer.querySelector('.close-btn');
    const prevBtn = photoViewer.querySelector('.prev-btn');
    const nextBtn = photoViewer.querySelector('.next-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    let currentAlbum = null;
    let currentIndex = 0;

    // 打开图片查看器
    function openViewer(albumName) {
        currentAlbum = albumName;
        currentIndex = 0;
        updateViewer();
        photoViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 关闭图片查看器
    function closeViewer() {
        photoViewer.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 更新查看器内容
    function updateViewer() {
        // 更新主图
        mainImage.src = albums[currentAlbum][currentIndex];
        mainImage.alt = `Photo ${currentIndex + 1}`;

        // 更新缩略图
        thumbnailsContainer.innerHTML = '';
        albums[currentAlbum].forEach((src, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = src;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.classList.add('thumbnail');
            if (index === currentIndex) {
                thumbnail.classList.add('active');
            }
            thumbnail.addEventListener('click', () => {
                currentIndex = index;
                updateViewer();
            });
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    // 显示上一张图片
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + albums[currentAlbum].length) % albums[currentAlbum].length;
        updateViewer();
    }

    // 显示下一张图片
    function showNextImage() {
        currentIndex = (currentIndex + 1) % albums[currentAlbum].length;
        updateViewer();
    }

    // 添加事件监听器
    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const albumName = card.dataset.album;
            if (albumName && albums[albumName]) {
                openViewer(albumName);
            }
        });
    });

    closeBtn.addEventListener('click', closeViewer);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (!photoViewer.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeViewer();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // 点击背景关闭查看器
    photoViewer.addEventListener('click', (e) => {
        if (e.target === photoViewer) {
            closeViewer();
        }
    });

    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;

    photoViewer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    photoViewer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextImage();
            } else {
                showPrevImage();
            }
        }
    }
}); 