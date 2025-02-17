document.addEventListener('DOMContentLoaded', function() {
    // 初期画像のIDを設定
    var initialImage = 'デザイングループ'; // 修正済み（data.json に合わせる）
    var currentImage = initialImage;
    // 初期カメラの位置と向きを保存
    var initialCameraPosition = { x: 0, y: 1.6, z: 0 };
    var initialCameraRotation = { x: 0, y: 0, z: 0 };
    // 画像データを格納する配列
    var imageData = [];
    var cameraEl = document.getElementById('camera'); // `object3D` を取得する前にエレメントを取得
    var camera = cameraEl ? cameraEl.object3D : null; // 修正：エラー防止
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

    // ✅ カメラの向きをリアルタイムで取得してログに出力
    function logCameraAngle() {
        if (camera && camera.rotation) { // 修正: undefined を防ぐ
            var yRotation = THREE.MathUtils.radToDeg(camera.rotation.y); // ラジアンを度に変換
            console.log(`📌 現在のカメラ角度: ${Math.round(yRotation)}°`);
        } else {
            console.warn("⚠️ カメラの rotation が取得できません");
        }
        requestAnimationFrame(logCameraAngle);
    }

    logCameraAngle(); // 初回実行

    // ✅ カメラの向きを (0,1), (1,0), (1,1), (0,0) のいずれかに設定
    function setPredefinedCameraDirection(x, z) {
        if (camera && camera.rotation) {
            let newRotationY;
            if (x === 0 && z === 1) {
                newRotationY = 0;  // 北向き
            } else if (x === 1 && z === 0) {
                newRotationY = 90; // 東向き
            } else if (x === 1 && z === 1) {
                newRotationY = 45; // 北東向き
            } else if (x === 0 && z === 0) {
                newRotationY = 180; // 南向き
            } else {
                console.warn("⚠️ 不正なカメラ向きが指定されました");
                return;
            }
            camera.rotation.y = THREE.MathUtils.degToRad(newRotationY);
            console.log(`📌 カメラの向きを変更: (${x}, ${z}) → ${newRotationY}°`);
        } else {
            console.error("❌ カメラの rotation が設定できません！");
        }
    }

    // ✅ 矢印ボタンのクリックイベントを修正
    var westButton = document.getElementById('west-button');
    var eastButton = document.getElementById('east-button');

    if (westButton) {
        westButton.addEventListener('click', function() {
            console.log("⬅️ 西ボタンがクリックされました");

            // ランダムに (0,1), (1,0), (1,1), (0,0) のいずれかを選択
            var directions = [
                { x: 0, z: 1 },
                { x: 1, z: 0 },
                { x: 1, z: 1 },
                { x: 0, z: 0 }
            ];
            var chosenDirection = directions[Math.floor(Math.random() * directions.length)];
            setPredefinedCameraDirection(chosenDirection.x, chosenDirection.z);
        });
    } else {
        console.error("❌ west-button が見つかりません！");
    }

    if (eastButton) {
        eastButton.addEventListener('click', function() {
            console.log("➡️ 東ボタンがクリックされました");

            // ランダムに (0,1), (1,0), (1,1), (0,0) のいずれかを選択
            var directions = [
                { x: 0, z: 1 },
                { x: 1, z: 0 },
                { x: 1, z: 1 },
                { x: 0, z: 0 }
            ];
            var chosenDirection = directions[Math.floor(Math.random() * directions.length)];
            setPredefinedCameraDirection(chosenDirection.x, chosenDirection.z);
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
