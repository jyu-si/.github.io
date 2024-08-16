document.addEventListener('DOMContentLoaded', function () {
    var currentImage = 'matunobe';
    var imageData = [];

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            imageData = data.images;
            setupButtons();
            loadImage('matunobe');
        })
        .catch(error => console.error('Error:', error));

    function setupButtons() {
        var buttonContainer = document.getElementById('button-container');
        buttonContainer.innerHTML = ''; // 既存のボタンをクリア
        imageData.forEach(image => {
            var button = document.createElement('button');
            button.className = 'switch-button';
            button.innerText = image.label;  // ボタンのテキストとして "label" を使用
            button.onclick = () => switchImage(image.id);
            buttonContainer.appendChild(button);
        });
    }

    function switchImage(id) {
        var image = imageData.find(img => img.id === id);
        if (image) {
            document.getElementById('image').setAttribute('src', image.src);
            document.getElementById('label-text').setAttribute('value', image.name);  // 中央の文字として "name" を使用
            currentImage = id;
        }
    }

    function loadImage(id) {
        var image = imageData.find(img => img.id === id);
        if (image) {
            document.getElementById('image').setAttribute('src', image.src);
            document.getElementById('label-text').setAttribute('value', image.name);  // 中央の文字として "name" を使用
        }
    }

    function goToURL() {
        var image = imageData.find(img => img.id === currentImage);
        if (image) {
            window.location.href = image.url;
        }
    }
});
