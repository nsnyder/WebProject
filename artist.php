<!DOCTYPE html>
<html>
<head lang="en">
   <meta charset="utf-8">
   <title>Artist</title>
   <link rel="stylesheet" type="text/css" href="css/global.css">
   <link rel="stylesheet" type="text/css" href="css/artist.css">
   <script type="text/javascript" src="js/artistcanvas.js"></script>
   <script type="text/javascript" src="js/rectangle.js"></script>
   <script type="text/javascript" src="js/circle.js"></script>
   <script type="text/javascript" src="js/Line.js"></script>
   <script type="text/javascript" src="js/brush.js"></script>
   <script type="text/javascript" src="js/stack.js"></script>
</head>
<body>
<nav>
	<a href="/WebProject/artist.html" title="Home">Home</a>
	<input type="text" id="buddySearchBar" placeholder="Find a buddy" />
	<a href="/WebProject/buddies.html" title="Buddies List">Buddies</a>
	<a href="#" title="Logout">Logout</a>
</nav>
<div id="MainContent">
<div id="Frame">
	<canvas id="mainCanvas" width="480" height="320">
		</canvas>
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
			<td class="tools eraser">
				<img class="tools" onclick="" src="images/eraser_icon.png" alt="eraser">
			</td>
		</tr>
		<tr>
			<td class="tools picker">
				<img class="tools" onclick="" src="images/color_picker_icon2.png" alt="dropper">
			</td>
			<td class="tools text">
				<img class="tools" onclick="" src="images/text_icon.png" alt="text">
			</td>
		</tr>
		<tr>
			<td class="tools active line">
				<img class="tools" onclick="" src="images/line.png" alt="line">
			</td>
			<td class="tools bucket">
				<img class="tools" onclick="" src="images/paint_bucket_icon.png" alt="fill">
			</td>
		</tr>
		<tr>
			<td class="tools select">
				<img class="tools" onclick="" src="images/select_icon.png" alt="select">
			</td>
			<td class="tools pan">
				<img class="tools" onclick="" src="images/pan_icon.png" alt="pan">
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
		</tbody>
	</table>
<table id="Layers">
    <thead><tr><th colspan=2 class="tools">Layers</th></tr></thead>
	<tbody>
  <tr>
    <td class="tools"><input id="l1" type="checkbox" checked /></td>
    <td class="tools layer layer1 selected">Layer 1</td>
  </tr>
  <tr>
    <td class="tools"><input id="l2" type="checkbox" checked /></td>
    <td class="tools layer layer2">Layer 2</td>
  </tr>
  <tr>
    <td class="tools"><input id="l3" type="checkbox" checked /></td>
    <td class="tools layer layer3">Layer 3</td>
  </tr>
  <tr>
    <td class="tools"><input id="l4" type="checkbox" checked /></td>
    <td class="tools layer layer4">Layer 4</td>
  </tr>
  <tr>
    <td class="tools"><input id="l5" type="checkbox" checked /></td>
    <td class="tools layer layer5">Layer 5</td>
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
<div id="ActionBar">
	<ul id="Share" class="action">
		<li class="horizontal">Share:</li>
		<li class="horizontal"><img onclick="" src="images/social/facebook_16.png" alt="facebook"/></li>
		<li class="horizontal"><img onclick="" src="images/social/flickr_16.png" alt="flickr"/></li>
		<li class="horizontal"><img onclick="" src="images/social/google_plus_16.png" alt="google+"/></li>
		<li class="horizontal"><img onclick="" src="images/social/twitter_16.png" alt="twitter"/></li>
		<li class="horizontal"><img onclick="" src="images/social/email_16.png" alt="email"/></li>
	</ul>
	<ul id="UndoRedo" class="action">
		<li class="horizontal"><button id="Undo" onclick="">Undo</button></li>
		<li class="horizontal"><button id="Redo" onclick="">Redo</button></li>
	</ul>
	<ul id="File" class="action">
    <form name="saveCanvas">
  		<li class="horizontal"><button onclick="">Save</button></li>
      <input name="canvasData" type="hidden">
    </form>
		<li class="horizontal"><button onclick="">Download</button></li>
		<li class="horizontal"><button onclick="">Upload</button></li>
	</ul>
</div>
</div>
</body>
</html>