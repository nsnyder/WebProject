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

function drawBrush(){
	c = this.canvas.getContext("2d");
	c.save();
	c.beginPath();
	c.moveTo(this.x[0],this.y[0]);
	for(var i=1;i<this.x.length;++i) {
		c.lineTo(this.x[i],this.y[i]);
		c.moveTo(this.x[i],this.y[i]);
	}
	c.closePath();
	c.strokeStyle = this.color;
	c.lineWidth = this.strokeWidth;
	c.stroke();
	c.restore();
}

//Brush Object
function Brush(cnv){
	this.type = "Brush";
	this.canvas = cnv;
	this.color = "#000000";
	this.strokeWidth = 2;
	this.draw = drawBrush;
	// Array of points
	this.x = [];
	this.y = [];

	//Event listener function on mouse down
	this.mouseDown = function(e) {
		//Adjust originX and originY so that it maps in accordance with canvas context
		pos = getMousePos(canvas,e);
		tool.x.push(pos.x);
		tool.y.push(pos.y);
		tool.x.push(pos.x);
		tool.y.push(pos.y);

		painting = true;

		canvas = document.getElementById("mainCanvas");
		var test = this;
		canvas.addEventListener("mousemove",tool.mouseHold);
	}
	//Event listener function called on mouse up
	this.mouseRelease = function(e) {
		//Adjust endX and endY to map to canvas context
		pos = getMousePos(canvas,e);
		tool.x.push(pos.x);
		tool.y.push(pos.y);

		// push new rectangle unto drawables?
		painting = false;

		canvas.removeEventListener("mousedown", tool.mouseDown);
		canvas.removeEventListener("mouseup", tool.mouseRelease);
		canvas.removeEventListener("mousemove", tool.mouseHold);
		drawables.push(tool);
		var clr = tool.color;
		var wdth = tool.strokeWidth;
		tool = new Brush(canvas);
		tool.strokeWidth = wdth;
		tool.color = clr;
		canvas.addEventListener("mousedown", tool.mouseDown);
		canvas.addEventListener("mouseup", tool.mouseRelease);
		render(canvas);
	}
	this.mouseHold = function(e) {
		pos = getMousePos(canvas,e);
		tool.x.push(pos.x);
		tool.y.push(pos.y);
		painting = true;
		canvas = document.getElementById("mainCanvas");

		render(canvas);
		tool.draw();
	}
	this.mouseOut = function(e) {
		painting = false;
	}
}

function Brush(cnv, clone){
	this.canvas = cnv;
	for (var attr in clone) {
    if (clone.hasOwnProperty(attr)) this[attr] = clone[attr];
  }

	//Event listener function on mouse down
	this.mouseDown = function(e) {
		//Adjust originX and originY so that it maps in accordance with canvas context
		pos = getMousePos(canvas,e);
		tool.x.push(pos.x);
		tool.y.push(pos.y);
		tool.x.push(pos.x);
		tool.y.push(pos.y);

		painting = true;

		canvas = document.getElementById("mainCanvas");
		canvas.addEventListener("mousemove",tool.mouseHold);
	}
	//Event listener function called on mouse up
	this.mouseRelease = function(e) {
		//Adjust endX and endY to map to canvas context
		pos = getMousePos(canvas,e);
		tool.x.push(pos.x);
		tool.y.push(pos.y);

		// push new rectangle unto drawables?
		painting = false;

		canvas.removeEventListener("mousedown", tool.mouseDown);
		canvas.removeEventListener("mouseup", tool.mouseRelease);
		canvas.removeEventListener("mousemove", tool.mouseHold);
		drawables.push(tool);
		var clr = tool.color;
		var wdth = tool.strokeWidth;
		tool = new Brush(canvas);
		tool.strokeWidth = wdth;
		tool.color = clr;
		canvas.addEventListener("mousedown", tool.mouseDown);
		canvas.addEventListener("mouseup", tool.mouseRelease);
		render(canvas);
	}
	this.mouseHold = function(e) {
		pos = getMousePos(canvas,e);
		tool.x.push(pos.x);
		tool.y.push(pos.y);
		painting = true;
		canvas = document.getElementById("mainCanvas");

		render(canvas);
		tool.draw();
	}
	this.mouseOut = function(e) {
		painting = false;
	}
}
