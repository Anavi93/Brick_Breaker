const PADDLE_WIDTH=100;
const PADDLE_THICKNESS=10;
const PADDLE_DIST_FROM_EDGE=60;
var paddleX=400;

const BULLET_SPEED=10;

function bulletClass(){
	this.x;
	this.y;
	this.is_Alive=false;
	
	this.createNew=function(x,y){
		this.x=x;
		this.y=y;
		this.isAlive=true;
	}
	
	this.bulletBrickHandling=function(){
		if(isBrickHere(this.x,this.y)){
			brickCol=Math.floor(this.x/BRICK_W);
			brickRow=Math.floor(this.y/BRICK_H);
			brick=rowColToArrayIndex(brickCol, brickRow);
			console.log("Udario!");
			console.log(brick);
			switch(brickGrid[brick]){
				case BRICK3:
					brickGrid[brick]=BRICK3_DAM1;
					break
					case BRICK3_DAM1:
					brickGrid[brick]=BRICK3_DAM2;
					break;
				case BRICK3_DAM2:
					brickGrid[brick]=0;
					bricksLeft--;
					break;
				case BRICK2:
					brickGrid[brick]=BRICK2_DAM;
					break;
				case BRICK2_DAM:
					brickGrid[brick]=0;
					bricksLeft--;
					break;
				case BRICK1:
					brickGrid[brick]=0;
					bricksLeft--;
					break;
			}
			score+=(BRICK_ROWS-brickRow)*100;
			this.isAlive=false;
		}

	}
	
	this.moveBullet=function(){
		this.y-=BULLET_SPEED;
		this.bulletBrickHandling();
	}
	
	this.drawBullet=function(){
		drawBitmap(bulletPic,this.x,this.y);
	}
	
	
}

