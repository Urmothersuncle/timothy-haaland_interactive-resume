const canvas = document.getElementById('network');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
let isMouseDown = false;
let isTouchDown = false; 

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 2, Math.PI * 1, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 25; 
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 2 + 1;
    let x = Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2;
    let y = Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2;
    let directionX = Math.random() * 0.2 - 0.1;
    let directionY = Math.random() * 0.2 - 0.1;
    let color = '#FFFFFF';

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}

function bumpParticles(x, y) {
  const bumpStrength = 0.2; 
  particlesArray.forEach((particle) => {
    const dx = x - particle.x;
    const dy = y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 20) {
      particle.directionX += (-dx * bumpStrength) / distance;
      particle.directionY += (-dy * bumpStrength) / distance;
    }
  });
}


canvas.addEventListener('mousedown', function (event) {
  isMouseDown = true;
  bumpParticles(event.clientX, event.clientY);
});

canvas.addEventListener('mousemove', function (event) {
  if (isMouseDown) {
    bumpParticles(event.clientX, event.clientY);
  }
});

canvas.addEventListener('mouseup', function () {
  isMouseDown = false;
});

canvas.addEventListener(
  'touchstart',
  function (event) {
    isTouchDown = true;
    const touch = event.touches[0];
    bumpParticles(touch.clientX, touch.clientY);
    event.preventDefault(); 
  },
  { passive: false }
);

canvas.addEventListener(
  'touchmove',
  function (event) {
    if (isTouchDown) {
      const touch = event.touches[0];
      bumpParticles(touch.clientX, touch.clientY);
    }
    event.preventDefault();
  },
  { passive: false }
);

canvas.addEventListener('touchend', function () {
  isTouchDown = false;
});

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();

window.addEventListener('resize', () => {
  const canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});


