<?php
include 'functions/authenticate.php';
session_start();
//Check for the username then check if password matches then get the level then set session user
if(isset($_POST['username']) && isset($_POST['pwd'])){
	if(login($_POST['username'],$_POST['pwd'])) {
		$_SESSION['user'] = $_POST['username'];
		header('Location:' . getLevel($_SESSION['user']) . '.php?id='.$_SESSION['user']);
	} else {
		header('Location: login.php?error=signin');
	}
}
?>
