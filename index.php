<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Emoji Composer</title>
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
            <div class="editing-area">
            <div class="container">
        <div id="message-container">
            <form action="insert.php" method="post">
                <textarea cols="10" rows="10" id="message-input" name="message-input" placeholder="Type your message..."></textarea>
                <div class="btn-container">
                    <div>
                        <button id="send-button" class="btn" type="submit">Save</button>
                        
                    </div>
                    <div class="btn-l">

                        <button class="btn" id="btnBold" type="button" onClick="handleInput()"><b>B</b></button>
                        <button class="btn" id="btnItalic" type="button" onClick="italic()"><i>I</i></button>
                        <div id="emojiContainer"></div>
                        <div class="search-results" id="search-results"></div>
                    </div>
                </div>
            </form> 
        </div>

            </div>
        </div>
        <script src="script.js"></script>
    </main>
    
</body>
</html>
