<?php
$hostname = "localhost";
$username = "root";
$password = "";
$database = "messages";

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("" . $conn->connect_error);
}

$searchText = $_POST['search'];

$sql = "SELECT * FROM messagesent WHERE content LIKE '%$searchText%'";
$result = $conn->query($sql);

if ($result === false) {
    echo "Error executing the query: " . $conn->error;
} else {
    $rows = $result->fetch_all(MYSQLI_ASSOC);

    foreach ($rows as $row) {
        echo '<div class="campaign-message" data-message-id="' . $row['id'] . '">' . $row['content'] . '</div>';
    }
}

$conn->close();
?>
