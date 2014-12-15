<?php
include 'functions/authenticate.php';

//Check for the username then check if password matches then get the level then set session user
if(isset($_POST['username']) && isset($_POST['pwd'])){
	if(login($_POST['username'],$_POST['pwd'])) {
		$_SESSION['username'] = $_POST['username'];
		header('Location:' . getLevel($_SESSION['username']) . '.php?id='.$_SESSION['username']);
	} else {
		header('Location: login.php?error=signin');
	}
}
?>
