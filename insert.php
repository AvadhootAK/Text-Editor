<?php
  $mysqli = new mysqli("localhost", "root", "", "messages");

  if ($mysqli->connect_error) {
      die("Connection failed: " . $mysqli->connect_error);
  }

  $data = json_decode(file_get_contents('php://input'), true);

  $content = $mysqli->real_escape_string($data['content']);
  $result = $mysqli->query("INSERT INTO messagesent (content) VALUES ('$content')");

  if ($result) {
      echo json_encode(['success' => true]);
  } else {
      echo json_encode(['success' => false, 'error' => $mysqli->error]);
  }

  $mysqli->close();
 

/*$mysqli = new mysqli("localhost", "root", "", "messages");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$content = $_POST['content'];

// Sanitize the input before storing it in the database
$content = $mysqli->real_escape_string($content);

$result = $mysqli->query("INSERT INTO messagesent (content) VALUES ('$content')");

if ($result) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $mysqli->error]);
}

$mysqli->close();*/
?>


