var canvas, canvasContext;
var clock=0;

const KEY_1=49;
const KEY_2=50;
const KEY_3=51;
const KEY_4=52;
const KEY_5=53;

var mouseX=0;
var mouseY=0;

var showingStartMenu=true;
var showingGameOver=false;
var showingWinScreen=false;

var endingScore=0;

function mouseupHandler(evt){
	if(showingStartMenu){
		showingStartMenu=false;
		return;
	}
	if(showingWinScreen){
		clock=0;
		showingWinScreen=false;
		return;
	}
	if(showingGameOver){
		clock=0;
		showingGameOver=false;
		return;
	}
	if(is_cannon)
		createBullets();
	for(var i=0; i<3; i++)
		balls[i+1].isBallHeld=false;

}

function keyReleased(evt){
	if(evt.keyCode==KEY_1){
		//fireball
		is_fireball+=600;
		console.log("1");
	}
	if(evt.keyCode==KEY_2){
		//sticky ball
		is_sticky=1;
		console.log("2");
	}	
	if(evt.keyCode==KEY_3){
		//multiball
		if(!is_multiball){
			createMultiball();
		}
		console.log("3");
	}
	if(evt.keyCode==KEY_4){
		//cannon
		is_cannon+=600;
		console.log("4");
	}
	if(evt.keyCode==KEY_5){
		//points
		is_points=1;
		console.log("5");
	}
	
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
	document.addEventListener('keyup',keyReleased);

	brickReset(levelOne);
	createBalls();	
}

function updateAll(){ 
	updateBalls();
	moveAll();
	drawAll();
	updatePowerups();
}

function moveAll(){
	if(showingStartMenu || showingWinScreen)
		return;
	moveBalls();
}

function drawAll(){
	colorRect(0,0,canvas.width,canvas.height, 'black'); 
	
	if(showingStartMenu){
		drawBitmap(startPic, 0,0);
		canvasContext.fillStyle='red';
		canvasContext.font="15px Consolas";
		canvasContext.fillText('Move paddle with mouse to hit ball and break all bricks',190,520);
		canvasContext.fillStyle='purple';
		canvasContext.fillText('Click to start new game',305,180);
		if(endingScore>0){
			canvasContext.fillText('Last score:',355,220);
			canvasContext.fillText(endingScore,380,250);
		}
		canvasContext.font="bold 35px Bahnschrift";
		canvasContext.fillText('BRICK BREAKER',270,80);
		return;
	}
	else if(showingGameOver){
		drawBitmap(animatedPicsGo[clock++],0,0);
		if(clock==ANIMATED_FRAMES_GO)
			clock=0;
		canvasContext.fillStyle='White';
		canvasContext.font="15px Consolas";
		canvasContext.fillText('Click to start new game',300,50);
		canvasContext.font="bold 35px Consolas";
		canvasContext.fillText('GAME OVER',50,50);	
		if(endingScore>0){
			canvasContext.fillText('Last score:',560,50);
			canvasContext.fillText(endingScore,630,90);
		}
	}
	else if(showingWinScreen){
		//drawBitmap(winPic,0,0);
		drawBitmap(animatedPicsWin[clock++],0,0);
		if(clock==ANIMATED_FRAMES_WIN)
			clock=0;
		canvasContext.fillStyle='White';
		canvasContext.font="30px Consolas";
		canvasContext.fillText('Good job, you have won!',80,140);
		canvasContext.fillText('Click to start new game',350,80);
		
	}
	else{
		if(level==1)
			drawBitmap(level1Pic,0,0);
		if(level==2)
			drawBitmap(level2Pic,0,0);
		if(level==3)
			drawBitmap(level3Pic,0,0);
	
	//colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
	if(!is_cannon)
		drawBitmapCentered(playerPic, paddleX+PADDLE_WIDTH/2, canvas.height-PADDLE_DIST_FROM_EDGE+PADDLE_THICKNESS/2);
	else
		drawBitmapCentered(cannonPic, paddleX+PADDLE_WIDTH/2, canvas.height-PADDLE_DIST_FROM_EDGE+PADDLE_THICKNESS/2);
	drawBricks();
	drawBalls();
	drawPowerups();
	colorText(score,700,50,'white');
	for(i=0; i<lives; i++)
		drawBitmap(healthPic, 50+i*18,35);
	}
}
