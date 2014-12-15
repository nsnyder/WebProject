<?php
  include 'functions/authenticate.php';
  session_start();
  $username = $_REQUEST['username'];
  $password = $_REQUEST['pwd'];
  $type = $_REQUEST['usertype'];
  $fullname = $_REQUEST['fullname'];
  $email = $_REQUEST['email'];
  $birthday = $_REQUEST['birthday'];
  if(insertUser($username, $password, $type, $fullname, $email, $birthday) == "-1") {
    echo "tosignup";
    header('Location: signup.php?error=duplicateUsername');
  } else {
    echo "tologin";
    header('Location: login.php?error=accountCreated');
  }
?>
