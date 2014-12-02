<?php
  session_start();
  session_destroy();
  session_unset();
  session_regenerate_id(true);
  $_SESSION = array();
  header('Location: login.php');
?>
