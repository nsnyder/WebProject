<?php
  include 'functions/authenticate.php';
  session_start();
  if(!isset($_SESSION['user'])) {
    logout();
    return;
  }
  $authorized = authorized($_SESSION['user'],$_REQUEST['id']);
  $user = $_SESSION['user'];
  $level = getLevel($user);
  if("apprentice" != getLevel($_REQUEST['id'])) {
    if(getLevel($_REQUEST['id'])!=""){
      header('Location: ' . getLevel($_REQUEST['id']) . '.php?id=' . $_REQUEST['id']);
    } else {
      header('Location: ' . getLevel($user) . '.php?id=' . $user);
    }
  }
  if(!$authorized && ($_REQUEST['id'] == "" || !isset($_REQUEST['id']))) {
    header('Location: ' . getLevel($user) . '.php?id=' . $user);
  }
?>
<!DOCTYPE html>
<html>
<head lang="en">
   <meta charset="utf-8">
   <title>Apprentice - <?php echo getName($_REQUEST['id']); ?></title>
   <link rel="stylesheet" type="text/css" href="css/global.css">
   <link rel="stylesheet" type="text/css" href="css/profile.css">
   <?php if($authorized) { ?>
   <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
   <script type="text/javascript" src="js/canvas.js"></script>
   <script type="text/javascript" src="js/rectangle.js"></script>
   <script type="text/javascript" src="js/circle.js"></script>
   <script type="text/javascript" src="js/Line.js"></script>
   <script type="text/javascript" src="js/brush.js"></script>
   <script type="text/javascript" src="js/stack.js"></script>
   <?php } ?>
</head>
<body>
<nav id="MainNav">
	<?php echo '<a href="/WebProject/'.$level.'.php" title="Home">Home</a>' ?>
	<input type="text" id="buddySearchBar" placeholder="Find a buddy"  style="visibility: hidden;"/>
	<a href="/WebProject/buddies.php" title="Buddies List">Buddies</a>
	<a href="logout.php" title="Logout">Logout</a>
</nav>
<div id="MainContent">
  <div id="name"><?php echo getName($_REQUEST['id']); ?></div>
  <?php if($authorized) { ?>
  <div id="frameHolder">
    <?php if(isset($_GET['alert']) && $_GET['alert'] == "saved") { ?>
      <div class="alert">Your creation has been saved!</div>

    <?php } ?>
  	<div id="Frame">
  		<canvas id="mainCanvas" width="480" height="320">
  		</canvas>
  	</div>
  </div>
	<table id="Toolbox">
		<tr>
			<th colspan=2 class="tools">Toolbox</th>
		</tr>
	<tbody>
		<tr>
			<td class="tools active brush">
				<img class="tools" onclick="" src="images/paint_brush_icon.png" alt="brush">
			</td>
			<td class="tools active line">
				<img class="tools" onclick="" src="images/line.png" alt="line">
			</td>
		</tr>
		<tr>
			<td class="tools active rectangle">
				<img class="tools" onclick="" src="images/rectangle_icon.png" alt="rectangle">
			</td>
			<td class="tools active ellipse">
				<img class="tools" onclick="" src="images/ellipse_icon.png" alt="ellipse">
			</td>
		</tr>
		<tr>
			<td>
				Edge
			</td>
			<td>
				Fill
			</td>
		</tr>
		<tr>
			<td>
				<input id="outlineCheck" type="checkbox" checked />
			</td>
			<td>
				<input id="fillCheck" type="checkbox" />
			</td>
		</tr>
		<tr>
			<td colspan="2">
				Stroke Width
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<input type="range" id="thick" min="1" max="25" value="2">
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<div id="demoColor"></div>
			</td>
		</tr>
    <tr>
      <td colspan="2">
        <button id="clearButton">Clear Canvas</button>
      </td>
    </tr>
		</tbody>
	</table>
	<table id="ColorPallet">
		<tr> <th class="pallet" colspan=4>Color Pallet</th> </tr>
		<tbody>
		<tr class="pallet">
			<td id="cFFFFFF" class="colors"></td>
			<td id="c000000" class="colors"></td>
			<td id="c666666" class="colors"></td>
			<td id="cB2B2B2" class="colors"></td>
		</tr>
		<tr class="pallet">
			<td id="c000099" class="colors"></td>
			<td id="c0000FF" class="colors"></td>
			<td id="c3399FF" class="colors"></td>
			<td id="c66CCFF" class="colors"></td>
		</tr>
		<tr class="pallet">
			<td id="cFFFF00" class="colors"></td>
			<td id="cFFFF66" class="colors"></td>
			<td id="c00CC00" class="colors"></td>
			<td id="c66FF66" class="colors"></td>
		</tr>
		<tr class="pallet">
			<td id="cFF0000" class="colors"></td>
			<td id="cFF8080" class="colors"></td>
			<td id="c9900CC" class="colors"></td>
			<td id="cCC66FF" class="colors"></td>
		</tr>
		<tr class="pallet">
			<td id="c663300" class="colors"></td>
			<td id="c996633" class="colors"></td>
			<td id="cFF9933" class="colors"></td>
			<td id="cFFCC66" class="colors"></td>
		</tr>
		</tbody>

	</table>
  <?php } ?>
	<div id="ActionBar">
		<ul id="Share" class="action">
			<li class="horizontal">Share:</li>
      <li class="horizontal"><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//localhost/WebProject/<?php echo getLevel($_REQUEST['id']); ?>.php%3Fid%3D<?php echo $_REQUEST['id']; ?>"><img src="images/social/facebook_16.png" alt="facebook"/></a></li>
      <li class="horizontal"><a href="https://twitter.com/share?url=http%3A//localhost/WebProject/<?php echo getLevel($_REQUEST['id']); ?>.php%3Fid%3D<?php echo $_REQUEST['id']; ?>"><img src="images/social/twitter_16.png" alt="twitter"/></a></li>
		</ul>
		<ul id="UndoRedo" class="action">
			<li class="horizontal"><button id="Undo" onclick="">Undo</button></li>
			<li class="horizontal"><button id="Redo" onclick="">Redo</button></li>
		</ul>
		<ul id="File" class="action">
			<li class="horizontal"><button onclick="window.print()">Print</button></li>
		</ul>

    <?php if($_REQUEST['id']!=$user) { ?>
      <ul id="FriendAction" class="action">
        <?php
        $buttonText = "Error";
        $url = "";
        $class = "";
        switch (getFriendState($user, $_REQUEST['id'])) {
          case NOT_FRIENDS:
            $buttonText = "Add Buddy";
            $class = "normal";
            $url = "friendAction.php?action=add&viewer=" . $user . "&viewee=" . $_REQUEST['id'];
            break;
          case FRIENDS:
            $buttonText = "Remove Buddy";
            $class = "remove";
            $url = "friendAction.php?action=remove&viewer=" . $user . "&viewee=" . $_REQUEST['id'];
            break;
          case WAITING_FOR_YOU:
            echo '<li class="reject horizontal"><a href="' . "friendAction.php?action=reject&viewer=" . $user . "&viewee=" . $_REQUEST['id'] . '">' . "Reject Buddy Request" . '</a></li>';
            $buttonText = "Confirm Buddy Request";
            $class = "confirm";
            $url = "friendAction.php?action=confirm&viewer=" . $user . "&viewee=" . $_REQUEST['id'];
            break;
          case WAITING_FOR_THEM:
            $buttonText = "Request Sent";
            $class = "disabled";
            $url = "#";
            break;
        }
        echo '<li class="' . $class . ' horizontal"><a href="' . $url . '">' . $buttonText . '</a></li>';

        ?>
      </ul>
      <?php } ?>
	</div>
</div>
</body>
</html>
