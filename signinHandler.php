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
	$un = $_POST['username'];
	$pw = $_POST['pwd'];
	$level = "";
	
	//Check for the username then check if password matches then get the level then set session user
	foreach($users as $username=>$password){
		if($un == $username){
			if($pw == $password){
				foreach($userLevels as $user => $lvl){
					if($un == $user){
						$level = $lvl;
					}
				}
				$_SESSION['user'] = array( "username" => $_POST['username'], "userLevel" => $level);
				header('Location:'.$level.'.php');
				//set session user and send them to correct page
			}
			else{
				//notify that the password does not match
			}
		}
	}
	$_SESSION['user'] = array( "username" => $_POST['username'], "usertype" => 
	header('Location:'.$type.'.php');
?>