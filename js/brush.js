//Tracks when drawing should be done and when to stop
var painting = false;
//Rectangle
var tool;
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

function drawBrush(){
	c = this.canvas.getContext("2d");
	c.save();
	c.translate(tool.x[0],tool.y[0]);
	for(var i=1;i<tool.x.length;++i) {
		c.lineTo(tool.x[i],tool.y[i]);
	}
	
	c.stroke();
	c.restore();
}

//Brush Object
function Brush(cnv){
	this.canvas = cnv;
	this.color = "#000000";
	this.draw = drawBrush;
	// Array of points
	this.x = [];
	this.y = [];

	//Event listener function on mouse down
	this.mouseDown = function(e) {	
		//Adjust originX and originY so that it maps in accordance with canvas context
		tool.x.push(e.clientX - getCursorXoffset());
		tool.y.push(e.clientY - getCursorYoffset());
		tool.x.push(e.clientX - getCursorXoffset());
		tool.y.push(e.clientY - getCursorYoffset());
		
		painting = true;
		
		canvas = document.getElementById("mainCanvas");
		var test = this;
		canvas.addEventListener("mousemove",tool.mouseHold);
	}
	//Event listener function called on mouse up
	this.mouseRelease = function(e) {
		//Adjust endX and endY to map to canvas context
		tool.x.push(e.clientX - getCursorXoffset());
		tool.y.push(e.clientY - getCursorYoffset());
		
		// push new rectangle unto drawables?
		painting = false;
		
		render(canvas);
		tool.draw();
		
		canvas.removeEventListener("mousedown", tool.mouseDown);
		canvas.removeEventListener("mouseup", tool.mouseRelease);
		canvas.removeEventListener("mousemove", tool.mouseHold);
		drawables.push(tool);
		var clr = tool.color;
		tool = new Rectangle(canvas);
		tool.color = clr;
		canvas.addEventListener("mousedown", tool.mouseDown);
		canvas.addEventListener("mouseup", tool.mouseRelease);
	}
	this.mouseHold = function(e) {
		tool.x.push(e.clientX - getCursorXoffset());
		tool.y.push(e.clientY - getCursorYoffset());
		painting = true;
		canvas = document.getElementById("mainCanvas");
		
		render(canvas);
		tool.draw();
	}
	this.mouseOut = function(e) {
		painting = false;
	}
}

/*
window.onload=function(){
	canvas = document.getElementById("mainCanvas");
	tool = new Rectangle(canvas);
	canvas.addEventListener("mousedown", tool.mouseDown);
	canvas.addEventListener("mouseup", tool.mouseRelease);
}*/