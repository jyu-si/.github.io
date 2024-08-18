document.addEventListener('DOMContentLoaded', function() {
    // 初期画像のIDを設定
    var currentImage = '松延研究室';
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
            // 各ラベルに対応するボタンを生成
            var button = document.createElement('button');
            button.className = 'switch-button';
            button.innerText = image.label;  // ボタンには "label" を使用
            button.onclick = () => switchImage(image.id);  // クリックで画像を切り替え
            buttonContainer.appendChild(button);  // ボタンをコンテナに追加
        });
    }

// 画像を切り替える関数
function switchImage(id) {
    var image = imageData.find(img => img.id === id);
    if (image) {
        document.getElementById('image').setAttribute('src', image.src);
        // 中央に "id" と "label" を表示
        document.getElementById('label-text').setAttribute('value', image.id + "\n" + image.label);
        currentImage = id;  // 現在の画像IDを更新
    }
}

// 初期画像を読み込む関数
function loadImage(id) {
    var image = imageData.find(img => img.id === id);
    if (image) {
        document.getElementById('image').setAttribute('src', image.src);
        // 初期表示も "id" と "label" を表示
        document.getElementById('label-text').setAttribute('value', image.id + "\n" + image.label);
    }
}


    // 現在表示されている画像のURLに遷移する関数
    window.goToURL = function() {
        var image = imageData.find(img => img.id === currentImage);
        if (image) {
            window.location.href = image.url;
        }
    };

    // メニューをトグルする関数
    function toggleMenu() {
        document.querySelector('.openbtn4').classList.toggle('active');
        document.getElementById('button-container').classList.toggle('show');
    }

    // ハンバーガーボタンにクリックイベントを設定
    document.querySelector('.openbtn4').addEventListener('click', toggleMenu);
});
