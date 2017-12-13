var canvas, canvasContext;

var mouseX=0;
var mouseY=0 ;

function mouseupHandler(evt){
	isBallHeld=false;
}

function updateMousePos(evt){
	var rect=canvas.getBoundingClientRect();
	var root=document.documentElement;
	
	mouseX=evt.clientX-rect.left-root.scrollLeft;
	mouseY=evt.clientY-rect.top-root.scrollTop;
	
	paddleX=mouseX - PADDLE_WIDTH/2;
	//cheat/hack to test ball in any position
	//ballX=mouseX;
	//ballY=mouseY;
	//ballSpeedX=4;
	//ballSpeedY=-4;
}

window.onload=function(){
	canvas=document.getElementById('gameCanvas');
	canvasContext=canvas.getContext('2d');
	
	var framesPerSecond=30;
	setInterval(updateAll, 1000/framesPerSecond);
	
	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('mouseup', mouseupHandler);

	brickReset();
	ballReset();
}

function moveAll(){
	ballMove();
	ballBrickHandling();
	ballPaddleHandling();	
}

function drawAll(){
	colorRect(0,0,canvas.width,canvas.height, 'black'); 
	
	colorCircle(ballX,ballY,10,'white');
	
	colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
	
	drawBricks();
	colorText(score,650,50,'white');
    colorText(lives,150,50,'red');
}
