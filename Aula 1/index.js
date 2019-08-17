var canvas;
var canvasContext;
var fps = 60;
var rectX = 360;
var speedX = 10;
window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
}

setInterval(() => {
    draw();
    move();
}, 1000/fps);

function move(){
    rectX += speedX;
    if( rectX >= 720 || rectX <= 0){
        speedX = -speedX;
    }
}

function draw(){
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawRect(rectX, 550, 80, 10, 'red');
}

function drawRect(leftX, topX, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topX, width, height);
}