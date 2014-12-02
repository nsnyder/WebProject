<?php
  session_destroy();
  session_regenerate_id(true);
  $_SESSION = array();
  header('Location: login.php');
?>