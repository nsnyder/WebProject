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
		var mainContent = document.getElementById("MainContent");
		var leftPad = mainContent.paddingLeft;
		//Get Frame width for left and top and get frame top margin
		var frame = document.getElementById("Frame");
		var frameLeftWidth = frame.borderLeftWidth;
		var frameTopWidth = frame.borderTopWidth;
		var frameTopMargin = frame.marginTop;
		//Get MainNav box height (assuming nav bar remains same format)
		var mainNav = document.getElementById("MainNav");
		var mainNavHeight = mainNav.height+mainNav.paddingTop;
		
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