const canvas = document.getElementById('lightTrailsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;  
        this.y = y;  
        this.size = Math.random() * 3 + 1; 
        this.speedX = (Math.random() * 2 - 1) * 0.4; 
        this.speedY = (Math.random() * 2 - 1) * 0.3;  
        let hue = Math.floor(Math.random() * 360);
        let saturation = 80 + Math.floor(Math.random() * 21); 
        let lightness = 50 + Math.floor(Math.random() * 31); 

        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.9)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(canvas.width / 2, canvas.height / 2));
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].x < 0 || particles[i].x > canvas.width || particles[i].y < 0 || particles[i].y > canvas.height) {
            particles.splice(i, 1);
        }
    }
}

function animate() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';  
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});



