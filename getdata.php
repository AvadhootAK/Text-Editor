<?php
  $mysqli = new mysqli("localhost", "root", "", "messages");

  if ($mysqli->connect_error) {
      die("Connection failed: " . $mysqli->connect_error);
  }

  $result = $mysqli->query("SELECT * FROM messagesent");

  $messages = [];
  while ($row = $result->fetch_assoc()) {
      $messages[] = [
          'id' => $row['id'],
          'content' => $row['content'],
      ];
  }

  echo json_encode(['messages' => $messages]);

  $mysqli->close();
?>
