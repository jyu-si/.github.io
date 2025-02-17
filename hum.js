document.addEventListener('DOMContentLoaded', function() {
    // 初期画像のIDを設定
    var initialImage = 'デザイングループ'; // 修正済み（data.json に合わせる）
    var currentImage = initialImage;
    // 初期カメラの位置と向きを保存
    var initialCameraPosition = { x: 0, y: 1.6, z: 0 };
    var initialCameraRotation = { x: 0, y: 0, z: 0 };
    // 画像データを格納する配列
    var imageData = [];
    var camera = document.getElementById('camera');
    var currentRotationY = 0; // 現在のカメラのY軸回転角度

    // JSONファイルを読み込む処理
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        imageData = data.images;
        setupButtons();
        loadImage(currentImage);
      })
      .catch(error => console.error('データの読み込みエラー:', error));

    // ボタンを動的に生成する関数
    function setupButtons() {
        var buttonContainer = document.getElementById('button-container');
        buttonContainer.innerHTML = ''; // 既存のボタンをクリア
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

    // 画像を切り替える関数
    function switchImage(id) {
        var image = imageData.find(img => img.id === id);
        if (image) {
            document.getElementById('image').setAttribute('src', image.src);
    
            var idText = document.getElementById('id-text');
            var labelText = document.getElementById('label-text');
    
            if (idText && labelText) {
                idText.setAttribute('value', image.id);
                labelText.setAttribute('value', image.label);
            } else {
                console.error('id-text または label-text 要素が見つかりません');
            }
    
            currentImage = id;
        }
    }

    // 画像を読み込む関数
    function loadImage(id) {
        console.log("現在の ID:", id);
        console.log("利用可能な ID:", imageData.map(img => img.id));

        var image = imageData.find(img => img.id === id);
        if (image) {
            document.getElementById('image').setAttribute('src', image.src);
            document.getElementById('id-text').setAttribute('value', image.id);
            document.getElementById('label-text').setAttribute('value', image.label);
        } else {
            console.error('画像の読み込みに失敗しました: ', id);
        }
    }

    // カメラの方向ベクトルを取得する関数
    function getCameraDirection() {
        var cameraEl = document.getElementById('camera').object3D;
        var direction = new THREE.Vector3();
        cameraEl.getWorldDirection(direction);
        return direction;
    }

    // カメラの方向に基づいて東西ボタンのテキストを変更
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

  // ✅ カメラの向きをリアルタイムで取得してログに出力
    function logCameraAngle() {
        var yRotation = THREE.MathUtils.radToDeg(camera.rotation.y); // ラジアンを度に変換
        console.log(`📌 現在のカメラ角度: ${Math.round(yRotation)}°`);
        requestAnimationFrame(logCameraAngle);
    }

    logCameraAngle(); // 初回実行

    // ✅ 最も近い90°にスナップする関数
    function getNearest90Degree(yRotation) {
        return Math.round(yRotation / 90) * 90 % 360;
    }

    // ✅ カメラの回転を設定する関数（`object3D.rotation` を使用）
    function setCameraRotation(yRotation) {
        console.log(`📌 カメラを ${yRotation}° に回転します`);
        camera.rotation.y = THREE.MathUtils.degToRad(yRotation); // 修正：度→ラジアン変換
    }

    // ✅ 矢印ボタンのクリックイベントを修正
    var westButton = document.getElementById('west-button');
    var eastButton = document.getElementById('east-button');

    if (westButton) {
        westButton.addEventListener('click', function() {
            console.log("⬅️ 西ボタンがクリックされました");
            currentRotationY -= 45; // 45° 回転
            currentRotationY = getNearest90Degree(currentRotationY); // 90°にスナップ
            setCameraRotation(currentRotationY);
        });
    } else {
        console.error("❌ west-button が見つかりません！");
    }

    if (eastButton) {
        eastButton.addEventListener('click', function() {
            console.log("➡️ 東ボタンがクリックされました");
            currentRotationY += 45; // 45° 回転
            currentRotationY = getNearest90Degree(currentRotationY); // 90°にスナップ
            setCameraRotation(currentRotationY);
        });
    } else {
        console.error("❌ east-button が見つかりません！");
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
