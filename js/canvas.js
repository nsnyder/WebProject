//mainCanvas container
var canvas;
//Tells when user is holding down mouse
var painting = false;
var drawables = [];
var redoDrawables = [];
var tool;

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

function updateColorDisplay() {
	var disp = document.getElementById("demoColor");
	try {
		disp.style.borderColor = tool.color;
	} catch(e) {
		disp.style.borderColor = "black";
	}
	try {
		disp.style.backgroundColor = tool.fillColor;
	} catch(e) {
		disp.style.backgroundColor = "argb(0,0,0,0.0)";
	}
	try {
		disp.style.borderWidth = tool.strokeWidth+"px";
	} catch(e) {
		disp.style.borderWidth = "5px";
	}
}

window.onload=function(){
	
	
	canvas = document.getElementById("mainCanvas");
	// Add event listeners to change tools
	var tools = document.getElementsByClassName("active");
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
	thicknessBtn.addEventListener("change",function() { try {tool.strokeWidth = this.value; updateColorDisplay(); } catch (e){} } );
	
}

function setTool() {
	var tools = document.getElementsByClassName("tools");
	for(var i=0;i<tools.length;++i) {
		tools[i].className = tools[i].className.replace( /(?:^|\s)selected(?!\S)/g , '' )
	}
	this.className += " selected";

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
	updateColorDisplay();
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
	updateColorDisplay();
}

function render(cnv) {
	ctx = cnv.getContext("2d");
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for(i=0;i<drawables.length;++i) {
		drawables[i].draw(cnv);
	}
}

// StackOverflow, you da best <3
// http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;
