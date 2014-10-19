//mainCanvas container
var canvas;
//Tells when user is holding down mouse
var mouseDown = false;
var drawables = [];

window.onload=function(){
	canvas = document.getElementById("mainCanvas");
	canvas.addEventListener("mouseover", changeCursor);
}

function render(cnv) {
	for(i=0;i<drawables.length;++i) {
		drawables[i].draw(cnv);
	}
}

function BrushStroke() {
	this.draw = function(cnv) {
		ctx = cnv.getContext("2d");
		if(xCoords.length>1) {
			ctx.moveTo(this.xCoords[0],this.yCoords[0]);
				for(int i=1;i<xCoords.length;++i) {
				// draw 
			}
		} else if(xCoords.length>0) { // is single pointer
			ctx.moveTo(this.xCoords[0],this.yCoords[0]);
			ctx.stroke();
		}
		return;
	}
	this.xCoords = [];
	this.yCoords = [];
	this.color = "#000"; // black
	this.empty = true;
	this.mouseClick = function() {
		// get initial point
		mouseDown = true;
	}
	this.mouseHold = function() {
		// add points to array
		mouseDown = true;
	}
	this.mouseRelease = function() {
		mouseDown = false;
	}
}

function changeCursor(){
	canvas.style.cursor="pointer";
}
