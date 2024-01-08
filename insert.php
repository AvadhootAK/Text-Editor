<?php
$hostname = "localhost";
$username = "root";
$password = "";
$database = "messages";

$conn = new mysqli($hostname, $username, $password, $database);

$message = $_POST['content'];

if ($conn->connect_error) { 
    die("Failed". $conn->connect_error);
}
$sql = "INSERT INTO messagesent (content) VALUES ('$message')";

if($conn->query($sql) === TRUE) {
    echo "Success";
} else {
    echo "Fail";
}

$conn->close();
?>