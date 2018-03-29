const STARTING_BALL_SPEED_X=5;
const STARTING_BALL_SPEED_Y=7;
const BALL_RADIUS=10;

function ballClass(){
	this.ballX=75;
	this.ballSpeedX=5;
	this.ballY=75;
	this.ballSpeedY=7;

	this.isBallHeld=false;

	this.isInPlay=true;

	this.ballHits=0;
	this.timesSpeedIncrease=1;
	this.hitsSpeedIncrease=5;
	this.highestBrickHit=0; //keeping this in case I want to change speed of the ball
	//based on how high it landed

	this.brickHit=false;

	this.increaseSpeed=function (increase){
		var currentVelocity=Math.sqrt(this.ballSpeedX*this.ballSpeedX+this.ballSpeedY*this.ballSpeedY)
		var normalX=this.ballSpeedX/currentVelocity;
		var normalY=this.ballSpeedY/currentVelocity;
		this.ballSpeedX=normalX*(1+increase)*currentVelocity;
		this.ballSpeedY=normalY*(1+increase)*currentVelocity;
	}

	this.ballReset=function(){
		this.isBallHeld=true;
		this.isInPlay=true;
		this.ballHits=0;
		this.highestBrickHit=0;
		this.hitsSpeedIncrease=5;
		this.timesSpeedIncrease=1;
		this.ballSpeedY=STARTING_BALL_SPEED_Y;
		this.ballSpeedX=STARTING_BALL_SPEED_X;
		if(lives==0 || bricksLeft==0)
			gameReset();
	}

	this.ballMove=function(){
		if(this.isBallHeld){
			this.ballX=paddleX+20;
			this.ballY=canvas.height-PADDLE_DIST_FROM_EDGE-PADDLE_THICKNESS-5;
		}
		else{
			this.ballX+=this.ballSpeedX;
			this.ballY+=this.ballSpeedY;
			
			if(this.ballX>canvas.width && this.ballSpeedX>0.0){ //right
				this.ballSpeedX*=-1;
			}
			if(this.ballX<0 && this.ballSpeedX<0.0){ //left
				this.ballSpeedX*=-1;
			}

			if(this.ballY<0 && this.ballSpeedY<0.0){ //top
				this.ballSpeedY*=-1;
			}
			
			if(this.ballY>canvas.height){ //bottom
				if(!is_multiball){
				lives--;
				this.ballReset();
				}
				else{
					this.isInPlay=false;
					ballsLeft--;
				}
			}
		}
	}

	this.ballPaddleHandling=function(){

		var paddleTopEdgeY=canvas.height-PADDLE_DIST_FROM_EDGE;
		var paddleBottomEdgeY=paddleTopEdgeY + PADDLE_THICKNESS;
		var paddleLeftEdgeX=paddleX;
		var paddleRightEdgeX=paddleLeftEdgeX+ PADDLE_WIDTH;
		
		if(	this.ballY> paddleTopEdgeY && 
			this.ballY<paddleBottomEdgeY && 
			this.ballX>paddleLeftEdgeX && 
			this.ballX<paddleRightEdgeX){
				this.ballHits+=1;
				this.ballSpeedY*=-1;
				this.brickHit=false;
				
				var centerOfPaddleX=paddleX+PADDLE_WIDTH/2;
				var ballDistFromPaddCenterX=this.ballX-centerOfPaddleX;
				this.ballSpeedX=ballDistFromPaddCenterX*0.35;
				
				if(this.ballHits==this.hitsSpeedIncrease){
					this.timesSpeedIncrease++;
					this.hitsSpeedIncrease+=5*this.timesSpeedIncrease;
					this.increaseSpeed(0.20);
					console.log(this.ballSpeedX);
					console.log(this.ballSpeedY);
				}//increasing speed
			}//ball center inside paddle
	}//end of ballPaddleHandling


	this.ballBrickHandling=function(){
		var left=false; 
		var right=false; 
		var top=false; 
		var bottom=false;
		var ballBrickCol;
		var ballBrickRow;
		if(isBrickHere(this.ballX-BALL_RADIUS,this.ballY)){
			//console.log("USO levo!");
			left=true;
			ballBrickCol = Math.floor((this.ballX-BALL_RADIUS)/BRICK_W);
			ballBrickRow = Math.floor(this.ballY/BRICK_H);
		}
		if(isBrickHere(this.ballX+BALL_RADIUS,this.ballY)){
			//console.log("USO desno!");
			right=true;
			ballBrickCol = Math.floor((this.ballX+BALL_RADIUS)/BRICK_W);
			ballBrickRow = Math.floor(this.ballY/BRICK_H);
		}
		if(isBrickHere(this.ballX,this.ballY-BALL_RADIUS)){
			//console.log("USO gore!");
			top=true;
			ballBrickCol = Math.floor(this.ballX/BRICK_W);
			ballBrickRow = Math.floor((this.ballY-BALL_RADIUS)/BRICK_H);
		}
		if(isBrickHere(this.ballX,this.ballY+BALL_RADIUS)){
			//console.log("USO dole!");
			bottom=true;
			ballBrickCol = Math.floor(this.ballX/BRICK_W);
			ballBrickRow = Math.floor((this.ballY+BALL_RADIUS)/BRICK_H);
		}
		
		var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

		if(ballBrickCol>=0 && ballBrickCol<BRICK_COLS &&
		   ballBrickRow>=0 && ballBrickRow<BRICK_ROWS){
			if(isBrickAtColRow(ballBrickCol, ballBrickRow) && (modernPlay || !brickHit)){
				//console.log("USO!");
				this.brickHit=true;
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
					this.ballReset();
				}//out of bricks
				
				if(score>=newLifePoints){
					lives++;
					newLifePoints*=3;
				} //adding new life
				//console.log(bricksLeft);
				
				if((BRICK_ROWS-ballBrickRow)>this.highestBrickHit)
					this.highestBrickHit=BRICK_ROWS-ballBrickRow;
				//keeping track of highest hit brick since ball reset
				
				if(modernPlay){
					if(left==true && this.ballSpeedX<0)
						this.ballSpeedX*=-1;
					
					if(right==true && this.ballSpeedX>0)
						this.ballSpeedX*=-1;
				}
				if(top==true && this.ballSpeedY<0)
					this.ballSpeedY*=-1;
				
				if(bottom==true && this.ballSpeedY>0)
					this.ballSpeedY*=-1;
				//new collision checks and movement changes
				
			} //end of brick found
		} //end of valid col and row
	} //end of ballBrickHandling func
	
	this.drawBall=function(){
		if(this.isInPlay)
			drawBitmapCentered(ballPic,this.ballX, this.ballY);
	}

}//end of ball class
