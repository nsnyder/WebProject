<?php
  function connect() {
    $servername = "sql5.freemysqlhosting.net";
    $username = "sql561392";
    $password = "wA7!uC6%";
    $dbname = $username;
    $port = "3306";

    if(!defined("FRIENDS")) define("FRIENDS", 0);
    if(!defined("NOT_FRIENDS")) define("NOT_FRIENDS", 1);
    if(!defined("WAITING_FOR_YOU")) define("WAITING_FOR_YOU", 2);
    if(!defined("WAITING_FOR_THEM")) define("WAITING_FOR_THEM", 3);

    try {
      // Create connection
      $pdo = new PDO('mysql:host=' . $servername . ';port=' . $port . ';dbname=' . $dbname, $username, $password);
    } catch (PDOException $e) {
      die("Error: " . $e->getMessage() . "<br>");
    }

    //echo "Connected successfully<br>";
    return $pdo;
  }

  function disconnect($pdo) {
    try {
      $pdo = null;
    } catch(PDOException $e) {
      die("Error: " . $e->getMessage() . "<br>");
    }
  }

  function authorized($accessor, $accessee) {
    if(!isset($_SESSION['user'])) {
      logout();
    }
    if($accessor===$accessee) {
      return true;
    }

    $authorized = false;

    $pdo = connect();

    // Prepare statement to check if they're friends
    $stmt = $pdo->prepare('select count(*) from buddies where ((username = :u1  AND friend = :u2) OR (username = :u2 AND friend = :u1)) AND accepted = true;');
    $stmt->bindParam(':u1', $accessor);
    $stmt->bindParam(':u2', $accessee);
    $stmt->execute();
    $response = $stmt->fetchAll();
    if($response[0][0]==="1") {  // If there is one column, they're friends
      $authorized = true;
    }
    disconnect($pdo);
    return $authorized;
  }

  function confirmFriends($sender, $recipient) {
    $pdo = connect();
    $stmt = $pdo->prepare('UPDATE buddies SET accepted = true WHERE (username = :u1 AND friend = :u2);');
    $stmt->bindParam(':u1', $sender);
    $stmt->bindParam(':u2', $recipient);
    $stmt->execute();
    disconnect($pdo);
  }

  function rejectFriends($sender, $recipient) {
    $pdo = connect();
    $stmt = $pdo->prepare('DELETE from buddies where (username = :u1  AND friend = :u2) OR (username = :u2 AND friend = :u1)');
    $stmt->bindParam(':u1', $sender);
    $stmt->bindParam(':u2', $recipient);
    $stmt->execute();
    disconnect($pdo);
  }

  function unfriend($user1, $user2) {
    rejectFriends($user1, $user2);
  }

  function addFriend($sender, $recipient) {
    $pdo = connect();

    $stmt = $pdo->prepare('INSERT INTO buddies (username, friend, accepted) VALUES (:sender, :rec, 0)');
    $stmt->bindParam(':sender', $sender);
    $stmt->bindParam(':rec', $recipient);
    $stmt->execute();

    disconnect($pdo);
  }

  function insertUser($username, $password, $type, $fullname, $email, $birthday) {

    $pdo = connect();
    $password = sha1($password);
    $stmt = $pdo->prepare('SELECT count(*) FROM accounts WHERE username = :username');
    $stmt->bindParam(':username', $username);
    $result = $stmt->fetchAll();
    if(isset($result[0]) && isset($result[0][0]) && $result[0][0]==1) {
      return -1;
    }

    $stmt = $pdo->prepare('INSERT INTO accounts (username, passphrase, account_type, fullname, email, birthday) VALUES (:username, :password, :type, :name, :email, :bday);');
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':type', $type);
    $stmt->bindParam(':name', $fullname);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':bday', $birthday);

    try {
      $stmt->execute();
    } catch (PDOException $e) {
      return 0;
    }

    disconnect($pdo);
    return 1;
  }

  function listBuddies($username) {
    $queryString = <<<EOL
    SELECT accounts.username, accounts.fullname, accounts.account_type FROM
    ((SELECT username FROM buddies WHERE friend = :username AND accepted = true)
    UNION
    (SELECT friend as username FROM buddies WHERE username = :username AND accepted = true)) AS T
    JOIN accounts ON T.username = accounts.username;
EOL;
    $pdo = connect();
    $stmt = $pdo->prepare($queryString);
    $stmt->bindParam(':username', $username);
    $stmt->execute();

    $result = $stmt->fetchAll();
    return $result;
  }

  function listBuddyRequests($username) {
    $queryString = <<<EOL
    SELECT accounts.username, accounts.fullname, accounts.account_type FROM
    (SELECT username FROM buddies WHERE friend = :username AND accepted = false) AS T
    JOIN accounts ON T.username = accounts.username;
EOL;
    $pdo = connect();
    $stmt = $pdo->prepare($queryString);
    $stmt->bindParam(':username', $username);
    $stmt->execute();

    $result = $stmt->fetchAll();
    return $result;
  }

  function login($username, $password) {
    $password = sha1($password);
    $pdo = connect();
    $valid = false;

    $stmt = $pdo->prepare('select count(*) from accounts where (username = :username AND passphrase = :password)');
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);
    $stmt->execute();
    $result = $stmt->fetchAll();
    if($result[0][0]==1) {
      $valid = true;
    } else {
      $valid = false;
    }


    disconnect($pdo);
    return $valid;
  }

  function getLevel($username) {
    $pdo = connect();
    $stmt = $pdo->prepare('select account_type from accounts where username = :username');
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $result = $stmt->fetchAll();
    return $result[0]['account_type'];
  }

  function logout() {
    session_destroy();
    session_unset();
    session_regenerate_id(true);
    $_SESSION = array();
    header('Location: login.php');
  }

  function saveCanvas($user, $blob) {
    $pdo = connect();
    $stmt = $pdo->prepare('UPDATE accounts SET canvas = :blob WHERE (username = :user);');
    $stmt->bindParam(':user', $user);
    $stmt->bindParam(':blob', $blob);
    $stmt->execute();
    disconnect($pdo);
  }

  function getCanvas($user) {
    $pdo = connect();
    $stmt = $pdo->prepare('select canvas from accounts where username = :username');
    $stmt->bindParam(':username', $user);
    $stmt->execute();
    $result = $stmt->fetchAll();
    try {
      return $result[0]['canvas'];
    } catch (Exception $e) {
      return "";
    }
  }

  function getName($user) {
    $pdo = connect();
    $stmt = $pdo->prepare('select fullname from accounts where username = :username');
    $stmt->bindParam(':username', $user);
    $stmt->execute();
    $result = $stmt->fetchAll();
    try {
      return $result[0]['fullname'];
    } catch (Exception $e) {
      return "";
    }
  }

  function getFriendState($viewer, $viewee) {
    $pdo = connect();
    $stmt = $pdo->prepare("SELECT * FROM buddies WHERE (friend = :username AND username = :id) OR (username = :username AND friend = :id)");
    $stmt->bindParam(':username', $viewer);
    $stmt->bindParam(':id', $viewee);
    $stmt->execute();

    $result = $stmt->fetchAll();
    if(!empty($result)) {
      if($result[0]['accepted']) {
        return FRIENDS;
      } elseif (strtolower($result[0]['username'])==strtolower($viewer)) {
        return WAITING_FOR_THEM;
      } elseif (strtolower($result[0]['friend'])==strtolower($viewer)) {
        return WAITING_FOR_YOU;
      } else {
        print_r($result);
        return NOT_FRIENDS;
      }
    } else {
      return NOT_FRIENDS;
    }
  }

  function searchUser($sstring) {
    $pdo = connect();
    $sstring = implode("% %",explode(" ",$sstring));
    $sstring = '%'.$sstring.'%';
    $stmt = $pdo->prepare('SELECT fullname, username, account_type FROM accounts WHERE username LIKE :search OR fullname LIKE :search');
    $stmt->bindParam(':search', $sstring);
    $stmt->execute();
    $result = $stmt->fetchAll();
    foreach($result as $buddy) {
      echo '<div class="buddyTile">';
      echo '<a href="'. getLevel($buddy['username']) . '.php?id=' . $buddy['username'] . '">';
      echo '<img src="images/circle.png" title="Profile Picture" alt="' . $buddy['fullname'] . '\'s Picture" />';
      echo '</a>';
      echo '<a href="' . getLevel($buddy['username']) . '.php?id=' . $buddy['username'] . '">'  . $buddy['fullname'] . '</a>';
      echo '</div>';
    }
  }


  //login("Nathan","SnyderPretzels");
  //if(authorized("nsnyder","nsnyder"))
  //  echo "Authorized<br>";

  //if(authorized("mike","stephen")) echo "They are buddies<br>";
  //if(authorized("stephen","mike")) echo "They are buddies<br>";
  //listBuddies("stephen123");
  //rejectFriends("mike","stephen");
  //if(authorized("mike","stephen")) echo "They are buddies<br>";

  //test();
  //echo getFriendState("nathan", "matt");



?>
