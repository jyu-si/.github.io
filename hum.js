document.querySelector('.openbtn4').addEventListener('click', toggleMenu);

function toggleMenu() {
  var button = document.querySelector('.openbtn4');
  var menu = document.getElementById('button-container');
  button.classList.toggle('active');
  menu.classList.toggle('show');
}


function switchImage(id) {
  var image = imageData.find(img => img.id === id);
  if (image) {
    document.getElementById('image').setAttribute('src', image.src);
    document.getElementById('label-text').setAttribute('value', image.name); // nameを参照
    currentImage = id;
  }
}

function loadImage(id) {
  var image = imageData.find(img => img.id === id);
  if (image) {
    document.getElementById('image').setAttribute('src', image.src);
    document.getElementById('label-text').setAttribute('value', image.name); // nameを参照
  }
}
