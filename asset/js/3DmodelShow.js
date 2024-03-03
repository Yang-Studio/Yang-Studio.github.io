document.getElementById('triggerImage').addEventListener('click', function() {
    document.getElementById('popupContainer').style.display = 'flex';

    // Three.js场景设置
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(document.getElementById('modelPart').offsetWidth, document.getElementById('modelPart').offsetHeight);
    document.getElementById('modelPart').appendChild(renderer.domElement);

    // 添加灯光
    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0).normalize();
    scene.add(directionalLight);

    // 加载FBX模型
    var loader = new THREE.FBXLoader();
    loader.load('../fbx/M_Hammer.fbx', function(fbx) {
        scene.add(fbx);
        animate();
    }, undefined, function(error) {
        console.error(error);
    });

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
});

document.getElementById('triggerImage').addEventListener('click', function() {
    document.getElementById('popupContainer').style.display = 'flex';
    // Three.js场景设置和模型加载...
});

// 处理关闭按钮点击事件
document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('popupContainer').style.display = 'none';
});

