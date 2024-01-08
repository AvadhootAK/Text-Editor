<?php
$hostname = "localhost";
$username = "root";
$password = "";
$database = "messages";

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("" . $conn->connect_error);
}

$select = "SELECT * FROM messagesent";

$result = $conn->query($select);

/*if ($result === false) {
    echo json_encode(['error' => 'Error executing the query: ' . $conn->error]);
} else {
    $rows = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode(['messages' => $rows]);
}*/

$rows = $result->fetch_all(MYSQLI_ASSOC);

foreach ($rows as $row) {
    echo '<div class="saved-message" data-message-id="' . $row['id'] . '">' . $row['content'] . "</div>";
}

$conn->close();
?>