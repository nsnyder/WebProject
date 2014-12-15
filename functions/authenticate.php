<?php
  function connect() {
    $servername = "sql5.freemysqlhosting.net";
    $username = "sql561392";
    $password = "wA7!uC6%";
    $dbname = $username;
    $port = "3306";

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

  function confirmFriends($sender, $recipient) {  // Not done
    $pdo = connect();
    $stmt = $pdo->prepare('select count(*) from buddies where (username = :u1  AND friend = :u2) OR (username = :u1  AND friend = :u2) AND accepted = true;');
    $stmt->bindParam(':u1', $accessor);
    $stmt->bindParam(':u2', $accessee);
    $stmt->execute();
    disconnect($pdo);
  }

  function rejectFriends($sender, $recipient) {
    $pdo = connect();
    $stmt = $pdo->prepare('DELETE from buddies where (username = :u1  AND friend = :u2) OR (username = :u2  AND friend = :u1)');
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
      return false;
    }

    disconnect($pdo);
    return true;
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


  //login("Nathan","SnyderPretzels");
  //if(authorized("nsnyder","nsnyder"))
  //  echo "Authorized<br>";

  //if(authorized("mike","stephen")) echo "They are buddies<br>";
  //if(authorized("stephen","mike")) echo "They are buddies<br>";
  //listBuddies("stephen123");
  //rejectFriends("mike","stephen");
  //if(authorized("mike","stephen")) echo "They are buddies<br>";

  //test();



?>
