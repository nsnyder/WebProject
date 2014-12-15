var usernamemessage;
var	passmessage;
var pass;
var confpass;	
window.onload = function() {
username = document.getElementById("username");
usernamemessage = document.getElementById("usernamemessage");
pass = document.getElementById("pwd");
confpass = document.getElementById("confpwd");
passmessage = document.getElementById("pwdconfmessage");
username.addEventListener("keyup",checkusername);
pass.addEventListener("keyup",checkpass);
confpass.addEventListener("keyup",checkpass);

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


function checkpass()
{
	if(pass.value == confpass.value && pass.value != "")
	{
		passmessage.innerHTML = "Password Confirmed!";
	}
	else if(pass.value != confpass.value)
	{
		passmessage.innerHTML = "Passwords do not match";
	}
	else if(pass.value == "" && confpass.value == "")
	{
		passmessage.innerHTML = "";
	}
}