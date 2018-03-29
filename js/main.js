var canvas, canvasContext;

var mouseX=0;
var mouseY=0;

var showingStartMenu=true;
var showingWinScreen=false;

var endingScore=0;

function mouseupHandler(evt){
	if(showingStartMenu){
		showingStartMenu=false;
		return;
	}
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
	
	canvasContext.fillText("LOADING IMAGES", canvas.width/2, canvas.height/2);
	
	loadImages();
	
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond=30;
	setInterval(updateAll, 1000/framesPerSecond);
	
	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('mouseup', mouseupHandler);

	brickReset(levelOne);
	ballReset();	
}

function updateAll(){ 
	moveAll();
	drawAll();
}

function moveAll(){
	if(showingStartMenu)
		return;
	ballMove();
	ballBrickHandling();
	ballPaddleHandling();	
}

function drawAll(){
	colorRect(0,0,canvas.width,canvas.height, 'black'); 
	
	if(showingStartMenu){
		drawBitmap(startPic, 0,0);
		canvasContext.fillStyle='white';
		canvasContext.fillText('Move paddle with mouse to hit ball and break all bricks',278,250);
		canvasContext.fillText('Click to start new game',350,445);
		if(endingScore>0){
			canvasContext.fillText('Last score:',375,200);
			canvasContext.fillText(endingScore,390,220);
		}
		return;
	}
	else{
	drawBitmap(backgroundPic,0,0);
	//colorCircle(ballX,ballY,10,'white');
	drawBitmapCentered(ballPic,ballX, ballY);
	
	//colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
	drawBitmapCentered(playerPic, paddleX+PADDLE_WIDTH/2, canvas.height-PADDLE_DIST_FROM_EDGE+PADDLE_THICKNESS/2);	
	drawBricks();
	colorText(score,700,50,'white');
	for(i=0; i<lives; i++)
		drawBitmap(healthPic, 50+i*18,35);
	}
}
