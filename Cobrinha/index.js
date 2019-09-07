var canvas;
var canvasContext;
var fps = 20;
var score = 0;

var cobra = {
    x: 0,
    y: 0
}
var direcao = {
    speedX: 10,
    speedY: 0
}

var maca = {
    x: grid(390),
    y: grid(290)
}

function grid (maximo){
    let numero = aleatorio(maximo);
    while(numero%(maximo/10) !== 0){
        numero = aleatorio(maximo);
    }
    return numero;
}

function aleatorio (maximo){
    let numero = Math.floor(Math.random() * maximo) + 1;
    return numero;
}

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    document.addEventListener('keydown', evt => {
        switch(evt.keyCode){
            case 37:
                direcao = {
                    speedX: -20,
                    speedY: 0
                }
                break;
            case 38:
                direcao = {
                    speedX: 0,
                    speedY: -20
                }
                break;
            case 39:
                direcao = {
                    speedX: 20,
                    speedY: 0
                }
                break;
            case 40:
                direcao = {
                    speedX: 0,
                    speedY: 20
                }
                break;
        }
    });
}

setInterval(() => {
    draw();
    move();
}, 1000/fps);

function move(){
    checkEat();
    if(cobra.x + (direcao.speedX/2) <= 0 || cobra.x + (direcao.speedX/2) >= 780){
        direcao.speedX = 0;
    }
    if(cobra.y + (direcao.speedY/2) <= 0 || cobra.y + (direcao.speedY/2) >= 580){
        direcao.speedY = 0;
    }
    cobra.x += direcao.speedX;
    cobra.y += direcao.speedY;
}

function draw(){
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawText('30px', 'Arial', score, 'white', canvas.width/2, canvas.height/8);
    drawRect(cobra.x, cobra.y, 20, 20, 'white');
    drawRect(maca.x, maca.y, 20, 20, 'red')
}

function drawRect(leftX, topX, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topX, width, height);
}

function drawText(fontSize, fontFamily, text, color, centerX, centerY){
    canvasContext.font = fontSize + ' ' + fontFamily;
    canvasContext.fillStyle = color;
    canvasContext.textAlign = 'center';
    canvasContext.lineWidth = 4;
    canvasContext.strokeText(text, centerX, centerY);
    canvasContext.fillText(text, centerX, centerY);
}

function checkEat(){
    if(Math.abs(cobra.x - maca.x) <= 10){
        if(Math.abs(cobra.y - maca.y) <= 10){
            maca = {
                x: grid(390),
                y: grid(290)
            }
            score+=1;
        }
    }
}