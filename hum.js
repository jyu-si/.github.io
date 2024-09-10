document.addEventListener('DOMContentLoaded', function() {
    var initialImage = '松延研究室'; // 初期画像のIDを設定
    var currentImage = initialImage;
    var initialCameraPosition = { x: 0, y: 1.6, z: 0 }; // 初期カメラの位置と向き
    var initialCameraRotation = { x: 0, y: 0, z: 0 };
    var imageData = [];

    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        imageData = data.images;  // JSONデータを格納
        setupButtons();
        loadImage(currentImage);
      })
      .catch(error => console.error('Error:', error));

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

    function switchImage(id) {
        var image = imageData.find(img => img.id === id);
        if (image) {
            document.getElementById('image').setAttribute('src', image.src);
            document.getElementById('id-text').setAttribute('value', image.id);
            document.getElementById('label-text').setAttribute('value', image.label);
            currentImage = id;
        }
    }

    function loadImage(id) {
        var image = imageData.find(img => img.id === id);
        if (image) {
            document.getElementById('image').setAttribute('src', image.src);
            document.getElementById('id-text').setAttribute('value', image.id);
            document.getElementById('label-text').setAttribute('value', image.label);
        }
    }

    window.goToURL = function() {
        var image = imageData.find(img => img.id === currentImage);
        if (image) {
            window.location.href = image.url;
        }
    };

    window.resetView = function() {
        var camera = document.getElementById('camera');
        camera.removeAttribute('look-controls');
        camera.setAttribute('position', initialCameraPosition);
        camera.setAttribute('rotation', initialCameraRotation);
        setTimeout(function() {
            camera.setAttribute('look-controls', '');
        }, 100);
    };

    function toggleMenu() {
        document.querySelector('.openbtn4').classList.toggle('active');
        document.getElementById('button-container').classList.toggle('show');
    }

    document.querySelector('.openbtn4').addEventListener('click', toggleMenu);
});
