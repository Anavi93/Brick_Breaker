const STARTING_BALL_SPEED_X=5;
const STARTING_BALL_SPEED_Y=7;
const BALL_RADIUS=10;

var ballX=75;
var ballSpeedX=5;
var ballY=75;
var ballSpeedY=7;
var score=0;
var lives=3;
var isBallHeld=true;

var ballHits=0;
var timesSpeedIncrease=1;
var hitsSpeedIncrease=5;
var highestBrickHit=0; //keeping this in case I wan t to change speed of the ball
//based on how high it landed

var newLifePoints=10000;

var modernPlay=true;
var brickHit=false;

function increaseSpeed(increase){
	var currentVelocity=Math.sqrt(ballSpeedX*ballSpeedX+ballSpeedY*ballSpeedY)
	var normalX=ballSpeedX/currentVelocity;
	var normalY=ballSpeedY/currentVelocity;
	ballSpeedX=normalX*(1+increase)*currentVelocity;
	ballSpeedY=normalY*(1+increase)*currentVelocity;
}

function ballReset(){
	isBallHeld=true;
	ballHits=0;
	highestBrickHit=0;
	hitsSpeedIncrease=5;
	timesSpeedIncrease=1;
	ballSpeedY=STARTING_BALL_SPEED_Y;
	ballSpeedX=STARTING_BALL_SPEED_X;
	if(lives==0 ||bricksLeft==0)
		gameReset();
}

function gameReset(){
	showingStartMenu=true;
	endingScore=score;
	newLifePoints=10000;
	lives=3;
	score=0;
	brickReset(levelOne);
}

function ballMove(){
	if(isBallHeld){
		ballX=paddleX+20;
		ballY=canvas.height-PADDLE_DIST_FROM_EDGE-PADDLE_THICKNESS-5;
	}
	else{
		ballX+=ballSpeedX;
		ballY+=ballSpeedY;
		
		if(ballX>canvas.width && ballSpeedX>0.0){ //right
			ballSpeedX*=-1;
		}
		if(ballX<0 && ballSpeedX<0.0){ //left
			ballSpeedX*=-1;
		}

		if(ballY<0 && ballSpeedY<0.0){ //top
			ballSpeedY*=-1;
		}
		
		if(ballY>canvas.height){ //bottom
			lives--;
			ballReset();
		}
	}
}

function ballPaddleHandling(){

	var paddleTopEdgeY=canvas.height-PADDLE_DIST_FROM_EDGE;
	var paddleBottomEdgeY=paddleTopEdgeY + PADDLE_THICKNESS;
	var paddleLeftEdgeX=paddleX;
	var paddleRightEdgeX=paddleLeftEdgeX+ PADDLE_WIDTH;
	
	if(	ballY> paddleTopEdgeY && 
		ballY<paddleBottomEdgeY && 
		ballX>paddleLeftEdgeX && 
		ballX<paddleRightEdgeX){
			ballHits+=1;
			ballSpeedY*=-1;
			brickHit=false;
			
			var centerOfPaddleX=paddleX+PADDLE_WIDTH/2;
			var ballDistFromPaddCenterX=ballX-centerOfPaddleX;
			ballSpeedX=ballDistFromPaddCenterX*0.35;
			
			if(ballHits==hitsSpeedIncrease){
				timesSpeedIncrease++;
				hitsSpeedIncrease+=5*timesSpeedIncrease;
				increaseSpeed(0.20);
				console.log(ballSpeedX);
				console.log(ballSpeedY);
			}//increasing speed
		}//ball center inside paddle
}//end of ballPaddleHandling

function rowColToArrayIndex(col,row){
	return col + BRICK_COLS*row;
} 

function isBrickHere(x,y){
	var brickCol=Math.floor(x/BRICK_W);
	var brickRow = Math.floor(y/BRICK_H);
	if(isBrickAtColRow(brickCol, brickRow)){
		return true;
	}
	else
		return false;
}

function ballBrickHandling(){
	var left=false; 
	var right=false; 
	var top=false; 
	var bottom=false;
	var ballBrickCol;
	var ballBrickRow;
	if(isBrickHere(ballX-BALL_RADIUS,ballY)){
		console.log("USO levo!");
		left=true;
		ballBrickCol = Math.floor((ballX-BALL_RADIUS)/BRICK_W);
		ballBrickRow = Math.floor(ballY/BRICK_H);
	}
	if(isBrickHere(ballX+BALL_RADIUS,ballY)){
		console.log("USO desno!");
		right=true;
		ballBrickCol = Math.floor((ballX+BALL_RADIUS)/BRICK_W);
		ballBrickRow = Math.floor(ballY/BRICK_H);
	}
	if(isBrickHere(ballX,ballY-BALL_RADIUS)){
		console.log("USO gore!");
		top=true;
		ballBrickCol = Math.floor(ballX/BRICK_W);
		ballBrickRow = Math.floor((ballY-BALL_RADIUS)/BRICK_H);
	}
	if(isBrickHere(ballX,ballY+BALL_RADIUS)){
		console.log("USO dole!");
		bottom=true;
		ballBrickCol = Math.floor(ballX/BRICK_W);
		ballBrickRow = Math.floor((ballY+BALL_RADIUS)/BRICK_H);
	}
	
	var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

	if(ballBrickCol>=0 && ballBrickCol<BRICK_COLS &&
	   ballBrickRow>=0 && ballBrickRow<BRICK_ROWS){
		if(isBrickAtColRow(ballBrickCol, ballBrickRow) && (modernPlay || !brickHit)){
			console.log("USO!");
			brickHit=true;
			switch(brickGrid[brickIndexUnderBall]){
				case BRICK3:
					brickGrid[brickIndexUnderBall]=BRICK3_DAM1;
					break;
				case BRICK3_DAM1:
					brickGrid[brickIndexUnderBall]=BRICK3_DAM2;
					break;
				case BRICK3_DAM2:
					brickGrid[brickIndexUnderBall]=0;
					bricksLeft--;
					break;
				case BRICK2:
					brickGrid[brickIndexUnderBall]=BRICK2_DAM;
					break;
				case BRICK2_DAM:
					brickGrid[brickIndexUnderBall]=0;
					bricksLeft--;
					break;
				case BRICK1:
					brickGrid[brickIndexUnderBall]=0;
					bricksLeft--;
					break;
					
			}//detecting which brick is hit			
			score+=(BRICK_ROWS-ballBrickRow)*100;
						
			if(bricksLeft==0){
				ballReset();
			}//out of bricks
			
			if(score>=newLifePoints){
				lives++;
				newLifePoints*=3;
			} //adding new life
			//console.log(bricksLeft);
			
			if((BRICK_ROWS-ballBrickRow)>highestBrickHit)
				highestBrickHit=BRICK_ROWS-ballBrickRow;
			//keeping track of highest hit brick since ball reset
			
			if(modernPlay){
				if(left==true && ballSpeedX<0)
					ballSpeedX*=-1;
				
				if(right==true && ballSpeedX>0)
					ballSpeedX*=-1;
			}
			if(top==true && ballSpeedY<0)
				ballSpeedY*=-1;
			
			if(bottom==true && ballSpeedY>0)
				ballSpeedY*=-1;
			//new collision checks and movement changes
			
		} //end of brick found
	} //end of valid col and row
} //end of ballBrickHandling func
