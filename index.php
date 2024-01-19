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
    <script>
        function saveMessage() {
        // Get the Delta representation of the content
        var delta = quill.getContents();

        // Extract bold and italic text
        var boldText = [];
        var italicText = [];

        delta.ops.forEach(function(op) {
            if (op.attributes && op.attributes.bold) {
                boldText.push(op.insert);
            }

            if (op.attributes && op.attributes.italic) {
                italicText.push(op.insert);
            }
        });

        // Convert arrays to strings
        boldText = boldText.join('');
        italicText = italicText.join('');

        // Send the extracted text to your PHP script for saving to the database
        // Example using fetch API:
        fetch('save.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'boldText=' + encodeURIComponent(boldText) + '&italicText=' + encodeURIComponent(italicText),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming your PHP script returns JSON
        })
        .then(data => {
            // Handle the response from the server if needed
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    </script>
    <main>
        <div class="main-container">
            <div class="sidebar">
                <h3>Campaign Messages</h3>
                <form action="search.php" method="POST">
                    <div class="search-input">
                        <input type="hidden" id="message-id" value="">
                        <input type="text" id="search" name="search" placeholder="Search Message" required>
                    </div>
                    <div class="search-btn">
                        <button type="submit" class="btn">Search</button>
                    </div>
                </form>
                <div class="messages-list" id="msg-list">
                </div>
            </div>
            <div class="edit">
                <div id="editor"></div>
                <div class="btn-grp">
                    <button class="btn" id="send-button" onclick="saveMessage()">Save</button>
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
