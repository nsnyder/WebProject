//mainCanvas container
var canvas;
//Tells when user is holding down mouse
var painting = false;
var drawables = [];
var redoDrawables = [];
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
	
	var undoBtn = document.getElementById("Undo");
	var redoBtn = document.getElementById("Redo");
	var thicknessBtn = document.getElementById("thick");
	undoBtn.addEventListener("click",undo);
	redoBtn.addEventListener("click",redo);
	thicknessBtn.addEventListener("change",function() { try {tool.strokeWidth = this.value; } catch (e){} } );
	
}

function setTool() {
	var clr;
	var fclr;
	var wdth;
	var thicknessBtn = document.getElementById("thick");
	try {
		if(tool.color !== undefined) {
			clr = tool.color;
		} else {
			clr = "#000000";
		}
		if(tool.fillColor !== undefined) {
			fclr = tool.fillColor;
		} else {
			fclr = "rgba(0, 0, 0, 0.0)";
		}
		if(tool.strokeWidth !== undefined) {
			wdth = tool.strokeWidth;
			thicknessBtn.value = wdth;
		} else {
			wdth = thicknessBtn.value;
		}
		
	} catch (e) {
		clr = "#000000";
		fclr = "rgba(0, 0, 0, 0.0)";
		wdth = thicknessBtn.value;
	}
	
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
			tool = new Brush(canvas);
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
		tool.color = clr;
		tool.fillColor = fclr;
		tool.strokeWidth = wdth;
	} catch(e) {}
	try {
		canvas.addEventListener("mousedown", tool.mouseDown);
		canvas.addEventListener("mouseup", tool.mouseRelease);
	} catch(e) {}
}

function setColor() {
	var id = this.id;
	var hexCode = id.slice(1, id.length);
	var hash = "#";
	var wholeHexCode = hash.concat(hexCode);
	try {
		if(document.getElementById("fillCheck").checked) {
			tool.fillColor = wholeHexCode;
		}
		if(document.getElementById("outlineCheck").checked) {
			tool.color = wholeHexCode;
		}
	} catch(e) {}
}

function render(cnv) {
	ctx = cnv.getContext("2d");
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for(i=0;i<drawables.length;++i) {
		drawables[i].draw(cnv);
	}
}
