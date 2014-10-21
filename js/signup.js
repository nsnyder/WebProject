var message;
var pass;
var confpass;
window.onload = function() {
pass = document.getElementById("pwd");
confpass = document.getElementById("confpwd");
message = document.getElementById("pwdconfmessage");

pass.addEventListener("keyup",checkpass);
confpass.addEventListener("keyup",checkpass);
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