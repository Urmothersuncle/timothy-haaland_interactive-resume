document.addEventListener('DOMContentLoaded', function () {
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

    const brushOffsetX = 25; 
    const brushOffsetY = 1; 

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

    document.addEventListener('keydown', function (e) {
        if (e.key.toLowerCase() === 'c') {
            changeColor();
        }
    });

    function getOffset(e) {
        if (e.touches && e.touches.length > 0) {  
            e.preventDefault();
            return {
                x: e.touches[0].clientX - brushOffsetX,
                y: e.touches[0].clientY - brushOffsetY,
            };
        } else {
            return {
                x: e.offsetX - brushOffsetX,
                y: e.offsetY - brushOffsetY,
            };
        }
    }

    function startDrawing(e) {
        const { x, y } = getOffset(e);
        [lastX, lastY] = [x, y];
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

        const { x, y } = getOffset(e);

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        [lastX, lastY] = [x, y];
    }

    const events = ['mousedown', 'mousemove', 'mouseup', 'mouseout', 'touchstart', 'touchmove', 'touchend'];
    const eventActions = {
        mousedown: startDrawing,
        touchstart: startDrawing,
        mousemove: draw,
        touchmove: draw,
        mouseup: stopDrawing,
        mouseout: stopDrawing,
        touchend: stopDrawing,
    };
    
    events.forEach(evt => canvas.addEventListener(evt, eventActions[evt]));

    const brush = document.createElement('div');
    brush.id = "floating-brush";
    document.body.appendChild(brush);

    document.addEventListener("mousemove", function (e) {
        const centeredContainer = document.querySelector(".centered-container");

        const cursorOffsetX = 16; 
        const cursorOffsetY = 16; 

        if (!centeredContainer.contains(e.target)) {
            brush.style.display = "block";
            document.body.style.cursor = "none"; 
            brush.style.left = (e.pageX - cursorOffsetX) + "px";
            brush.style.top = (e.pageY - cursorOffsetY) + "px";
        } else {
            brush.style.display = "none";
            document.body.style.cursor = "default";  
        }
    });
});
