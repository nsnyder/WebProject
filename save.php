<?php
  include 'functions/authenticate.php';
  session_start();
  echo "Canvas saved! Please return to previous page.";
  saveCanvas($_POST['id'], $_POST['canvasData']);
  header('Location: artist.php?alert=saved&id='.$_POST['id']);
?>
