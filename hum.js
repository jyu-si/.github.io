let currentIndex = 0;
let images = [];

const initialImageId = 'ヒューマンセンタードデザイン研究室';
let currentImage = initialImageId;

// 画像とラベルのデータを読み込み
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    images = data.images;

    // ハンバーガーメニューに各ボタン追加（idで表示）
    const container = document.getElementById('button-container');
    images.forEach((item, index) => {
      const button = document.createElement('button');
      button.textContent = item.id;
      button.addEventListener('click', () => {
        updateScene(item);
        currentIndex = index;
        toggleMenu(); // メニュー閉じる
      });
      container.appendChild(button);
    });

    // 初期シーンの表示
    const initial = images.find(img => img.id === initialImageId) || images[0];
    updateScene(initial);
    currentIndex = images.indexOf(initial);
  });

function updateScene(item) {
  document.getElementById('image').setAttribute('src', item.image);
  document.getElementById('id-text').setAttribute('value', item.id);
  document.getElementById('label-text').setAttribute('value', item.label);
}

// ハンバーガーメニュー開閉
function toggleMenu() {
  const menu = document.getElementById('button-container');
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// カメラ視点を左右に90度回転
function rotateCamera(direction) {
  const camera = document.getElementById('camera');
  const currentRotation = camera.getAttribute('rotation').y;
  const newY = currentRotation + (direction === 'east' ? 90 : -90);
  camera.setAttribute('rotation', `0 ${newY} 0`);
}

// イベントリスナー
document.getElementById('menu-button').addEventListener('click', toggleMenu);
document.getElementById('east-button').addEventListener('click', () => rotateCamera('east'));
document.getElementById('west-button').addEventListener('click', () => rotateCamera('west'));

// スタートボタンの処理
document.getElementById('start-button').addEventListener('click', () => {
  document.querySelector('.start-screen').classList.add('hidden');
  document.querySelector('a-scene').classList.remove('hidden');
  document.querySelector('.openbtn4').style.display = 'block'; // ハンバーガー表示
});
