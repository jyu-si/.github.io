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
