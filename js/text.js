//Tracks when drawing should be done and when to stop
var painting = false;
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

function drawText(){
	c = this.canvas.getContext("2d");
	c.beginPath();
	c.fillText(this.string, this.originX, this.originY);
	c.closePath();
}

//Text object
function Text(cnv){
	this.type = "Text";
	this.canvas = cnv;
	this.color = "#000000";
	this.draw = drawText;
	this.string;
	//Record of initial mouse click
	this.originX;
	this.originY;
	//Record of Text attributes
	this.fontSize;
	this.fontFace;
	//Event Listener function on keyboard presses
	this.keyDown = function(e){
		var keynum = e.keyCode;
		tool.string += String.fromCharCode(keynum);
		this.canvas.addEventListener("keydown", tool.enterPress, true);
	}
	//Event Listener function on keyboard press listens for enter key
	this.enterPress = function(e){
		var k = e.which;
		if(k == 13){
			this.canvas.removeEventListener("keydown", tool.keyPress, true);
			this.draw();
		}
	}
	//Event listener function on mouse down sets origin
	this.mouseDown = function(e) {
		//Adjust originX and originY so that it maps in accordance with canvas context
		tool.originX = e.clientX - getCursorXoffset();
		tool.originY = e.clientY - getCursorYoffset();
		console.log("origin: X: " + tool.originX + " Y: " + tool.originY);
		painting = true;
	}

	this.mouseHold = function(e) {
		// update endx and endy
		// constantly redraw canvas so that preview can be seen
		painting = true;
	}

	this.mouseOut = function(e) {
		//Adjust endX and endY to map to canvas context
		// push new line unto drawables?
		painting = false;
	}

}

function Text(cnv, clone){
	for (var attr in clone) {
		if (clone.hasOwnProperty(attr)) this[attr] = clone[attr];
	}
	this.canvas = cnv;
	this.draw = drawText;
	//Event Listener function on keyboard presses
	this.keyDown = function(e){
		var keynum = e.keyCode;
		tool.string += String.fromCharCode(keynum);
		this.canvas.addEventListener("keydown", tool.enterPress, true);
	}
	//Event Listener function on keyboard press listens for enter key
	this.enterPress = function(e){
		var k = e.which;
		if(k == 13){
			this.canvas.removeEventListener("keydown", tool.keyPress, true);
			this.draw();
		}
	}
	//Event listener function on mouse down sets origin
	this.mouseDown = function(e) {
		//Adjust originX and originY so that it maps in accordance with canvas context
		tool.originX = e.clientX - getCursorXoffset();
		tool.originY = e.clientY - getCursorYoffset();
		console.log("origin: X: " + tool.originX + " Y: " + tool.originY);
		painting = true;
	}

	this.mouseHold = function(e) {
		// update endx and endy
		// constantly redraw canvas so that preview can be seen
		painting = true;
	}

	this.mouseOut = function(e) {
		//Adjust endX and endY to map to canvas context
		// push new line unto drawables?
		painting = false;
	}

}
/*
window.onload=function(){
	function test(){
		alert("hi!");
	}
	canvas = document.getElementById("mainCanvas");
	tool = new Text(canvas);
	canvas.addEventListener("mousedown", tool.mouseDown);
	canvas.addEventListener("keydown", test);
	//canvas.addEventListener("mouseup", tool.mouseRelease);
	//canvas.addEventListener("mouseout", tool.mouseOut);
}
*/
