<?php
  include 'functions/authenticate.php';
  session_start();
  $level = getLevel($_SESSION['user']);
  $sender = $_REQUEST['viewer'];
  $recipient = $_REQUEST['viewee'];
  if($_REQUEST['viewer']!=$_SESSION['user']) {
    header('Location: ' . $level . '.php?id=' . $_SESSION['user']);
    return;
  }
  if($_REQUEST['action']=="add") {
    addFriend($sender, $recipient);
  } elseif ($_REQUEST['action']=="remove") {
    unfriend($sender, $recipient);
  } elseif ($_REQUEST['action']=="confirm") {
    confirmFriends($recipient, $sender);
  } elseif ($_REQUEST['action']=="reject") {
    rejectFriends($sender, $recipient);
  }

  header('Location: ' . getLevel($sender) . '.php?id=' . $recipient);
?>
