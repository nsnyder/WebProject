//mainCanvas container
var canvas;
//Tells when user is holding down mouse
var painting = false;
var drawables = [];
var drawablesArray = [];
var redoDrawables = [];
var redoDrawablesArray = [];
var tool;
var layerN;
var layerCount = 5;

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
(function($) {
	$.QueryString = (function(a) {
		if (a == "") return {};
		var b = {};
		for (var i = 0; i < a.length; ++i)
		{
			var p=a[i].split('=');
			if (p.length != 2) continue;
			b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	})(window.location.search.substr(1).split('&'))
})(jQuery);

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
	layerN = 0;
	for(var i=0;i<layerCount;++i) {
		drawablesArray.push(new Array());
		redoDrawablesArray.push(new Array());
	}
	canvas = document.getElementById("mainCanvas");
	loadSaved(canvas);

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
	var saveBtn = document.getElementById("updateAndSave");
	var undoBtn = document.getElementById("Undo");
	var redoBtn = document.getElementById("Redo");
	var clearBtn = document.getElementById("clearButton");
	var thicknessBtn = document.getElementById("thick");
	undoBtn.addEventListener("click",undo);
	redoBtn.addEventListener("click",redo);
	thicknessBtn.addEventListener("change",function() { try {tool.strokeWidth = this.value; updateColorDisplay(); } catch (e){} } );
	canvas.addEventListener("mouseup",updateAndSave);
	clearBtn.addEventListener("click",clear);


	document.getElementById("l0").addEventListener("change",function() { render(canvas); } );
	document.getElementById("l1").addEventListener("change",function() { render(canvas); } );
	document.getElementById("l2").addEventListener("change",function() { render(canvas); } );
	document.getElementById("l3").addEventListener("change",function() { render(canvas); } );
	document.getElementById("l4").addEventListener("change",function() { render(canvas); } );
}
function setLayer() {
	var layers = document.getElementsByClassName("layer");
	for(var i=0;i<layers.length;++i) {
		layers[i].className = layers[i].className.replace( /(?:^|\s)selected(?!\S)/g , '' )
	}
	this.className += " selected";

	drawablesArray[layerN] = drawables;
	redoDrawablesArray[layerN] = redoDrawables;

	layerN = parseInt($(this).children('input')[0].value,10);
	drawables = drawablesArray[layerN];
	redoDrawables = redoDrawablesArray[layerN];

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

	drawables = drawablesArray[layerN];
	for(var i=0;i<drawablesArray.length;++i) {
		if(document.getElementById("l"+i).checked) {
			for(j=0;j<drawablesArray[i].length;++j) {
				drawablesArray[i][j].draw(cnv);
			}
		}
	}

}

function loadSaved(cnv) {
	$.ajax({
		type: "GET",
		url: "load.php",
		data: { id:$.QueryString["id"] }
	})
	.done(function() {
		//alert( "success" );
	})
	.fail(function() {
		//alert( "error" );
	}).always(function(data) {
		if(data != "") {
			var newData = JSON.parse(decodeURIComponent(data));
			for(i=0;i<newData.drawablesArray.length;++i) {
				for(j=0;j<newData.drawablesArray[i].length;++j) {
					if(newData.drawablesArray[i][j].type == "Text") {
						drawablesArray[i].push(new Text(cnv,newData.drawablesArray[i][j]));
					}
					if(newData.drawablesArray[i][j].type == "Brush") {
						drawablesArray[i].push(new Brush(cnv,newData.drawablesArray[i][j]));
					}
					if(newData.drawablesArray[i][j].type == "Rectangle") {
						drawablesArray[i].push(new Rectangle(cnv,newData.drawablesArray[i][j]));
					}
					if(newData.drawablesArray[i][j].type == "Circle") {
						drawablesArray[i].push(new Circle(cnv,newData.drawablesArray[i][j]));
					}
					if(newData.drawablesArray[i][j].type == "Line") {
						drawablesArray[i].push(new Line(cnv,newData.drawablesArray[i][j]));
					}
				}
			}
			for(i=0;i<newData.redoDrawablesArray.length;++i) {
				for(j=0;j<newData.redoDrawablesArray[i].length;++j) {
					if(newData.redoDrawablesArray[i][j].type == "Text") {
						redoDrawablesArray[i].push(new Text(cnv,newData.redoDrawablesArray[i][j]));
					}
					if(newData.redoDrawablesArray[i][j].type == "Brush") {
						redoDrawablesArray[i].push(new Brush(cnv,newData.redoDrawablesArray[i][j]));
					}
					if(newData.redoDrawablesArray[i][j].type == "Rectangle") {
						redoDrawablesArray[i].push(new Rectangle(cnv,newData.redoDrawablesArray[i][j]));
					}
					if(newData.redoDrawablesArray[i][j].type == "Circle") {
						redoDrawablesArray[i].push(new Circle(cnv,newData.redoDrawablesArray[i][j]));
					}
					if(newData.redoDrawablesArray[i][j].type == "Line") {
						redoDrawablesArray[i].push(new Line(cnv,newData.redoDrawablesArray[i][j]));
					}
				}
			}
		}
		render(cnv);
	});
}

function updateAndSave(event) {
	try {
		event.preventDefault();
	} catch(e) {

	}
	drawables.push(tool);
	drawablesArray[layerN] = drawables;
	redoDrawablesArray[layerN] = redoDrawables;
	var newData = { drawablesArray: drawablesArray, redoDrawablesArray: redoDrawablesArray };
	for(i=0;i<newData.drawablesArray.length;++i) {
		for(j=0;j<newData.drawablesArray[i].length;++j) {
			if(newData.drawablesArray[i][j]==undefined) {
				newData.drawablesArray[i].length = j;
			} else {
				newData.drawablesArray[i][j].canvas = undefined;
			}
		}
	}
	for(i=0;i<newData.redoDrawablesArray.length;++i) {
		for(j=0;j<newData.redoDrawablesArray[i].length;++j) {
			if(newData.redoDrawables[i]==undefined) {
				newData.redoDrawablesArray[i].length = j;
			} else {
				newData.redoDrawablesArray[i][j].canvas = undefined;
			}
		}
	}

	$.ajax({
		type: "POST",
		url: "save.php",
		data: {canvasData: encodeURIComponent(JSON.stringify(newData)), id:$.QueryString["id"]}
		})
	.done(function() {
		//alert( "success" );
	})
	.fail(function() {
		//alert( "error" );
	}).always(function() {
		for(i=0;i<drawablesArray.length;++i) {
			for(j=0;j<drawablesArray[i].length;++j) {
				if(drawablesArray[i][j]==undefined) {
					drawablesArray[i].length = j;
				} else {
					drawablesArray[i][j].canvas = canvas;
				}
			}
		}
		for(i=0;i<redoDrawablesArray.length;++i) {
			for(j=0;j<redoDrawablesArray[i].length;++j) {
				if(redoDrawables[i]==undefined) {
					redoDrawablesArray[i].length = j;
				} else {
					redoDrawablesArray[i][j].canvas = canvas;
				}
			}
		}
		render(canvas);
	});
}

function clear() {
	for(i=0;i<drawablesArray.length;++i) {
		drawablesArray[i] = [];
	}
	for(i=0;i<redoDrawablesArray.length;++i) {
		redoDrawablesArray[i] = [];
	}
	drawables = [];
	redoDrawables = [];
	render(canvas);
	updateAndSave();
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
