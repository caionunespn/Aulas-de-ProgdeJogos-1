var canvas;
var canvasContext;
var fps = 20;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 10;
var paddleX = 100;


window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvas.addEventListener('mousemove', evt => {
        var mousePos = getMousePos(canvas,evt);
        if(mousePos.x+50 <= canvas.width && mousePos.x - 50 >= 0) paddleX = mousePos.x-50;
    });
}

function getMousePos(canvas, evt){
    var bCRect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - bCRect.left,
        y: evt.clientY - bCRect.top
    }
}

setInterval(() => {
    draw();
    move();
}, 1000/fps);

function move(){
    collision();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if(ballX >= canvas.width || ballX <= 0){
        ballSpeedX = -ballSpeedX;
    }
    if(ballY >= canvas.height || ballY <= 0){
        ballSpeedY = -ballSpeedY;
    }
}

function collision(){
    if(ballX >= paddleX && ballX <= paddleX + 100 && ballY >= 540 && ballY <= 550){
        ballSpeedY = -ballSpeedY;
    }
}

function draw(){
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawRect(paddleX, 550, 100, 10, 'red');
    drawCircle(ballX, ballY, 10 , 'white');
}

function drawRect(leftX, topX, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topX, width, height);
}

function drawCircle(centerX, centerY, radius, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0 , Math.PI*2);
    canvasContext.fill();
}