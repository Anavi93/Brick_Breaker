var playerPic=document.createElement("img");
var ballPic=document.createElement("img");
var brickPic=document.createElement("img");
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
		{varName: brickPic, theFile: "Brick"},
		{varName: ballPic, theFile: "Ball"},
		{varName: backgroundPic, theFile: "Background"},
		{varName: healthPic, theFile: "Heart"},
		{varName: startPic, theFile: "Start"}
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

