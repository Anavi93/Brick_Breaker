var modernPlay=true;
var score=0;
var lives=3;

var balls=[];

var is_fireball=0;
var is_multiball=0;
var is_sticky=0;
var is_cannon=0;

var ballsLeft=1;
var lastBall=1;
var newLifePoints=10000;

function updatePowerups(){
	if(is_fireball>0)
		is_fireball--;
	if(is_multiball>0)
		updateMultiball();	
	if(is_sticky>0)
		is_sticky--;	
	if(is_cannon>0)
		is_cannon--;
}

function createBalls(){
	balls[1]=new ballClass();
	balls[2]=new ballClass();
	balls[3]=new ballClass();
	balls[1].ballReset();
}

function gameReset(){
	showingStartMenu=true;
	endingScore=score;
	newLifePoints=10000;
	lives=3;
	score=0;
	brickReset(levelOne);
}

function updateMultiball(){
	if(ballsLeft==1){
		is_multiball=0;
		console.log("Poslednja loptica!");
		for(i=0; i<3; i++){
			if(balls[i+1].isInPlay){
				lastBall=i+1;
			}
		console.log(lastBall);
		}
	if(ballsLeft==0){
		is_multiball=0;
		ball[lastBall].restart();
	}
	}		
}

function createMultiball(){
		is_multiball=1;
		ballsLeft=3;
		var i;
		for(i=1; i<4; i++){
			if(i!=lastBall){
				balls[i].setBall(balls[lastBall].ballX,balls[lastBall].ballY,-balls[lastBall].ballSpeedX-3*i,balls[lastBall].ballSpeedY);
			}
		}
}

function moveBalls(){
	for(var i=0; i<3; i++)
		if(balls[i+1].isInPlay){
			balls[i+1].ballMove();
			balls[i+1].ballBrickHandling();
			balls[i+1].ballPaddleHandling();
		}

}

function drawBalls(){
	for(var i=0; i<3; i++)
		if(balls[i+1].isInPlay)
			balls[i+1].drawBall();
}
		