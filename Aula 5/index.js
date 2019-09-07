  var delta = 0;
  var lastFrameTimeMs = 0;
  var timeStep = 1000/60;
  var paddleX = 350;
  var rectSize = 100;
  var ballX = 400;
  var ballY = 300;
  var ballSpeedX = 0.5;
  var ballSpeedY = 0.5;
  // save the canvas for dimensions, and its 2d context for drawing to it
  var canvas, canvasContext;
  
  function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    // account for the margins, canvas position on page, scroll amount, etc.
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
      x: mouseX,
      y: mouseY
    };
  }

  
  function mainLoop(timeStamp) {
		if(timeStamp < lastFrameTimeMs + timeStep) {
			requestAnimationFrame(mainLoop);
			return;
		}
		delta += timeStamp - lastFrameTimeMs;
		lastFrameTimeMs = timeStamp;
		while(delta >= timeStep) {
			moveEverything(timeStep); 
			delta -= timeStep;
		}
		drawEverything();
		requestAnimationFrame(mainLoop);
  }
  
  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

	requestAnimationFrame(mainLoop);
      
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        //Add here logic to change the vertical position of the paddle according to the mouse position
        if(mousePos.x >= rectSize/2 && mousePos.x <= canvas.width-(rectSize/2)) paddleX = mousePos.x - (rectSize/2)
      } );
      
  }
    
  //Draws a rectangle
  function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight); 
  }
  
  //Draws a circle
  function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
  }
  
  //Draws a text
  function colorText(showWords, textX, textY, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
  }
  
  function moveEverything(deltaP) {
    //Add here logic for moving things
    if (ballY > 590){
        ballReset();
    }

    ballX += ballSpeedX * deltaP;
    ballY += ballSpeedY * deltaP;

    if(ballY >= canvas.height-10 || ballY <= 10){
        ballSpeedY *= -1;
    }
    if(ballX >= canvas.width-10 || ballX <= 10){
        ballSpeedX *= -1;
    }
    if(ballX >= paddleX+5 && ballX <= paddleX+rectSize-5 && ballY >= 545 && ballY <= 560){
        ballSpeedX *= -1;
        ballSpeedY *= -1;
    }
  }

  function drawEverything() {
    // clear the game view by filling it with black
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    //Add here logic for drawing things
    colorRect(paddleX, 550, rectSize, 10, 'white');
    colorCircle(ballX, ballY, 10, 'white');
  }

  function ballReset(){
      ballX = 400;
      ballY = 300;
  }