var canvas;
var canvasContext;
var fps = 60;
var player;
var obstacles;
var is_playing = false;
var commands = [];
var lastCommand = Date.now();

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    obstacles = [];
    player = new Player;
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
            if (currentTime - lastCommand > 1000/fps){
                commands = [];
            }

            commands.push(1);
            lastCommand = currentTime;
            break;
    }
});

setInterval(() => {
    if(is_playing) draw();
}, 1000/fps);

setInterval(() => {
    if(is_playing) obstacles.push(new Obstacle);
}, 1000);

function draw(){
    drawBackground();
    obstacles.forEach(obstacle => {
        obstacle.draw();
        if(obstacle.checkPosition() <= 0){
            obstacle = null;
        }
    });

    player.draw();
    if(commands.length > 0){
        player.jump();
    }
    if(player.checkBottom()){
        is_playing = false;
    }
}

function drawBackground(){
    drawRect(0, 0, canvas.width, canvas.height, '#95cfca');
    drawRect(0, 488, canvas.width, 110, '#000000');
    drawRect(0,490,canvas.width, 110, '#fad87d');
    drawRect(0, 491, canvas.width, 20, '#509242');
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

function sortNumber() {
    var random_number=Math.floor(Math.random()*11)*10;
    while (random_number < 50){
        random_number=Math.floor(Math.random()*11)*10;
    }
    return random_number;
}

class Player{
    constructor(){
        this.y = 200;
        this.gravity_speed = 0;
        this.gravity = 0.1;
        this.is_jumping = false;
    }

    draw(){
        drawCircle(200,this.y,20,'#ff383b');
        this.move();
    }

    move(){
        this.gravity_speed += this.gravity;
        this.y += this.gravity_speed;
        if(this.y <= 20){
            this.y = 20;
        }
    }

    jump(){
        if(!this.is_jumping){
            this.is_jumping = true;
            this.gravity = -0.2;
            commands = [];
            setInterval(() => {
                this.is_jumping = false;
                this.gravity = 0.1;
            }, 200);
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
        this.bar1_x = canvas.width;
        this.bar2_x = canvas.width;

        this.bar1_height = 219;
        this.bar2_height = 219;

        this.speed_x = 5;

        this.sort_height_add = sortNumber()*2;
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
        drawRect( this.bar1_x, 0, 50, this.bar1_height, '#509242');
        drawRect( this.bar2_x, 488-this.bar2_height, 50, this.bar2_height, '#509242');
        this.move();
    }

    move(){
        this.bar1_x -= this.speed_x;
        this.bar2_x -= this.speed_x;
    }

    checkPosition(){
        return this.bar1_x;
    }
}