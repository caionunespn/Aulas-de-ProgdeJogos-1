var canvas;
var canvasContext;
var fps = 60;

var player;
var obstacles;
var is_playing = false;
var pula = false;
var lastCommand = Date.now();
var nuvens = [];
var score = 0;


window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    obstacles = [];
    player = new Player;
    for(let i = 0 ; i < 11; i++){
        nuvens.push({
            x: i*90,
            y: 500-(Math.random()*80)
        });
    }
    drawBackground();
    player.draw();
}

document.addEventListener('keydown', event => {
    var code = event.keyCode;
    switch(code){
        case 13:
            is_playing = !is_playing;
            break;
        case 32:
            var currentTime = Date.now();
            if (currentTime - lastCommand > 0.05){
                pula = false
            }
            pula = true;
            lastCommand = currentTime;
            break;
    }
});

setInterval(() => {
    is_playing ? draw() : null
}, 1000/fps);

setInterval(() => {
    is_playing ? obstacles.push(new Obstacle) : obstacles = []
}, 1000);

function draw(){
    drawBackground();
    obstacles.forEach(obstacle => {
        obstacle.draw();
        if(collision(player,obstacle)){
            is_playing = false;
        }
        if(obstacle.checkPosition() <= 0){
            obstacle = null;
        }
    });

    player.draw();
    if(player.checkBottom()){
        is_playing = false;
    }
}

function drawBackground(){
    drawRect(0, 0, canvas.width, canvas.height, '#95cfca');
    nuvens.forEach(nuvem =>  drawCircle(nuvem.x, nuvem.y , 80,'white'))
    drawRect(0, 488, canvas.width, 110, '#000000');
    drawRect(0,490,canvas.width, 110, '#fad87d');
    drawRect(0, 491, canvas.width, 20, '#509242');
    drawText('30px', 'Arial', score, 'white', canvas.width/2, canvas.height/5);
}

function drawRect(leftX, topX, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topX, width, height);
}

function drawCircle(centerX, centerY, radius, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0 ,2*Math.PI);
    canvasContext.fill();
}

function drawText(fontSize, fontFamily, text, color, centerX, centerY){
    canvasContext.font = fontSize + ' ' + fontFamily;
    canvasContext.fillStyle = color;
    canvasContext.textAlign = 'center';
    canvasContext.lineWidth = 4;
    canvasContext.strokeText(text, centerX, centerY);
    canvasContext.fillText(text, centerX, centerY);
}

function sortNumber() {
    var random_number=Math.floor(Math.random()*11)*10;
    while (random_number > 60){
        random_number=Math.floor(Math.random()*11)*10;
    }
    return random_number;
}

function collision(a, b){
    let posA = a.getBounds();
    let posB = b.getBounds();
    if ((posA.x + posA.width/2) <= (posB.x) || (posA.x - posA.width/2) >= (posB.x + posB.width)){
        return false;
    }else{
        if((posA.y - posA.width/2) >= posB.y-105 && (posA.y + posA.width/2) <= posB.y){
            return false;
        }
        return true;
    }
}

class Player{
    constructor(){
        this.x = 200;
        this.y = 200;
        this.gravity_speed = 0;
        this.gravity = 0.5;
        this.is_jumping = false;
    }

    draw(){
        drawCircle(this.x,this.y,20,'#ff383b');
        drawCircle(this.x + 10, this.y - 5, 10, 'white');
        drawCircle(this.x + 15, this.y - 5, 5, 'black');
        this.move();
    }

    move(){
        let jump = () => {
            this.gravity_speed += -this.gravity_speed-8;
            pula = false;
        }
        pula ? jump() : this.gravity_speed += this.gravity;
        this.y += this.gravity_speed;
        if(this.y <= 20){
            this.y = 20;
        }
    }

    getBounds(){
        return{
            x: 200,
            y: this.y,
            width: 20
        }
    }

    checkBottom(){
        if(this.y >= 478){
            return true;
        }
    }
}

class Obstacle{
    constructor(){
        this.x = canvas.width;

        this.bar1_height = 180;
        this.bar2_height = 180;

        this.speed_x = 5;

        this.sort_height_add = sortNumber();
        this.sort_height_diff = (sortNumber()/10)%2;

        if(this.sort_height_diff!==0){
            this.sort_height_diff = 1;
        } else{
            this.sort_height_diff = -1;
        }

        this.bar1_height = this.bar1_height + (this.sort_height_add * this.sort_height_diff);
        this.bar2_height = this.bar2_height + (this.sort_height_add * -this.sort_height_diff);
    }

    draw(){
        //barra de cima
        drawRect(this.x, 0, 50, this.bar1_height, '#509242');
        drawRect(this.x, 0, 6, this.bar1_height, '#9acd32');
        drawRect(this.x, 0, 2, this.bar1_height, '#e2eb6e');
        drawRect(this.x - 5, this.bar1_height-22, 60, 5, '#006400');
        drawRect(this.x - 5, this.bar1_height-20, 60, 20, '#509210');
        //barra de baixo
        drawRect(this.x, 488 - this.bar2_height, 50, this.bar2_height, '#509242');
        drawRect(this.x, 488 - this.bar2_height, 6, this.bar2_height, '#9acd32');
        drawRect(this.x, 488 - this.bar2_height, 2, this.bar2_height, '#e2eb6e');
        drawRect(this.x - 5, 506 - this.bar2_height, 60, 5, '#006400');
        drawRect(this.x - 5, 488 - this.bar2_height, 60, 20, '#509210');
        this.move();
    }

    move(){
        this.x -= this.speed_x;
    }

    getBounds(){
        return{
            x: this.x,
            y: this.bar1_height + 115,
            width: 50
        }
    }

    checkPosition(){
        return this.x;
    }

}