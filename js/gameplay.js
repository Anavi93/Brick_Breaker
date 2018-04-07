const NUM_LEVELS=3;

var level=1;

var is_fireball=0;
var is_multiball=0;
var is_sticky=0;
var is_cannon=0;
var is_points=0;

var modernPlay=true;
var score=0;
var lives=3;

var balls=[];
var bullets=[];
var powerups=[];

var ballsLeft=1;
var lastBall=1;
var newLifePoints=20000;

function updatePowerups(){
	clearPowerups();
	movePowerups();
	if(is_fireball>0)
		is_fireball--;
	if(is_multiball>0)
		updateMultiball();	
	if(is_sticky>0)
		is_sticky--;	
	if(is_cannon>0){
		is_cannon--;
		if(is_cannon==0)
			bullets=[];
		clearBullets();
		moveBullets();
		drawBullets();
	}
	if(is_points>0){
		is_points--;
		score+=250;
	}
}

function clearPowerups(){
	for(var i=0; i<powerups.length; i++)
		if(!powerups[i].isAlive)
			powerups.splice(i,1);
}

function drawPowerups(){
	for(var i=0; i<powerups.length; i++)
		if(powerups[i].isAlive)
			powerups[i].draw();
}

function movePowerups(){
	for(var i=0; i<powerups.length; i++)
		if(powerups[i].isAlive)
			powerups[i].move();
}

function createBalls(){
	balls[1]=new ballClass();
	balls[2]=new ballClass();
	balls[3]=new ballClass();
	balls[1].ballReset();
}

function createBullets(){
	var bullet1=new bulletClass();
	bullet1.createNew(paddleX+5, canvas.height-PADDLE_DIST_FROM_EDGE-PADDLE_THICKNESS-5);
	var bullet2=new bulletClass();
	bullet2.createNew(paddleX+PADDLE_WIDTH-5, canvas.height-PADDLE_DIST_FROM_EDGE-PADDLE_THICKNESS-5);
	bullets.push(bullet1);
	bullets.push(bullet2);
}

function clearBullets(){
	for(var i=0; i<bullets.length; i++)
		if(!bullets[i].isAlive)
			bullets.splice(i,1);
}

function moveBullets(){
	for(var i=0; i<bullets.length; i++){
		if(bullets[i].isAlive)
			bullets[i].moveBullet();
	}
}

function drawBullets(){
	for(var i=0; i<bullets.length; i++){
		if(bullets[i].isAlive)
			bullets[i].drawBullet();
	}
}

function updateBalls(){
	if(ballsLeft==0)
		balls[lastBall].ballReset;
}

function gameReset(){
	level=1;
	if(!showingWinScreen){
		showingStartMenu=true;
	}
}

function levelReset(){
	if(lives==0)
		gameReset();
	else
		balls[lastBall].ballReset();
}

function nextLevel(){
	level++;
	endingScore=score;
	newLifePoints=20000;
	lives=3;
	score=0;
	bullets=[];
	for(var i=1; i<4; i++)
		balls[i].isInPlay=false;
	balls[lastBall].ballReset();
	if(level>NUM_LEVELS){
				level=1;
				showingWinScreen=true;
				gameReset();
				brickReset(levelOne);
			}
	else{
		if(level==1)
			brickReset(levelOne);
		if(level==2)
			brickReset(levelTwo);
		if(level==3)
			brickReset(levelThree);
	}
}

function updateMultiball(){
	if(ballsLeft==1){
		is_multiball=0;
		console.log("Poslednja loptica!");
		for(i=0; i<3; i++){
			if(balls[i+1].isInPlay){
				lastBall=i+1;
			}
		}
		console.log(lastBall);
		}
	if(ballsLeft==0){
		is_multiball=0;
		balls[lastBall].ballReset();
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

		