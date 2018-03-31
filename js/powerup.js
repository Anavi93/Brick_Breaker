
const POWER_SPEED=15;
const FIREBALL=1;
const STICKY=2;
const MULTIBALL=3;
const CANNON=4;
const POINTS=5;


function powerupClass(){
	this.x=0;
	this.y=0;
	this.type=0;
	this.isAlive=false;
	
	this.createNew=function(x,y,type){
		this.x=x;
		this.y=y;
		this.type=type;
		this.isAlive=true;
	}
	
	this.paddleHandling=function(){
		var paddleTopEdgeY=canvas.height-PADDLE_DIST_FROM_EDGE;
		var paddleBottomEdgeY=paddleTopEdgeY + PADDLE_THICKNESS;
		var paddleLeftEdgeX=paddleX;
		var paddleRightEdgeX=paddleLeftEdgeX+ PADDLE_WIDTH;
		
		if(	this.y+54> paddleTopEdgeY && 
			this.y<paddleBottomEdgeY && 
			this.x>paddleLeftEdgeX && 
			this.x<paddleRightEdgeX){
				switch(this.type){
					case 1:
						is_fireball+=600;
						break;
					case 2:
						is_sticky+=600;
						break;
					case 3:
						if(!is_multiball)
							createMultiball();
						break;
					case 4:
						is_cannon+=600;
						break;
					case 5:
						is_points=1;
						break;
				}
				this.isAlive=false;
			}
	}
	
	this.move=function(){
		this.y+=POWER_SPEED;
		this.paddleHandling();
		if(this.y+PADDLE_DIST_FROM_EDGE>canvas.height)
			this.isAlive=false;
	}
	
	this.draw=function(){
		switch(this.type){
			case 1:
				drawBitmap(powerFirePic,this.x,this.y);
				break;
			case 2:
				drawBitmap(powerStickyPic,this.x,this.y);
				break;
			case 3:
				drawBitmap(powerMultiPic,this.x,this.y);
				break;
			case 4:
				drawBitmap(powerCannonPic,this.x,this.y);
				break;
			case 5:
				drawBitmap(powerPointPic,this.x, this.y);
				break;
		}
	}
}
