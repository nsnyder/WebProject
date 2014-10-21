window.onload = function() {
var pass = document.getElementById("pwd");
var confpass = document.getElementById("confpwd");
var message = document.getElementById("pwdconfmessage");

pass.addEventListener("onkeyup",checkpass);
confpass.addEventListener("onkeyup",checkpass);
}

function checkpass()
{
	if(pass.value == confpass.value)
	{
		message.innerHTML = "Password Confirmed!";
	}
	else
	{
		message.innerHTML = "Passwords do not match";
	}
}