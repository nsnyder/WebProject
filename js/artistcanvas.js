//mainCanvas container
var canvas;
//Tells when user is holding down mouse
var painting = false;
var drawables1 = [];
var redoDrawables1 = [];
var drawables2 = [];
var redoDrawables2 = [];
var drawables3 = [];
var redoDrawables3 = [];
var drawables4 = [];
var redoDrawables4 = [];
var drawables5 = [];
var redoDrawables5 = [];
var drawables = [];
var redoDrawables = [];
var tool;
var layerN;

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
	layerN = 1;

	canvas = document.getElementById("mainCanvas");
	// Add event listeners to change tools
	var tools = document.getElementsByClassName("active");
	for(var i=0;i<tools.length;++i) {
		tools[i].addEventListener("click",setTool);
	}

	var layers = document.getElementsByClassName("layer");
	for(var i=0;i<layers.length;++i) {
		layers[i].addEventListener("click",setLayer);
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


	document.getElementById("l1").addEventListener("change",function() { render(canvas); } );
	document.getElementById("l2").addEventListener("change",function() { render(canvas); } );
	document.getElementById("l3").addEventListener("change",function() { render(canvas); } );
	document.getElementById("l4").addEventListener("change",function() { render(canvas); } );
	document.getElementById("l5").addEventListener("change",function() { render(canvas); } );
}
function setLayer() {
	var layers = document.getElementsByClassName("layer");
	for(var i=0;i<layers.length;++i) {
		layers[i].className = layers[i].className.replace( /(?:^|\s)selected(?!\S)/g , '' )
	}
	this.className += " selected";
	if(layerN==1) {
		drawables[0] = drawables;
		redoDrawables[0] = redoDrawables;
	}
	if(layerN==2) {
		drawables[1] = drawables;
		redoDrawables[1] = redoDrawables;
	}
	if(layerN==3) {
		drawables3 = drawables;
		redoDrawables3 = redoDrawables;
	}
	if(layerN==4) {
		drawables4 = drawables;
		redoDrawables4 = redoDrawables;
	}
	if(layerN==5) {
		drawables5 = drawables;
		redoDrawables5 = redoDrawables;
	}
	var classes = this.classList;
	for(i=0;i<classes.length;++i) {

	var lastChar = classes[i].substr(classes[i].length - 1);

	if(lastChar == "1") {
		drawables = drawables1;
		redoDrawables = redoDrawables1;
		layerN = 1;
	}
	if(lastChar == "2") {
		drawables = drawables2;
		redoDrawables = redoDrawables2;
		layerN = 2;
	}
	if(lastChar == "3") {
		drawables = drawables3;
		redoDrawables = redoDrawables3;
		layerN = 3;
	}
	if(lastChar == "4") {
		drawables = drawables4;
		redoDrawables = redoDrawables4;
		layerN = 4;
	}
	if(lastChar == "5") {
		drawables = drawables5;
		redoDrawables = redoDrawables5;
		layerN = 5;
	}
	}

	render(canvas);
	updateColorDisplay();
}

function setTool() {
	var tools = document.getElementsByClassName("active");
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



	if(layerN==1) {
		drawables = drawables1;
	}
	if(layerN==2) {
		drawables = drawables2;
	}
	if(layerN==3) {
		drawables = drawables3;
	}
	if(layerN==4) {
		drawables = drawables4;
	}
	if(layerN==5) {
		drawables = drawables5;
	}



	if(document.getElementById("l1").checked) {
	for(i=0;i<drawables1.length;++i) {
		drawables1[i].draw(cnv);
	}
	}
	if(document.getElementById("l2").checked) {
	for(i=0;i<drawables2.length;++i) {
		drawables2[i].draw(cnv);
	}
	}
	if(document.getElementById("l3").checked) {
	for(i=0;i<drawables3.length;++i) {
		drawables3[i].draw(cnv);
	}
	}
	if(document.getElementById("l4").checked) {
	for(i=0;i<drawables4.length;++i) {
		drawables4[i].draw(cnv);
	}
	}
	if(document.getElementById("l5").checked) {
	for(i=0;i<drawables5.length;++i) {
		drawables5[i].draw(cnv);
	}
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
