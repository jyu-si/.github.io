document.addEventListener('DOMContentLoaded', function() {
    var currentImage = 'matunobe';
    var imageData = [];

    // JSONファイルを読み込み
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        imageData = data.images;
        setupButtons();
        loadImage(currentImage);  // 初期画像を表示
      })
      .catch(error => console.error('Error:', error));

    function setupButtons() {
        var buttonContainer = document.getElementById('button-container');
        buttonContainer.innerHTML = ''; // 既存のボタンをクリア
        imageData.forEach(image => {
            var button = document.createElement('button');
            button.className = 'switch-button';
            button.innerText = image.label;  // ボタンには "label" を使用
            button.onclick = () => switchImage(image.id);
            buttonContainer.appendChild(button);
        });
    }

    function switchImage(id) {
        var image = imageData.find(img => img.id === id);
        if (image) {
            document.getElementById('image').setAttribute('src', image.src);
            document.getElementById('label-text').setAttribute('value', image.id);  // 中央には "id" を表示
            currentImage = id;
        }
    }

    function loadImage(id) {
        var image = imageData.find(img => img.id === id);
        if (image) {
            document.getElementById('image').setAttribute('src', image.src);
            document.getElementById('label-text').setAttribute('value', image.id);  // 初期表示も "id" を表示
        }
    }

    function goToURL() {
        var image = imageData.find(img => img.id === currentImage);
        if (image) {
            window.location.href = image.url;
        }
    }

    // toggleMenu関数の定義
    function toggleMenu() {
        document.querySelector('.openbtn4').classList.toggle('active');
        document.getElementById('button-container').classList.toggle('show');
    }

    document.querySelector('.openbtn4').addEventListener('click', toggleMenu);
});
