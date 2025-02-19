document.addEventListener('DOMContentLoaded', function() {
    var initialImage = 'デザイングループ';
    var currentImage = initialImage;
    var initialCameraPosition = { x: 0, y: 1.6, z: 0 };
    var initialCameraRotation = { x: 0, y: 0, z: 0 };
    var imageData = [];
    var cameraEl = document.getElementById('camera');
    var camera = null; // 初期化前に `null` に設定
    var currentRotationY = 0;

    if (!cameraEl) {
        console.error("❌ `cameraEl` が見つかりません！");
        return;
    }

    cameraEl.addEventListener('loaded', function () {
        console.log("✅ A-Frame のカメラがロードされました！");
        camera = cameraEl.object3D;
    });

    // ✅ JSONデータの読み込み
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            imageData = data.images;
            setupButtons();
            loadImage(currentImage);
        })
        .catch(error => console.error('データの読み込みエラー:', error));

    // ✅ 画像を読み込む関数
    function loadImage(id) {
        var image = imageData.find(img => img.id === id);
        if (image) {
            document.getElementById('image').setAttribute('src', image.src);
            document.getElementById('id-text').setAttribute('value', image.id);
            document.getElementById('label-text').setAttribute('value', image.label);
        } else {
            console.error(`❌ 画像の読み込みに失敗しました: ${id}`);
        }
    }

    // ✅ カメラの向きをリアルタイムでログに出力
    function logCameraAngle() {
        if (camera && camera.rotation) {
            var yRotation = THREE.MathUtils.radToDeg(camera.rotation.y);
            console.log(`📌 現在のカメラ角度: ${Math.round(yRotation)}°`);
        } else {
            console.warn("⚠️ カメラの rotation が取得できません");
        }
        requestAnimationFrame(logCameraAngle);
    }
    logCameraAngle();

    // ✅ `look-controls` を一時的に無効化してからカメラの向きを変更
    function setCameraRotation(yRotation) {
        if (cameraEl && camera) {
            cameraEl.removeAttribute('look-controls');
            camera.rotation.y = THREE.MathUtils.degToRad(yRotation);
            console.log(`📌 カメラを ${yRotation}° に回転しました`);

            setTimeout(() => {
                cameraEl.setAttribute('look-controls', '');
            }, 100);
        } else {
            console.error("❌ カメラが見つかりません！");
        }
    }

    // ✅ west-button / east-button をクリックすると、カメラの x, z の向きを変更する
    function setPredefinedCameraDirection(x, z) {
        if (cameraEl && camera) {
            cameraEl.removeAttribute('look-controls');

            let newRotationY;
            if (x === 0 && z === 1) {
                newRotationY = 0;
            } else if (x === 1 && z === 0) {
                newRotationY = 90;
            } else if (x === 1 && z === 1) {
                newRotationY = 45;
            } else if (x === 0 && z === 0) {
                newRotationY = 180;
            } else {
                console.warn("⚠️ 不正なカメラ向きが指定されました");
                return;
            }

            camera.rotation.y = THREE.MathUtils.degToRad(newRotationY);
            console.log(`📌 カメラの向きを変更: (${x}, ${z}) → ${newRotationY}°`);

            setTimeout(() => {
                cameraEl.setAttribute('look-controls', '');
            }, 100);
        } else {
            console.error("❌ カメラの rotation が設定できません！");
        }
    }

    var westButton = document.getElementById('west-button');
    var eastButton = document.getElementById('east-button');

    if (westButton) {
        westButton.addEventListener('click', function() {
            console.log("⬅️ 西ボタンがクリックされました");
            var directions = [{ x: 0, z: 1 }, { x: 1, z: 0 }, { x: 1, z: 1 }, { x: 0, z: 0 }];
            var chosenDirection = directions[Math.floor(Math.random() * directions.length)];
            setPredefinedCameraDirection(chosenDirection.x, chosenDirection.z);
        });
    }

    if (eastButton) {
        eastButton.addEventListener('click', function() {
            console.log("➡️ 東ボタンがクリックされました");
            var directions = [{ x: 0, z: 1 }, { x: 1, z: 0 }, { x: 1, z: 1 }, { x: 0, z: 0 }];
            var chosenDirection = directions[Math.floor(Math.random() * directions.length)];
            setPredefinedCameraDirection(chosenDirection.x, chosenDirection.z);
        });
    }

    // ✅ メニューをトグルする関数
    function toggleMenu() {
        document.querySelector('.openbtn4').classList.toggle('active');
        document.getElementById('button-container').classList.toggle('show');
    }

    // ✅ 方向ボタンのセットアップ関数
    function setupDirectionButtons() {
        fetch('data.json')
        .then(response => response.json())
        .then(data => {
            var directions = data.directions;
            document.getElementById('east-button').innerText = directions.east.id;
            document.getElementById('west-button').innerText = directions.west.id;
        })
        .catch(error => console.error('データの読み込みエラー:', error));
    }

    document.addEventListener('DOMContentLoaded', function() {
        setupDirectionButtons();
    });
});
