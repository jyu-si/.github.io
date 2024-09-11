document.addEventListener('DOMContentLoaded', function() {
    var initialImage = '松延研究室'; // 初期画像のIDを設定
    var currentImage = initialImage;
    var initialCameraPosition = { x: 0, y: 1.6, z: 0 }; // 初期カメラの位置と向き
    var initialCameraRotation = { x: 0, y: 0, z: 0 };
    var imageData = [];

    // スタートボタンが押された時にコンテンツを初期化
    document.getElementById('start-button').onclick = function() {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('content-container').classList.remove('hidden');

        // 必要なDOM要素を取得
        var buttonContainer = document.getElementById('button-container');
        var menuButton = document.querySelector('.openbtn4');

        // JSONファイルを読み込む処理
        fetch('data.json')
          .then(response => response.json())
          .then(data => {
            imageData = data.images;  // JSONデータを格納
            if (buttonContainer) {
              setupButtons(buttonContainer);
            } else {
              console.error('Error: button-containerが存在しません');
            }
            loadImage(currentImage);
          })
          .catch(error => console.error('Error:', error));

        // メニューの初期化
        if (menuButton) {
            menuButton.addEventListener('click', toggleMenu);
        } else {
            console.error('Error: ハンバーガーボタンが存在しません');
        }
    };

    // ボタンを動的に生成する関数
    function setupButtons(buttonContainer) {
        buttonContainer.innerHTML = ''; // ボタンコンテナをクリア
        imageData.forEach(image => {
            var button = document.createElement('button');
            button.className = 'switch-button';
            button.innerText = image.label;
            button.onclick = () => {
                switchImage(image.id);
                toggleMenu(); // メニューを閉じる
            };
            buttonContainer.appendChild(button);
        });
    }

    // 画像を切り替える関数
    function switchImage(id) {
        var image = imageData.find(img => img.id === id);
        if (image) {
            document.getElementById('image').setAttribute('src', image.src);
            document.getElementById('id-text').setAttribute('value', image.id);
            document.getElementById('label-text').setAttribute('value', image.label);
            currentImage = id;
        }
    }

    // 初期画像を読み込む関数
    function loadImage(id) {
        var image = imageData.find(img => img.id === id);
        if (image) {
            document.getElementById('image').setAttribute('src', image.src);
            document.getElementById('id-text').setAttribute('value', image.id);
            document.getElementById('label-text').setAttribute('value', image.label);
        }
    }

    // 現在表示されている画像のURLに遷移する関数
    window.goToURL = function() {
        var image = imageData.find(img => img.id === currentImage);
        if (image) {
            window.location.href = image.url;
        }
    };

    // 初期状態に視点をリセットする関数
    window.resetView = function() {
        var camera = document.getElementById('camera');

        // look-controls を一時的に無効化
        camera.removeAttribute('look-controls');

        // カメラの位置と回転をリセット
        camera.setAttribute('position', initialCameraPosition);
        camera.setAttribute('rotation', initialCameraRotation);

        // look-controls を再度有効化
        setTimeout(function() {
            camera.setAttribute('look-controls', '');
        }, 100); // 少し遅延させることでリセットが確実に反映されるようにする
    };

    // メニューをトグルする関数
    function toggleMenu() {
        var menuButton = document.querySelector('.openbtn4');
        var buttonContainer = document.getElementById('button-container');
        
        // メニューが存在するか確認
        if (menuButton && buttonContainer) {
            menuButton.classList.toggle('active');
            buttonContainer.classList.toggle('show');
        } else {
            console.error('Error: メニューが存在しません');
        }
    }
});
