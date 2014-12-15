<?php
	include 'functions/authenticate.php';
?>
<!DOCTYPE html>
<html>
<head lang="en">
	<meta charset="utf-8">
	<title>Welcome to GrouPaint</title>
	<link rel="stylesheet" type="text/css" href="css/global.css">
	<link rel="stylesheet" type="text/css" href="css/signup.css">
	<script type="text/javascript" src="js/signup.js"></script>
</head>
<body>
	<canvas id="myCanvas" width="200" height="100"></canvas>
	<section class="main">
	<img src="images/GrouPaint%20working%202.png" title="GrouPaint" alt="GrouPaint" />
	<h1>Sign up</h1>
	<p>Please fill out every section to make a GrouPaint account </p>
	<form id = "signupform" onsubmit="return validateSignup()" method="post">
		<table>
		<tr>
			<td> <label for = "username">User Name:</label> </td>
			<td> <input type = "text" name = "username" id = "username" required> </td>
			<td> <span id="usernamemessage"></span> </td>
		</tr>
		<tr>
			<td> <label for = "pwd">Password:</label> </td>
			<td> <input type = "password" name = "pwd" id = "pwd" required> </td>
		</tr>
		<tr>
			<td> <label for = "confpwd">Confirm Password:</label> </td>
			<td> <input type = "password" name = "confpwd" id = "confpwd" required> </td>
			<td> <span id="pwdconfmessage"></span> </td>
		</tr>
		<tr>
			<td> <label for = "fullname">Full Name:</label> </td>
			<td> <input type = "text" name = "fullname" id = "fullname" required> </td>
		</tr>
		<tr>
			<td> <label for = "birthday">Date of Birth:</label> </td>
			<td> <input type = "date" name = "birthday" id = "birthday" required> </td>
		</tr>
		<tr>
			<td> <label for = "email">Email Address: </label> </td>
			<td> <input type = "text" name = "email" id = "email" required> </td>
		</tr>
		<tr>
			<td> <label for = "usertype">User Type: </label> </td>
			<td> <select required>
					<option selected disabled>Please Choose a User Type</option>
					<option value = "apprentice">Apprentice</option>
					<option value = "artist">Artist</option>
				</select>
			</td>
		</tr>
		</table>
		<button id="submitBtn" type = "submit" value = "Submit">Sign Up</button>
	</form>
	</section>
</body>
</html>
		