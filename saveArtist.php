<?php
  session_start();
  echo "Canvas saved! Please return to previous page.";
  $_SESSION['artistCanvas'] = $_POST['canvasData'];
?>
