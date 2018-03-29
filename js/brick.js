const BRICK_W=80;
const BRICK_H=20;
const BRICK_GAP=2;
const BRICK_COLS=10;
const BRICK_ROWS=14;
var brickGrid=new Array(BRICK_COLS*BRICK_ROWS);
var bricksLeft=0;

var levelOne=[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			   1, 1, 4, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 4, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 4, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 4, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 4, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 4, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 4, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 4, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 4, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 4, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 1, 1, 1, 1, 1, 1, 1, 4];

var levelSmiley=[ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
				  0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
			      0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
			      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			      1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
			      1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 
			      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
			      1, 0, 1, 1, 1, 1, 1, 1, 0, 1,
			      1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 
			      1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
			      0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                  0, 0, 1, 1, 1, 1, 1, 1, 0, 0,			   
			      0, 0, 0, 1, 1, 1, 1, 0, 0, 0]; //smiley

var brickGrid=[];	//current level		   

var bricksLeft=0;

function brickReset(level){
	bricksLeft=0;
	var i;
	for(i=0; i<BRICK_ROWS*BRICK_COLS; i++){
		brickGrid[i]=level[i];
		if(level[i]!=0)
			bricksLeft++;
	}//end of for each brickGrid
}//end of brickReset function


function isBrickAtColRow(col,row){
	if(col>=0 && col<BRICK_COLS &&
	   row>=0 && row<BRICK_ROWS){
		var brickIndexUnderCoord=rowColToArrayIndex(col,row);
		return brickGrid[brickIndexUnderCoord];
		} else {
			return false;
		}
}

function drawBricks(){
	for(var eachRow=0; eachRow<BRICK_ROWS; eachRow++){
		for(var eachCol=0; eachCol<BRICK_COLS; eachCol++){
			var arrayIndex=rowColToArrayIndex(eachCol,eachRow);
			if(brickGrid[arrayIndex]){
				colorRect(BRICK_W*eachCol, BRICK_H*eachRow, BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP, 'blue');
				drawBitmap(brickPic, BRICK_W*eachCol, BRICK_H*eachRow);
			}//end of is this brick here
		}//end of for each brick
	}//end of for each row
}//end of drawBrick