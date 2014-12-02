<?php
  session_start();
  $u = $_SESSION['user'];
  $level = $u['userLevel'];
?>
<!DOCTYPE html>
<html>
<head lang="en">
   <meta charset="utf-8">
   <title>Change this</title>
   <link rel="stylesheet" type="text/css" href="css/global.css">
   <link rel="stylesheet" type="text/css" href="css/buddies.css">
</head>
<body>
<nav>
	<?php echo '<a href="/WebProject/'.$level.'.php" title="Home">Home</a>' ?>
	<input type="text" id="buddySearchBar" placeholder="Find a buddy"/>
	<a href="/WebProject/buddies.php" title="Buddies List">Buddies</a>
	<a href="#" title="Logout">Logout</a>
</nav>
<div id="MainContent">
<section>
<h1>Your Buddies</h1>
<input type="text" id="buddyFilter" placeholder="Filter Buddies"/>
<div class="buddyTile">
	<img src="images/james_mckay.jpg" title="Profile Picture" alt="James McKay's Picture" />
	<a href="#">James McKay</a>
</div>
<div class="buddyTile">
	<img src="images/professor_boatright.jpg" title="Profile Picture" alt="Professor Boatright's Picture" />
	<a href="#">Professor Boatright</a>
</div>
<div class="buddyTile">
	<img src="images/heart.png" title="Profile Picture" alt="Buddy 1's Picture" />
	<a href="#">&lt;&lt; These guys</a>
</div>
<div class="buddyTile">
	<img src="images/circle.png" title="Profile Picture" alt="Buddy 1's Picture" />
	<a href="#">Buddy 4</a>
</div>
<div class="buddyTile">
	<img src="images/circle.png" title="Profile Picture" alt="Buddy 1's Picture" />
	<a href="#">Buddy 5</a>
</div>
<div class="buddyTile">
	<img src="images/circle.png" title="Profile Picture" alt="Buddy 1's Picture" />
	<a href="#">Buddy 6</a>
</div>
<div class="buddyTile">
	<img src="images/circle.png" title="Profile Picture" alt="Buddy 1's Picture" />
	<a href="#">Buddy 7</a>
</div>
<div class="buddyTile">
	<img src="images/circle.png" title="Profile Picture" alt="Buddy 1's Picture" />
	<a href="#">Buddy 8</a>
</div>
<div class="buddyTile">
	<img src="images/circle.png" title="Profile Picture" alt="Buddy 1's Picture" />
	<a href="#">Buddy 9</a>
</div>
<div class="buddyTile">
	<img src="images/circle.png" title="Profile Picture" alt="Buddy 1's Picture" />
	<a href="#">Buddy 10</a>
</div>
</section>
</div>
</body>
</html>
