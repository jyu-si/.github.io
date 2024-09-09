document.addEventListener('DOMContentLoaded', function() {
    var initialCameraPosition = { x: 0, y: 1.6, z: 0 };
    var initialCameraRotation = { x: 0, y: 0, z: 0 };

    // 初期カメラの位置と向き
    const camera = document.getElementById('camera');

    // カメラの回転に応じてテキストを動的に変更
    camera.addEventListener('componentchanged', function(event) {
        if (event.detail.name === 'rotation') {
            var rotationY = camera.getAttribute('rotation').y;
            updateEquipmentText(rotationY);
        }
    });

    function updateEquipmentText(rotationY) {
        const northText = document.getElementById('north-text');
        const eastText = document.getElementById('east-text');
        const southText = document.getElementById('south-text');
        const westText = document.getElementById('west-text');

        // 回転角度に基づいてテキストを変更するロジック
        if (rotationY > 45 && rotationY <= 135) {
            northText.setAttribute('value', '器具B');
            eastText.setAttribute('value', '器具C');
            southText.setAttribute('value', '器具D');
            westText.setAttribute('value', '器具A');
        } else if (rotationY > 135 && rotationY <= 225) {
            northText.setAttribute('value', '器具C');
            eastText.setAttribute('value', '器具D');
            southText.setAttribute('value', '器具A');
            westText.setAttribute('value', '器具B');
        } else if (rotationY > 225 && rotationY <= 315) {
            northText.setAttribute('value', '器具D');
            eastText.setAttribute('value', '器具A');
            southText.setAttribute('value', '器具B');
            westText.setAttribute('value', '器具C');
        } else {
            northText.setAttribute('value', '器具A');
            eastText.setAttribute('value', '器具B');
            southText.setAttribute('value', '器具C');
            westText.setAttribute('value', '器具D');
        }
    }
});
