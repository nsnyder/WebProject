function measureToNumber(str){
	var parts = str.split("p");
	var val = parts[0];
	val = Number(val);
	return val;
}
//determines cursor x offset relative to canvas (if canvas is moved or other objects are edited then this function may not be accurate anymore)
function getCursorXoffset(){
	//Get Main content left padding
	var mainContentStyle = getComputedStyle(document.getElementById("MainContent"), null);
	var leftPad = measureToNumber(mainContentStyle.paddingLeft);
	//Get Frame width for left and top and get frame top margin
	var frameStyle = getComputedStyle(document.getElementById("Frame"), null);
	var frameLeftWidth = measureToNumber(frameStyle.borderLeftWidth);
	return leftPad+frameLeftWidth;
}
//determines cursor y offset relative to canvas(if canvas is moved or other objects are edited then this function may not be accurate anymore)
function getCursorYoffset(){
	//Get Frame width for left and top and get frame top margin
	var frameStyle = getComputedStyle(document.getElementById("Frame"), null);
	var frameTopWidth = measureToNumber(frameStyle.borderTopWidth);
	var frameTopMargin = measureToNumber(frameStyle.marginTop);
	//Get MainNav box height
	var mainNavStyle = getComputedStyle(document.getElementById("MainNav"), null);
	var mainNavHeight = measureToNumber(mainNavStyle.height)+ measureToNumber(mainNavStyle.paddingBottom) + measureToNumber(mainNavStyle.paddingTop);
	return frameTopWidth+frameTopMargin+mainNavHeight;
}

function Line(){
	this.color="#000000";
	this.draw=function(cnv){
	}
	this.originX;
	this.originY;
	this.endX;
	this.endY;
	this.mouseClick = function(e) {		
		//Adjust originX and originY so that it maps in accordance with canvas context
		this.originX = e.clientX - getCursorXoffset();
		this.originY = e.clientY - getCursorYoffset();
		alert("X: " + this.originX + " Y: " + this.originY);
		mouseDown = true;
	}
	this.mouseHold = function() {
		// update endx and endy
		// constantly redraw canvas so that preview can be seen
		mouseDown = true;
	}
	this.mouseRelease = function() {
		// push new line unto drawables?
		mouseDown = false;
	}
}

window.onload=function(){
	myLine = new Line;
	canvas = document.getElementById("mainCanvas");
	canvas.addEventListener("click", myLine.mouseClick);
}