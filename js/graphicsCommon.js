function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	canvasContext.fillStyle=fillColor;
	canvasContext.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
}

function colorCircle(centerX,centerY,radius,fillColor){
	canvasContext.fillStyle=fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY,radius,0,Math.PI*2, true);
	canvasContext.fill();
}

function colorCircleTransparent(centerX,centerY,radius,drawColor,opacity){
	canvasContext.fillStyle='rgba('+drawColor+','+opacity+')';
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY,radius,0, Math.PI*2,true);
	canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor){
	canvasContext.fillStyle=fillColor;
	canvasContext.fillText(showWords, textX, textY);
}

function drawBitmapCentered(useBitmap,atX,atY){
	canvasContext.save();
	canvasContext.translate(atX,atY);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}

function drawBitmap(useBitmap,atX,atY){
	canvasContext.save();
	canvasContext.translate(atX,atY);
	canvasContext.drawImage(useBitmap, 0,0);
	canvasContext.restore();
}