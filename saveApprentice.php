<?php
  include 'functions/authenticate.php';
  session_start();
  echo "Canvas saved! Please return to previous page.";
  $_SESSION['apprenticeCanvas'] = $_POST['canvasData'];
  header('Location: apprentice.php?alert=saved');
?>
