//mainCanvas container
var canvas;
//Tells when user is holding down mouse
var mouseDown = false;

window.onload=function(){
	canvas = document.getElementById("mainCanvas");
	canvas.addEventListener("mouseover", changeCursor);
}

function mouseClick(){
}

function mouseRelease(){
}

function mouseOut(){
}

function 

function changeCursor(){
	canvas.style.cursor="pointer";
}
