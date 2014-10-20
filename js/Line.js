function measureToNumber(str){
	var parts = str.split("p");
	var val = parts[0];
	val = Number(val);
	return val;
}

function Line(){
	this.color="#000000";
	this.draw=function(cnv){
	}
	this.originX;
	this.originY;
	this.endX;
	this.endY;
	this.mouseClick = function(e) {
		//Get Main content left padding
		var mainContentStyle = getComputedStyle(document.getElementById("MainContent"), null);
		var leftPad = measureToNumber(mainContentStyle.paddingLeft);
		//Get Frame width for left and top and get frame top margin
		var frameStyle = getComputedStyle(document.getElementById("Frame"), null);
		var frameLeftWidth = measureToNumber(frameStyle.borderLeftWidth);
		var frameTopWidth = measureToNumber(frameStyle.borderTopWidth);
		var frameTopMargin = measureToNumber(frameStyle.marginTop);
		//Get MainNav box height (assuming nav bar remains same format)
		var mainNavStyle = getComputedStyle(document.getElementById("MainNav"), null);
		var mainNavHeight = measureToNumber(mainNavStyle.height)+ measureToNumber(mainNavStyle.paddingBottom) + measureToNumber(mainNavStyle.paddingTop);
		
		//Adjust originX and originY so that it maps in accordance with canvas context
		this.originX = e.clientX - leftPad - frameLeftWidth;
		this.originY = e.clientY - frameTopWidth - frameTopMargin - mainNavHeight;
		alert("X: " + this.originX + " Y: " + this.originY);
		mouseDown = true;
	}
	this.mouseHold = function() {
		// update endx and endy
		// constantly redraw canvas so that preview can be seen
		mouseDown = true;
	}
	this.mouseRelease = function() {
		// push new line unto drawables?
		mouseDown = false;
	}
}

window.onload=function(){
	myLine = new Line;
	canvas = document.getElementById("mainCanvas");
	canvas.addEventListener("click", myLine.mouseClick);
}