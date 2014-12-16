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
	c.strokeStyle = this.color;
	c.fillStyle = this.fillColor;
	c.lineWidth = this.strokeWidth;
	c.stroke();
	c.fill();
}

//Rectangle Object
function Rectangle(cnv, clone){
	if(clone !== undefined) {
		for (var attr in clone) {
			if (clone.hasOwnProperty(attr)) this[attr] = clone[attr];
		}
	} else {
		this.type = "Rectangle";
		this.color = "#000000";
		this.fillColor = "rgba(0, 0, 0, 0.0)";
		this.strokeWidth = 2;
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
	}
	this.canvas = cnv;
	this.draw = drawRectangle;
	//Event listener function on mouse down
	this.mouseDown = function(e) {
		//Adjust originX and originY so that it maps in accordance with canvas context
		pos = getMousePos(canvas,e);
		tool.originX = pos.x;
		tool.originY = pos.y;
		console.log("origin: X: " + tool.originX + " Y: " + tool.originY);
		painting = true;

		canvas = document.getElementById("mainCanvas");
		canvas.addEventListener("mousemove", tool.mouseHold);
	}
	//Event listener function called on mouse up
	this.mouseRelease = function(e) {
		canvas = document.getElementById("mainCanvas");
		// push new rectangle unto drawables?
		painting = false;

		canvas.removeEventListener("mousedown", tool.mouseDown);
		canvas.removeEventListener("mouseup", tool.mouseRelease);
		canvas.removeEventListener("mousemove", tool.mouseHold);
		drawables.push(tool);
		var clr = tool.color;
		var fclr = tool.fillColor;
		var wdth = tool.strokeWidth;
		tool = new Rectangle(canvas);
		tool.color = clr;
		tool.fillColor = fclr;
		tool.strokeWidth = wdth;
		canvas.addEventListener("mousedown", tool.mouseDown);
		canvas.addEventListener("mouseup", tool.mouseRelease);
	}
	this.mouseHold = function(e) {
		painting = true;
		canvas = document.getElementById("mainCanvas");

		//Adjust endX and endY to map to canvas context
		pos = getMousePos(canvas,e);
		tool.endX = pos.x;
		tool.endY = pos.y;
		render(canvas);
		tool.draw();

	}
	this.mouseOut = function(e) {
		painting = false;
	}
}
