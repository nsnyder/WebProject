<?php
  include 'functions/authenticate.php';
  session_start();
  searchUser($_REQUEST['searchString']);
?>
