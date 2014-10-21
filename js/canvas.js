//mainCanvas container
var canvas;
//Tells when user is holding down mouse
var painting = false;
var drawables = [];
var tool;

window.onload=function(){
	canvas = document.getElementById("mainCanvas");
	
	// Add event listeners to change tools
	var tools = document.getElementsByClassName("tools");
	for(var i=0;i<tools.length;++i) {
		tools[i].addEventListener("click",setTool);
	}
	// Add event listeners to change color
	var colors = document.getElementsByClassName("colors");
	for(var i=0;i<colors.length;++i) {
		colors[i].addEventListener("click",setColor);
	}
}

function setTool() {
	var classes = this.classList;
	try {
		canvas.removeEventListener("mousedown", tool.mouseDown);
	} catch(e) {}
	try {
		canvas.removeEventListener("mouseup", tool.mouseRelease);
	} catch(e) {}
	try {
		canvas.removeEventListener("mousemove", tool.mouseHold);
	} catch(e) {}
	for(var i=0;i<classes.length;++i) {
		if(classes[i]=="brush") {
			tool = new Brush();
		}
		if(classes[i]=="line") {
			tool = new Line(canvas);
		}
		if(classes[i]=="rectangle") {
			tool = new Rectangle(canvas);
		}
		if(classes[i]=="ellipse") {
			tool = new Circle(canvas);
		}
	}
	try {
		tool.color = "#000000";
	} catch(e) {}
	try {
		canvas.addEventListener("mousedown", tool.mouseDown);
		canvas.addEventListener("mouseup", tool.mouseRelease);
	} catch(e) {}
}

function setColor() {
	var color = this.id;
	
	var classes = this.classList;
	for(var i=0;i<classes.length;++i) {
		if(classes[i]=="brush") {
			// tool = new Brush();
		}
		if(classes[i]=="line") {
			tool = new Line(canvas);
		}
		if(classes[i]=="rectangle") {
			tool = new Rectangle(canvas);
		}
		if(classes[i]=="ellipse") {
			tool = new Circle(canvas);
		}
	}
	try {
		tool.color = "#000000";
	} catch(e) {}
}

function render(cnv) {
	ctx = cnv.getContext("2d");
	ctx.clearRect(0,0,cnv.width,cnv.height);
	console.log("Clear and render");
	for(i=0;i<drawables.length;++i) {
		drawables[i].draw(cnv);
	}
}
