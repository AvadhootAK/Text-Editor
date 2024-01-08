<?php
$hostname = "localhost";
$username = "root";
$password = "";
$database = "messages";

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("" . $conn->connect_error);
}

$messageId = $_POST['message-id'];
$editedMessage = $_POST['edited-message'];

$sql = "UPDATE messagesent SET content = '$editedMessage' WHERE id = $messageId";

if ($conn->query($sql) === TRUE) {
    echo "Success";
} else {
    echo "Fail";
}

$conn->close();
?>
