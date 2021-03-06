<!DOCTYPE html>
<?php
	session_start();
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
<form action = "signinHandler.php" method = "post">
	<?php if(isset($_GET['error']) && $_GET['error'] == 'signin') { echo '<div class="alert">Invalid username or password</div>'; }?>
	<?php if(isset($_GET['error']) && $_GET['error'] == 'accountCreated') { echo '<div class="alert">Account created! Please sign in.</div>'; }?>
	<input type = "text" name = "username" placeholder="User Name">
	<input type = "password" name = "pwd" placeholder="Password">
	<button id="submitBtn" type = "submit" value = "Submit">Log In</button>
</form>
</section>
<section>
<a href="signup.php" class="buttonImitator">Make a new account</a>
</section>
</body>
</html>
