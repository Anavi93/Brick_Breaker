const STARTING_BALL_SPEED_X=5;
const STARTING_BALL_SPEED_Y=7;
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
var highestBrickHit=0;

var newLifePoints=10000;

function increaseSpeed(increase){
	var normalX=ballSpeedX/Math.sqrt(ballSpeedX*ballSpeedX+ballSpeedY*ballSpeedY);
	var normalY=ballSpeedY/Math.sqrt(ballSpeedX*ballSpeedX+ballSpeedY*ballSpeedY);
	ballSpeedX=normalX*increase;
	ballSpeedY=normalY*increase;
}

function ballReset(){
	isBallHeld=true;
	ballHits=0;
	highestBrickHit=0;
	ballSpeedY=STARTING_BALL_SPEED_Y;
	ballSpeedX=STARTING_BALL_SPEED_X;
	if(lives==0)
		gameReset();
}

function gameReset(){
	showingStartMenu=true;
	endingScore=score;
	lives=3;
	score=0;
	brickReset();
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
			
			var centerOfPaddleX=paddleX+PADDLE_WIDTH/2;
			var ballDistFromPaddCenterX=ballX-centerOfPaddleX;
			ballSpeedX=ballDistFromPaddCenterX*0.35;
			
			if(ballHits==hitsSpeedIncrease){
				timesSpeedIncrease++;
				hitsSpeedIncrease+=5*timesSpeedIncrease;
				increaseSpeed(8+3*timesSpeedIncrease);
				console.log(ballSpeedX);
				console.log(ballSpeedY);
			}//increasing speed
			
			if(bricksLeft==0){
				brickReset();
			}//out of bricks
		}//ball center inside paddle
}//end of ballPaddleHandling

function rowColToArrayIndex(col,row){
	return col + BRICK_COLS*row;
} 

function ballBrickHandling(){

	var ballBrickCol = Math.floor(ballX/BRICK_W);
	var ballBrickRow = Math.floor(ballY/BRICK_H);
	var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

	if(ballBrickCol>=0 && ballBrickCol<BRICK_COLS &&
	   ballBrickRow>=0 && ballBrickRow<BRICK_ROWS){
		if(isBrickAtColRow(ballBrickCol, ballBrickRow)){
			brickGrid[brickIndexUnderBall]=false;
			bricksLeft--;
			score+=(BRICK_ROWS-ballBrickRow)*100;
			if(score>=newLifePoints){
				lives++;
				newLifePoints*=3;
			}
			//console.log(bricksLeft);
			
			if((BRICK_ROWS-ballBrickRow)>highestBrickHit)
				highestBrickHit=BRICK_ROWS-ballBrickRow;
			//keeping track of highest hit brick since ball reset
			
			var prevBallX=ballX-ballSpeedX;
			var prevBallY=ballY-ballSpeedY;
			var prevBrickCol=Math.floor(prevBallX/BRICK_W);
			var prevBrickRow=Math.floor(prevBallY/BRICK_H);
			
			var bothTestsFailed=true;
			
			if(prevBrickCol !=ballBrickCol){
				if(isBrickAtColRow(prevBrickCol, ballBrickRow)==false){
					ballSpeedX *=-1;
					bothTestsFailed=false;
				}
			}
			if(prevBrickRow != ballBrickRow){
				if(isBrickAtColRow(ballBrickCol, prevBrickRow)==false){
					ballSpeedY *=-1;
					bothTestsFailed=false;
				}
			}
			
			if(bothTestsFailed){ //armpit case 
				ballSpeedX *=-1;
				ballSpeedY *=-1;
			}
			
		} //end of brick found
	} //end of valid col and row
} //end of ballBrickHandling func
