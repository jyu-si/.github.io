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

        // 方向テキストの設定
        var directions = data.directions;

        // "西" のテキストを設定
        var westText = document.getElementById('west-text');
        if (westText) {
            westText.setAttribute('value', directions.west.id);
        }

        // "東" のテキストを設定
        var eastText = document.getElementById('east-text');
        if (eastText) {
            eastText.setAttribute('value', directions.east.id);
        }
      })
      .catch(error => console.error('Error:', error));

    // ボタンを動的に生成する関数
    function setupButtons() {
        var buttonContainer = document.getElementById('button-container');
        buttonContainer.innerHTML = ''; // 既存のボタンをクリア
        imageData.forEach(image => {
            // 各ラベルに対応するボタンを生成
            var button = document.createElement('button');
            button.className = 'switch-button';
            button.innerText = image.label;  // ボタンには "label" を使用
            button.onclick = () => {
                switchImage(image.id);
                toggleMenu();  // 研究室選択時にメニューを閉じる
            };
            buttonContainer.appendChild(button);  // ボタンをコンテナに追加
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

    // 初期画像を読み込む関数
    function loadImage(id) {
        var image = imageData.find(img => img.id === id);
        if (image) {
            document.getElementById('image').setAttribute('src', image.src);
            // 初期表示でも id と label を設定
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
        }, 100);
    };

    // メニューをトグルする関数
    function toggleMenu() {
        document.querySelector('.openbtn4').classList.toggle('active');
        document.getElementById('button-container').classList.toggle('show');
    }

    // ハンバーガーボタンにクリックイベントを設定
    document.querySelector('.openbtn4').addEventListener('click', toggleMenu);

    // ★スマートフォンの場合のサイズ調整
    var isMobile = window.innerWidth <= 768; // 画面幅が768px以下の場合はモバイルと判定
    var plane = document.querySelector('a-plane');
    var idText = document.getElementById('id-text');
    var labelText = document.getElementById('label-text');
    
    if (isMobile) {
        plane.setAttribute('width', '2.5');
        plane.setAttribute('height', '1');
        idText.setAttribute('scale', '1.5 1.5 1');
        labelText.setAttribute('scale', '1 1 1');
    } else {
        plane.setAttribute('width', '3.5');
        plane.setAttribute('height', '1.5');
        idText.setAttribute('scale', '2 2 1');
        labelText.setAttribute('scale', '1.2 1.2 1');
    }
});
