const ANIMATED_FRAMES=50;

var playerPic=document.createElement("img");
var cannonPic=document.createElement("img");
var ballPic=document.createElement("img");
var fireBallPic=document.createElement("img");
var stickyBallPic=document.createElement("img");
var bulletPic=document.createElement("img");
var level1Pic=document.createElement("img");
var level2Pic=document.createElement("img");
var level3Pic=document.createElement("img");
var healthPic=document.createElement("img");
var startPic=document.createElement("img");
var powerFirePic=document.createElement("img");
var powerStickyPic=document.createElement("img");
var powerMultiPic=document.createElement("img");
var powerCannonPic=document.createElement("img");
var powerPointPic=document.createElement("img");

var brickPics=[];

var animatedPics=[];


var picsToLoad=0;

function countImagesAndLaunchIfReady(){
	
	picsToLoad--;
	console.log(picsToLoad);
	if(picsToLoad == 0){
		console.log("Uso da zapocnem igru!");
		imageLoadingDoneSoStartGame();
		
	}	
}

function beginLoadingImage(imgVar, fileName){
	imgVar.onload=countImagesAndLaunchIfReady();
	imgVar.src="images/"+fileName+".png";
	
}

function beginLoadingAnimatedImage(imgVar, fileName){
	imgVar.onload=countImagesAndLaunchIfReady();
	imgVar.src="images/animation2/frame_"+fileName+"_delay-0.04s.png";
	
}

function loadImageForBrickCode(brickCode, fileName){
	brickPics[brickCode]=document.createElement("img");
	beginLoadingImage(brickPics[brickCode],fileName);
}

function loadImagesForAnimation(){
	var i;
	for(i=0; i<ANIMATED_FRAMES; i++){
		animatedPics[i]=document.createElement("img");
		beginLoadingAnimatedImage(animatedPics[i],i);
	}
}


function loadImages(){
	
	var imageList=[
		{varName: playerPic, theFile: "Paddle"},
		{varName: cannonPic, theFile: "CannonPaddle"},
		{varName: ballPic, theFile: "Ball"},
		{varName: fireBallPic, theFile: "Fireball"},
		{varName: stickyBallPic, theFile: "Stickyball"},
		{varName: bulletPic, theFile: "bullet"},			
		{varName: level1Pic, theFile: "Level1"},
		{varName: level2Pic, theFile: "Level2"},
		{varName: level3Pic, theFile: "Level3"},
		{varName: healthPic, theFile: "Heart"},
		{varName: startPic, theFile: "Start"},
		{varName: powerFirePic, theFile: "Fire"},
		{varName: powerStickyPic, theFile: "Sticky"},
		{varName: powerMultiPic, theFile: "Multi"},
		{varName: powerCannonPic, theFile: "Cannon"},
		{varName: powerPointPic, theFile: "Points"},
		{brickType: BRICK1, theFile: "Brick1"},
		{brickType: BRICK2, theFile: "Brick2"},
		{brickType: BRICK3, theFile: "Brick3"},
		{brickType: BRICK2_DAM, theFile: "Brick2D"},
		{brickType: BRICK3_DAM1, theFile: "Brick3D"},
		{brickType: BRICK3_DAM2, theFile: "Brick2D"},
		];
	
	picsToLoad=imageList.length+ANIMATED_FRAMES;

	
	for(var i=0; i<imageList.length; i++){
		if(imageList[i].varName!=undefined){
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
		else{
			loadImageForBrickCode(imageList[i].brickType, imageList[i].theFile);
		}
	}
	
	loadImagesForAnimation();
}

