var playerPic=document.createElement("img");
var cannonPic=document.createElement("img");
var ballPic=document.createElement("img");
var fireBallPic=document.createElement("img");
var stickyBallPic=document.createElement("img");
var bulletPic=document.createElement("img");
var backgroundPic=document.createElement("img");
var healthPic=document.createElement("img");
var startPic=document.createElement("img");

var brickPics=[];

var picsToLoad=0;

function countImagesAndLaunchIfReady(){
	
	picsToLoad--;
	console.log(picsToLoad);
	if(picsToLoad == 0){
		imageLoadingDoneSoStartGame();
		
	}	
}

function beginLoadingImage(imgVar, fileName){
	imgVar.onload=countImagesAndLaunchIfReady();
	imgVar.src="images/"+fileName+".png";
	
}

function loadImageForBrickCode(brickCode, fileName){
	brickPics[brickCode]=document.createElement("img");
	beginLoadingImage(brickPics[brickCode],fileName);
}

function loadImages(){
	
	var imageList=[
		{varName: playerPic, theFile: "Paddle"},
		{varName: cannonPic, theFile: "CannonPaddle"},
		{varName: ballPic, theFile: "Ball"},
		{varName: fireBallPic, theFile: "Fireball"},
		{varName: stickyBallPic, theFile: "Stickyball"},
		{varName: bulletPic, theFile: "bullet"},			
		{varName: backgroundPic, theFile: "Background"},
		{varName: healthPic, theFile: "Heart"},
		{varName: startPic, theFile: "Start"},
		{brickType: BRICK1, theFile: "Brick1"},
		{brickType: BRICK2, theFile: "Brick2"},
		{brickType: BRICK3, theFile: "Brick3"},
		{brickType: BRICK2_DAM, theFile: "Brick2D"},
		{brickType: BRICK3_DAM1, theFile: "Brick3D"},
		{brickType: BRICK3_DAM2, theFile: "Brick2D"},
		];
	
	picsToLoad=imageList.length;
	
	for(var i=0; i<imageList.length; i++){
		if(imageList[i].varName!=undefined){
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
		else{
			loadImageForBrickCode(imageList[i].brickType, imageList[i].theFile);
		}
	}
}

