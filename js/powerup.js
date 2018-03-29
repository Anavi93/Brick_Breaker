var modernPlay=true;
var score=0;
var lives=3;

var balls=[];

var is_fireball=0;
var is_multiball=0;
var is_sticky=0;
var is_cannon=0;

var ballsLeft=0;

var newLifePoints=10000;

function gameReset(){
	showingStartMenu=true;
	endingScore=score;
	newLifePoints=10000;
	lives=3;
	score=0;
	brickReset(levelOne);
}

function updatePowerups(){
	if(is_fireball>0)
		is_fireball--;
	if(is_multiball>0)
		if(ballsLeft==0){
			is_multiball=0;
			balls[1].ballReset();
		}			
	if(is_sticky>0)
		is_sticky--;	
	if(is_cannon>0)
		is_cannon--;
}

function createMultiball(){
		ballsLeft=3;
		balls[2]=new ballClass();
		balls[2].ballX=balls[1].ballX;
		balls[2].ballY=balls[1].ballY;
		balls[2].ballSpeedX=balls[1].ballSpeedX+3;
		balls[2].ballSpeedY=balls[1].ballSpeedY;
		balls[3]=new ballClass();
		balls[3].ballX=balls[1].ballX;
		balls[3].ballY=balls[1].ballY;
		balls[3].ballSpeedX=-balls[1].ballSpeedX-3;
		balls[3].ballSpeedY=balls[1].ballSpeedY;
}

function moveBalls(){
	balls[1].ballMove();
	balls[1].ballBrickHandling();
	balls[1].ballPaddleHandling();
	if(is_multiball){
		if(balls[2].isInPlay){
			balls[2].ballMove();
			balls[2].ballBrickHandling();
			balls[2].ballPaddleHandling();
		}
		if(balls[3].isInPlay){
			balls[3].ballMove();
			balls[3].ballBrickHandling();
			balls[3].ballPaddleHandling();
		}
	}
}

function drawBalls(){
	balls[1].drawBall();
	if(is_multiball){
		balls[2].drawBall();
		balls[3].drawBall();
	}
		
}