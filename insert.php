<?php
$mysqli = new mysqli("localhost", "root", "", "messages");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$boldText = $mysqli->real_escape_string($_POST['boldText']);
$italicText = $mysqli->real_escape_string($_POST['italicText']);
$normalText = $mysqli->real_escape_string($_POST['normalText']);

// Concatenate the texts to restructure the message
$content = "<b>$boldText</b> <i>$italicText</i> $normalText";

$result = $mysqli->query("INSERT INTO messagesent (content) VALUES ('$content')");

if ($result) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $mysqli->error]);
}

$mysqli->close();
?>
