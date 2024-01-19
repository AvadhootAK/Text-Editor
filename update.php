<?php
$hostname = "localhost";
$username = "root";
$password = "";
$database = "messages";

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("" . $conn->connect_error);
}

$messageId = $_POST['message_id'];
$editedMessage = $_POST['edited_message'];

$sql = "UPDATE messagesent SET content = '$editedMessage' WHERE id = $messageId";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$conn->close();
?>
