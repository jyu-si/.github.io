document.addEventListener('DOMContentLoaded', function() {
    // 初期画像のIDを設定
    var initialImage = '松延研究室'; // 初期画像のIDを保存
    var currentImage = initialImage;
    // 初期カメラの位置と向きを保存
    var initialCameraPosition = { x: 0, y: 1.6, z: 0 };
    var initialCameraRotation = { x: 0, y: 0, z: 0 };
    // 画像データを格納する配列
    var imageData = [];

    // JSONファイルを読み込む処理
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        imageData = data.images;  // JSONデータを配列に格納
        setupButtons();           // ボタンをセットアップ
        loadImage(currentImage);  // 初期画像を表示
      })
      .catch(error => console.error('Error:', error));

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

    // カメラの方向ベクトルを取得する関数
    function getCameraDirection() {
        var cameraEl = document.getElementById('camera').object3D;
        var direction = new THREE.Vector3();
        cameraEl.getWorldDirection(direction);
        return direction;
    }

    // カメラの方向ベクトルを連続的に取得し、東西ボタンのテキストを更新
    function updateCameraDirection() {
        var direction = getCameraDirection();

        if (direction.x > 0 && direction.z > 0) {
            // x > 0, z > 0: 北と東
            document.getElementById('east-button').innerText = "北";
            document.getElementById('west-button').innerText = "東";
        } else if (direction.x > 0 && direction.z < 0) {
            // x > 0, z < 0: 東と南
            document.getElementById('east-button').innerText = "東";
            document.getElementById('west-button').innerText = "南";
        } else if (direction.x < 0 && direction.z < 0) {
            // x < 0, z < 0: 南と西
            document.getElementById('east-button').innerText = "南";
            document.getElementById('west-button').innerText = "西";
        } else if (direction.x < 0 && direction.z > 0) {
            // x < 0, z > 0: 西と北
            document.getElementById('east-button').innerText = "西";
            document.getElementById('west-button').innerText = "北";
        }

        requestAnimationFrame(updateCameraDirection);
    }

    // 最初の呼び出し
    updateCameraDirection();

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
        .catch(error => console.error('Error:', error));
    }

    document.addEventListener('DOMContentLoaded', function() {
        setupDirectionButtons();
    });
});
