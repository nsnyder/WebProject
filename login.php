<!DOCTYPE html>
<?php
	session_start();
	//Hardcode users
	$users = array(
		"Nate" => "Snyder",
		"Mike" => "Curtis",
		"Stephen" => "Tam",
		"Matt" => "Adamo"
	);
	
	//Hardcode user levels
	$userLevels = array(
		"Nate" => "artist",
		"Mike" => "artist",
		"Stephen" => "apprentice",
		"Matt" => "apprentice"
	);
	
	//Retrieve username and password from form
	if(isset($_POST['username'])){
		$un = $_POST['username'];
	}
	if(isset($_POST['pwd'])){
		$pw = $_POST['pwd'];
	}
	$level = "";
	
	//Check for the username then check if password matches then get the level then set session user
	if(isset($_POST['username']) && isset($_POST['pwd'])){
		foreach($users as $username=>$password){
			if($un == $username){
				if($pw == $password){
					foreach($userLevels as $user => $lvl){
						if($un == $user){
							$level = $lvl;
						}
					}
					//set session user and send user to right page
					$_SESSION['user'] = array( "username" => $_POST['username'], "userLevel" => $level);
					header('Location:'.$level.'.php');
				}
				else{
					echo "<script type='text/javascript'>alert('Username or password was incorrect!');</script>";
				}
			}
		}
	}
?>
<html>
<head lang="en">
   <meta charset="utf-8">
   <title>Welcome to GrouPaint</title>
   <link rel="stylesheet" type="text/css" href="css/global.css">
   <link rel="stylesheet" type="text/css" href="css/login.css">
   <script type="text/javascript" src="js/login.js"></script>
</head>
<body>
<canvas id="myCanvas" width="200" height="100"></canvas>
<section class="main">
<img src="images/GrouPaint%20working%202.png" title="GrouPaint" alt="GrouPaint" />
<h2>Please log in </h2>
<form action = "login.php" method = "post">
	<input type = "text" name = "username" placeholder="User Name">
	<input type = "password" name = "pwd" placeholder="Password">
	<button id="submitBtn" type = "submit" value = "Submit">Log In</button>
</form>
</section>
<section>
<a href="#" class="buttonImitator">Make a new account</a>
</section>
</body>
</html>