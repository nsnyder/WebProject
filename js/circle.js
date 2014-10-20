//Tracks when drawing should be done and when to stop
var painting = false;
//Line
var myCircle;
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

function drawCircle(){
	c = this.canvas.getContext("2d");
	if(this.endX > this.originX){
	//dragged to the RIGHT
		var opposite = this.endY-this.originY;
		var adjacent = this.endX-this.originX;
		this.theta = Math.atan(opposite/adjacent);
		this.diameter = opposite/(Math.sin(this.theta));
		this.radius = this.diameter/2;
		this.centerY = this.originY + (Math.sin(this.theta))*this.radius;
		this.centerX = this.originX + (Math.cos(this.theta))*this.radius;
	}
	else{
		var opposite = this.endY-this.originY;
		var adjacent = this.originX-this.endX;
		this.theta = Math.atan(opposite/adjacent);
		this.diameter = opposite/(Math.sin(this.theta));
		this.radius = this.diameter/2;
		this.centerY = this.originY + (Math.sin(this.theta))*this.radius;
		this.centerX = this.originX - (Math.cos(this.theta))*this.radius;
	}
	c.beginPath();
	c.arc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle);
	c.stroke();
	c.closePath();
}

//Circle Object
function Circle(cnv){
	this.canvas = cnv;
	this.color = "#000000";
	this.drawCircle = drawCircle;
	//Record of initial mouse click
	this.originX;
	this.originY;
	//Record of mouse release
	this.endX;
	this.endY;
	//Record of circle attributes
	this.radius;
	this.diameter;
	this.centerX;
	this.centerY;
	this.startAngle = 0;
	this.endAngle = 2.0*Math.PI;
	this.theta;
	//Event listener function on mouse down sets origin
	this.mouseDown = function(e) {	
		//Adjust originX and originY so that it maps in accordance with canvas context
		myCircle.originX = e.clientX - getCursorXoffset();
		myCircle.originY = e.clientY - getCursorYoffset();
		console.log("origin: X: " + myCircle.originX + " Y: " + myCircle.originY);
		painting = true;
	}
	
	this.mouseHold = function(e) {
		// update endx and endy
		// constantly redraw canvas so that preview can be seen
		painting = true;
	}
	
	//Event listener function called on mouse up sets end
	this.mouseRelease = function(e) {
		//Adjust endX and endY to map to canvas context
		myCircle.endX = e.clientX - getCursorXoffset();
		myCircle.endY = e.clientY - getCursorYoffset();
		console.log("end: X: " + myCircle.endX + " Y: " + myCircle.endY);
		myCircle.drawCircle();
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
	myCircle = new Circle(canvas);
	canvas.addEventListener("mousedown", myCircle.mouseDown);
	canvas.addEventListener("mouseup", myCircle.mouseRelease);
	//canvas.addEventListener("mouseout", myCircle.mouseOut);
}