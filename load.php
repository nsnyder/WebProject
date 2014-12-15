<?php
  include 'functions/authenticate.php';
  session_start();
  echo getCanvas($_GET['id']);
?>
