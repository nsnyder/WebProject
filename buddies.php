<?php
  include 'functions/authenticate.php';
  session_start();
  $user = $_SESSION['user'];
  $level = getLevel($user);
?>
<!DOCTYPE html>
<html>
<head lang="en">
   <meta charset="utf-8">
   <title>Buddies Page</title>
   <link rel="stylesheet" type="text/css" href="css/global.css">
   <link rel="stylesheet" type="text/css" href="css/buddies.css">
   <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
   <script type="text/javascript" src="js/buddies.js"></script>
</head>
<body>
<nav>
	<?php echo '<a href="/WebProject/'.$level.'.php" title="Home">Home</a>' ?>
	<input type="text" id="buddySearchBar" placeholder="Find a buddy"/>
	<a href="/WebProject/buddies.php" title="Buddies List">Buddies</a>
	<a href="logout.php" title="Logout">Logout</a>
</nav>
<div id="MainContent">
  <section id="searchResults">
    <h1>Search Results</h1>
    <div id="resultsPane">

    </div>
  </section>
  <section>
  <h1>Your Buddy Requests</h1>
  <?php
    foreach(listBuddyRequests($user) as $buddy) {
      ?>
      <div class="buddyTile">
      <img src="images/circle.png" title="Profile Picture" alt="<?php echo $buddy['fullname']; ?>'s Picture" />
      <a href="<?php echo getLevel($buddy['username']) . '.php?id=' . $buddy['username']; ?>"><?php echo $buddy['fullname']; ?></a>
      </div>
      <?php
    }
  ?>
  </section>
  <section>
  <h2>Your Buddies</h2>
  <input type="text" id="buddyFilter" placeholder="Filter Buddies"/ style="display: none;">
  <?php
  foreach(listBuddies($user) as $buddy) {
    ?>
    <div class="buddyTile">
      <img src="images/circle.png" title="Profile Picture" alt="<?php echo $buddy['fullname']; ?>'s Picture" />
      <a href="<?php echo getLevel($buddy['username']) . '.php?id=' . $buddy['username']; ?>"><?php echo $buddy['fullname']; ?></a>
    </div>
    <?php
  }
  ?>
  </section>
</div>
</body>
</html>
