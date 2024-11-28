document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let currentColorIndex = 0;

    const colors = ['white', 'yellow', 'orange', 'red', 'purple', 'blue', 'green'];
    const eraserColor = 'black';

    ctx.strokeStyle = colors[currentColorIndex];
    ctx.lineWidth = 5; 

    function changeColor() {
        currentColorIndex = (currentColorIndex + 1) % (colors.length + 1);

        if (currentColorIndex === colors.length) {
            ctx.strokeStyle = eraserColor;
            ctx.lineWidth = 100; 
            console.log('Eraser mode activated.');
        } else {
            ctx.strokeStyle = colors[currentColorIndex];
            ctx.lineWidth = 5; 
            console.log(`Color changed to: ${colors[currentColorIndex]}`);
        }
    }

    document.addEventListener('keydown',function(e) {
        if (e.key === 'c' || e.key === 'C') {
            changeColor();
        }
    });

    function startDrawing(e) {
        if (e.touches) {
            e.preventDefault(); 
            const touch = e.touches[0];
            [lastX, lastY] = [touch.clientX, touch.clientY];
        } else {
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }
        isDrawing = true;
    }


    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath(); 
    }

    function draw(e) {
        if (!isDrawing) return;

        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        if (e.touches) {
            const touch = e.touches[0];
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineto(touch.clientX, touch.clientY);
            ctx.stroke();
            [lastX, lastY] = [touch.clientX, touch.clientY];
        } else {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
});
