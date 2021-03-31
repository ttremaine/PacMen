let pos = 0;
const pacArray = [
  ['images/pacman1.png', 'images/pacman2.png'],
  ['images/pacman3.png', 'images/pacman4.png'],
];
let direction = 0;
const pacMen = [];
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  }
}
function makePac() { 
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[0][0];
  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  game.appendChild(newimg);
  return {
    position,
    velocity,
    newimg,
  };
}
function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}
let img = 0;
function imageChange() {
  pacMen.forEach((item) => {
    if (item.velocity.x >= 0) {
        item.newimg.src = pacArray[0][img];
    } else {  
        item.newimg.src = pacArray[1][img];
    }
    img = (img + 1) % 2; 
  });
  setTimeout(imageChange, 300);
}
function checkCollisions(item) {
  if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) item.velocity.x = -item.velocity.x;
  if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;
}
function makeOne() {
  pacMen.push(makePac());
}
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, imageChange, pacMen };
}
