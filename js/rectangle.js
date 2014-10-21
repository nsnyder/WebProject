//Tracks when drawing should be done and when to stop
var painting = false;
//Rectangle
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

function drawRectangle(){
	c = this.canvas.getContext("2d");
	c.beginPath();
	if(this.endX < this.originX) {
	//dragged to the LEFT from initial click
		if(this.endY < this.originY) {
		//dragged to the LEFT AND UP
			this.x = this.endX;
			this.y = this.endY;
			this.height = this.originY-this.endY; //note: moving up is y decreasing
			this.width = this.originX-this.endX;
		}
		else{
		//dragged to the LEFT AND DOWN
			this.x = this.endX;
			this.y = this.originY;
			this.height = this.endY-this.originY; //note: moving up is y decreasing
			this.width = this.originX-this.endX;
		}
	}
	else if(this.endY < this.originY) {
	//dragged RIGHT AND UP
		this.x = this.originX;
		this.y = this.endY;
		this.height = this.originY-this.endY; //note: moving up is y decreasing
		this.width = this.endX-this.originX;
	}
	else {
	//dragged RIGHT AND DOWN
		this.x = this.originX;
		this.y = this.originY;
		this.height = this.endY-this.originY;
		this.width = this.endX-this.originX;
	}
	c.rect(this.x, this.y, this.width, this.height);
	c.closePath();
	c.stroke();
}

//Rectangle Object
function Rectangle(cnv){
	this.canvas = cnv;
	this.color = "#000000";
	this.draw = drawRectangle;
	//Record of initial mouse click
	this.originX;
	this.originY;
	//Record of mouse release
	this.endX;
	this.endY;
	//Record of where context should start drawing
	this.x;
	this.y;
	//Record of dimensions
	this.height;
	this.width;
	//Event listener function on mouse down
	this.mouseDown = function(e) {	
		//Adjust originX and originY so that it maps in accordance with canvas context
		tool.originX = e.clientX - getCursorXoffset();
		tool.originY = e.clientY - getCursorYoffset();
		console.log("origin: X: " + tool.originX + " Y: " + tool.originY);
		painting = true;
		
		canvas = document.getElementById("mainCanvas");
		canvas.addEventListener("mousemove", tool.mouseHold);
	}
	//Event listener function called on mouse up
	this.mouseRelease = function(e) {
		canvas = document.getElementById("mainCanvas");
		render(canvas);
		
		tool.draw();
		// push new rectangle unto drawables?
		painting = false;
		
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
		painting = true;
		canvas = document.getElementById("mainCanvas");
		
		//Adjust endX and endY to map to canvas context
		tool.endX = e.clientX - getCursorXoffset();
		tool.endY = e.clientY - getCursorYoffset();
		render(canvas);
		tool.draw();
		
	}
	this.mouseOut = function(e) {
		painting = false;
	}
}