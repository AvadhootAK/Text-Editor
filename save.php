<?php
$hostname = "localhost";
$username = "root";
$password = "";
$database = "messages";

$mysqli = new mysqli("localhost", "root", "", "messages");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$messageContent = $_POST['messageContent'];

// Retrieve the bold and italic text from the POST request
$boldText = $_POST['boldText'];
$italicText = $_POST['italicText'];

// TODO: Save $boldText and $italicText to your database with <b> and <i> tags

// Send a response back to the client (optional)
$response = ['status' => 'success', 'message' => 'Text saved successfully'];
echo json_encode($response);
?>


