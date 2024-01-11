<?php
  $mysqli = new mysqli("localhost", "root", "", "messages");

  if ($mysqli->connect_error) {
      die("Connection failed: " . $mysqli->connect_error);
  }

  $messageId = $_GET['id'];

  $result = $mysqli->query("SELECT content FROM messagesent WHERE id = $messageId");

  if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $message = [
          'id' => $messageId,
          'content' => $row['content'],
      ];
      echo json_encode(['message' => $message]);
  } else {
      echo json_encode(['message' => 'Message not found']);
  }

  $mysqli->close();
?>
