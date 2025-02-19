document.addEventListener('DOMContentLoaded', function() {
    var initialImage = 'デザイングループ';
    var currentImage = initialImage;
    var initialCameraPosition = { x: 0, y: 1.6, z: 0 };
    var initialCameraRotation = { x: 0, y: 0, z: 0 };
    var imageData = [];
    var cameraEl = document.getElementById('camera');
    var camera = cameraEl ? cameraEl.object3D : null;
    var currentRotationY = 0;

    // ✅ JSONデータの読み込みとエラーハンドリング
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            imageData = data.images;
            setupButtons();
            loadImage(currentImage);
        })
        .catch(error => console.error('データの読み込みエラー:', error));

    // ✅ ボタンを動的に生成する関数
    function setupButtons() {
        var buttonContainer = document.getElementById('button-container');
        buttonContainer.innerHTML = '';
        imageData.forEach(image => {
            var button = document.createElement('button');
            button.className = 'switch-button';
            button.innerText = image.label;
            button.onclick = () => {
                switchImage(image.id);
                toggleMenu();
            };
            buttonContainer.appendChild(button);
        });
    }

    // ✅ カメラの向きをリアルタイムで取得してログに出力
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
        if (cameraEl) {
            cameraEl.removeAttribute('look-controls');
            camera.rotation.y = THREE.MathUtils.degToRad(yRotation);
            console.log(`📌 カメラを ${yRotation}° に回転しました`);

            // 100ms 後に `look-controls` を再有効化
            setTimeout(() => {
                cameraEl.setAttribute('look-controls', '');
            }, 100);
        } else {
            console.error("❌ カメラが見つかりません！");
        }
    }

    // ✅ カメラの方向に基づいて東西ボタンのテキストを変更
    function updateCameraDirection() {
        var direction = getCameraDirection();

        if (direction.x > 0 && direction.z > 0) {
            document.getElementById('east-button').innerText = "北";
            document.getElementById('west-button').innerText = "東";
        } else if (direction.x > 0 && direction.z < 0) {
            document.getElementById('east-button').innerText = "東";
            document.getElementById('west-button').innerText = "南";
        } else if (direction.x < 0 && direction.z < 0) {
            document.getElementById('east-button').innerText = "南";
            document.getElementById('west-button').innerText = "西";
        } else if (direction.x < 0 && direction.z > 0) {
            document.getElementById('east-button').innerText = "西";
            document.getElementById('west-button').innerText = "北";
        }

        requestAnimationFrame(updateCameraDirection);
    }
    updateCameraDirection();

    // ✅ west-button / east-button をクリックすると、カメラの x, z の向きを変更する
    function setPredefinedCameraDirection(x, z) {
        if (cameraEl) {
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

    // メニューをトグルする関数
    function toggleMenu() {
        document.querySelector('.openbtn4').classList.toggle('active');
        document.getElementById('button-container').classList.toggle('show');
    }

    // 方向ボタンのセットアップ関数
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
