<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Emoji Composer</title>
    
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">


    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

</head>
<body>
    <header class="heading">
        <h3>Message Editor</h3>
    </header>
    <hr>
    <main>
        <div class="main-container">
            <div class="sidebar">
                <h3>Campaign Messages</h3>
                <form action="search.php" method="POST">
                    <label for="search">Search:</label>
                    <input type="text" id="search" name="search" required>
                    <button type="submit" class="btn">Search</button>
                </form>
                <div class="messages" id="msg-list">
                     <?php include_once("getdata.php"); ?>
                </div>
            </div>
            <div class="edit">
                <div id="editor"></div>
                <div class="btn-grp">
                    <button class="btn" id="send-button" onclick="sendMessage()">Save</button>
                    <button class="btn" onclick="copyFormattedText('whatsapp')">Copy for Whatsapp</button>
                    <button class="btn" onclick="copyFormattedText('telegram')">Copy for Telegram</button>
                </div>
                <div id="emojiContainer"></div>
            </div>
        </div>
        <script src="script.js"></script>
    </main>
</body>
</html>
