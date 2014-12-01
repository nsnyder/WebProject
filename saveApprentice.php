<?php
  session_start();
  echo "Canvas saved! Please return to previous page.";
  $_SESSION['apprenticeCanvas'] = $_POST['canvasData'];
?>
