//Takes a string of the form ##px and extracts the ## and converts to a number
function measureToNumber(str){
	var parts = str.split("p");
	var val = parts[0];
	val = Number(val);
	return val;
}

function drawLine(){
	c = this.canvas.getContext("2d");
	c.beginPath();
	c.moveTo(this.originX, this.originY);
	c.lineTo(this.endX, this.endY);
	c.closePath();
	c.strokeStyle = this.color;
	c.lineWidth = this.strokeWidth;
	c.stroke();
}

//Line Object
function Line(cnv, clone){
	if(clone !== undefined) {
		for (var attr in clone) {
			if (clone.hasOwnProperty(attr)) this[attr] = clone[attr];
		}
	} else {
		this.type = "Line";
		this.color = "#000000";
		this.strokeWidth = 2;
		//Record of initial mouse click
		this.originX;
		this.originY;

		//Record of mouse release
		this.endX;
		this.endY;
	}
	this.canvas = cnv;
	this.draw = drawLine;
	//Event listener function on mouse down
	this.mouseDown = function(e) {
		//Adjust originX and originY so that it maps in accordance with canvas context
		pos = getMousePos(canvas,e);
		tool.originX = pos.x;
		tool.originY = pos.y;
		console.log("origin: X: " + tool.originX + " Y: " + tool.originY);
		painting = true;
		canvas.addEventListener("mousemove", tool.mouseHold);
	}

	this.mouseHold = function(e) {
		// update endx and endy
		// constantly redraw canvas so that preview can be seen

		//Adjust endX and endY to map to canvas context
		pos = getMousePos(canvas,e);
		tool.endX = pos.x;
		tool.endY = pos.y;

		render(canvas);
		tool.draw();

		painting = true;
	}

	//Event listener function called on mouse up
	this.mouseRelease = function(e) {

		canvas.removeEventListener("mousedown", tool.mouseDown);
		canvas.removeEventListener("mouseup", tool.mouseRelease);
		canvas.removeEventListener("mousemove", tool.mouseHold);
		drawables.push(tool);
		var clr = tool.color;
		var wdth = tool.strokeWidth;
		tool = new Line(canvas);
		tool.color = clr;
		tool.strokeWidth = wdth;
		canvas.addEventListener("mousedown", tool.mouseDown);
		canvas.addEventListener("mouseup", tool.mouseRelease);
		render(canvas);
		// push new line unto drawables?
		painting = false;
	}

	this.mouseOut = function(e) {
		//Adjust endX and endY to map to canvas context
		// push new line unto drawables?
		painting = false;
	}
}
/*
window.onload=function(){
	canvas = document.getElementById("mainCanvas");
	tool = new Line(canvas);
	canvas.addEventListener("mousedown", tool.mouseDown);
	canvas.addEventListener("mouseup", tool.mouseRelease);
	//canvas.addEventListener("mouseout", tool.mouseOut);
}*/
