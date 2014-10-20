//Tracks when drawing should be done and when to stop
var painting = false;
//Line
var myLine;
//Takes a string of the form ##px and extracts the ## and converts to a number
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

function drawLine(){
	c = this.canvas.getContext("2d");
	c.beginPath();
	c.moveTo(this.originX, this.originY);
	c.lineTo(this.endX, this.endY);
	c.closePath();
	c.stroke();
}

//Line Object
function Line(cnv){
	this.canvas = cnv;
	this.color = "#000000";
	this.drawLine = drawLine;
	//Record of initial mouse click
	this.originX;
	this.originY;
	
	//Record of mouse release
	this.endX;
	this.endY;
	
	//Event listener function on mouse down
	this.mouseDown = function(e) {	
		//Adjust originX and originY so that it maps in accordance with canvas context
		myLine.originX = e.clientX - getCursorXoffset();
		myLine.originY = e.clientY - getCursorYoffset();
		console.log("origin: X: " + myLine.originX + " Y: " + myLine.originY);
		painting = true;
	}
	
	this.mouseHold = function(e) {
		// update endx and endy
		// constantly redraw canvas so that preview can be seen
		painting = true;
	}
	
	//Event listener function called on mouse up
	this.mouseRelease = function(e) {
		//Adjust endX and endY to map to canvas context
		myLine.endX = e.clientX - getCursorXoffset();
		myLine.endY = e.clientY - getCursorYoffset();
		console.log("end: X: " + myLine.endX + " Y: " + myLine.endY);
		myLine.drawLine();
		// push new line unto drawables?
		painting = false;
	}
	
	this.mouseOut = function(e) {
		//Adjust endX and endY to map to canvas context
		// push new line unto drawables?
		painting = false;
	}
}

window.onload=function(){
	canvas = document.getElementById("mainCanvas");
	myLine = new Line(canvas);
	canvas.addEventListener("mousedown", myLine.mouseDown);
	canvas.addEventListener("mouseup", myLine.mouseRelease);
	//canvas.addEventListener("mouseout", myLine.mouseOut);
}