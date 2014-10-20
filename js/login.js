window.onload = function() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.canvas.width  = window.innerWidth+20;
	ctx.canvas.height = window.innerHeight;
	var radius = 10;
	var centerX = 5;
	var centerY = 5;
	while(centerY < ctx.canvas.height) {
		while(centerX < ctx.canvas.width) {
			ctx.beginPath();
			var colors = ["#fcc","#fef","#9fd","#cfc","#cde"];
			
			ctx.fillStyle = colors[getRandomInt(0,colors.length)];
			
			
			
			ctx.arc(centerX,centerY,radius,0,2*Math.PI);
			ctx.fill();
			centerX+=2*radius+2;
		}
		centerY+=2*radius+2;
		centerX=5;
	}
	/*Login event listener*/
	var loginBtn = document.getElementById();
	/*end login listener*/
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}