const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()_+-=[]{}|;:',.<>/?`~";
const fontSize = 10;
const columns = canvas.width / fontSize;

let drops = new Array(Math.floor(columns)).fill(1);

// Colors array
const colors = ['#0F0', '#F00', '#00F', '#FF0', '#F0F', '#0FF', '#FFF'];
let currentColorIndex = 0;  // Initial color index

function changeColor() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}

// Change color every 10 seconds
setInterval(changeColor, 10000);

function matrixRain() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = colors[currentColorIndex]; // Use current color
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = symbols.charAt(Math.floor(Math.random() * symbols.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(matrixRain, 30);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drops = new Array(Math.floor(canvas.width / fontSize)).fill(1);
});
