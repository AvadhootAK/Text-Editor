const messageInput = document.getElementById('message-input');
const saveButton = document.getElementById('send-button');
const emojiContainer = document.getElementById('emojiContainer');
const displayArea = document.getElementById('display-area');
const boldBtn = document.getElementById('btnBold');
const italicBtn = document.getElementById('btnItalic');
const searchBtn= document.getElementById('search')

const emojis = ['😊', '😍', '🥳', '🎉', '👍', '🙌','🚩'];

emojis.forEach(emoji => {
    const emojiButton = document.createElement('button');
    emojiButton.innerHTML = emoji;
    emojiButton.addEventListener('click', () => insertEmoji(emoji));
    emojiButton.classList.add('btn');
    emojiContainer.appendChild(emojiButton);
});

function bold() {
    messageInput.classList.toggle('bold')
}

function italic() {
    messageInput.classList.toggle('italic')
}

messageInput.addEventListener('input', handleInput);

function handleInput() {
    const selectionStart = messageInput.selectionStart;
    const selectionEnd = messageInput.selectionEnd;
    const inputValue = messageInput.value;

    const prefix = '*';
    const suffix = '*';

    if (selectionStart !== selectionEnd) {
        const selectedText = inputValue.substring(selectionStart, selectionEnd);
        const formattedText = `${prefix}${selectedText}${suffix}`;
        const newText = inputValue.substring(0, selectionStart) + formattedText + inputValue.substring(selectionEnd);

        messageInput.value = newText;
        messageInput.setSelectionRange(selectionStart + prefix.length, selectionEnd + prefix.length);
    }
}

saveButton.addEventListener('click', sendMessage);

function sendMessage() {
    const editedMessage = messageInput.value;

}

function insertEmoji(emoji) {
    messageInput.value += emoji;
}
document.addEventListener('DOMContentLoaded', function () {
    const campaignMessages = document.querySelectorAll('.campaign-message');
    const messageInput = document.getElementById('message-input');

    campaignMessages.forEach(message => {
        message.addEventListener('click', () => loadMessage(message));    
    });
})


document.addEventListener('DOMContentLoaded', function () {
    const savedMessages = document.querySelectorAll('.saved-message');

    savedMessages.forEach(message => {
        message.addEventListener('click', () => loadMessage(message));
    });

    function loadMessage(messageElement) {
        const messageId = messageElement.dataset.messageId;
        const messageContent = messageElement.innerText;
         
        messageInput.value = messageContent;
        messageInput.dataset.messageId = messageId;
    }
    document.addEventListener('DOMContentLoaded', function () {
        const savedMessages = document.getElementById('msg-list');
        const messageInput = document.getElementById('message-input');
    
        function loadMessages() {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.messages) {
                            displayMessages(response.messages);
                        } else {
                            console.error(response.error);
                        }
                    } else {
                        console.error('Failed to fetch messages');
                    }
                }
            };
            xhr.open('GET', 'getdata.php', true);
            xhr.send();
        }
    
        function displayMessages(messages) {
            savedMessages.innerHTML = ''; // Clear existing messages
            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('saved-message');
                messageElement.dataset.messageId = message.id;
                messageElement.innerText = message.content;
                savedMessages.appendChild(messageElement);
            });
        }
    
        loadMessages(); // Load messages when the page loads
    
        // ... rest of your existing code ...
    });
    
        
    

    function sendMessage() {
        const editedMessage = messageInput.value;
        const messageId = messageInput.dataset.messageId;

        if (messageId) {
            const xhrUpdate = new XMLHttpRequest();
            xhrUpdate.open('POST', 'update.php', true);
            xhrUpdate.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhrUpdate.onreadystatechange = function () {
                if (xhrUpdate.readyState === XMLHttpRequest.DONE) {
                    if (xhrUpdate.status === 200) {
                        console.log('Message updated successfully');
                    } else {
                        console.error('Failed to update message');
                    }
                }
            };
            xhrUpdate.send('message-id=' + encodeURIComponent(messageId) + '&edited-message=' + encodeURIComponent(editedMessage));
        } else {
            
            const xhrInsert = new XMLHttpRequest();
            xhrInsert.open('POST', 'insert.php', true);
            xhrInsert.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhrInsert.onreadystatechange = function () {
                if (xhrInsert.readyState === XMLHttpRequest.DONE) {
                    if (xhrInsert.status === 200) {
                        console.log('Message saved successfully');
                    } else {
                        console.error('Failed to save message');
                    }
                }
            };
            xhrInsert.send('message-input=' + encodeURIComponent(editedMessage));
        }

        
        messageInput.dataset.messageId = '';
        messageInput.value = '';
    }
    const saveButton = document.getElementById('send-button');
    saveButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        sendMessage();
    });
    const emojiButtons = document.querySelectorAll('.btn');
    emojiButtons.forEach(emojiButton => {
        emojiButton.addEventListener('click', function (event) {
            event.preventDefault();
        });
    });
})
function sendMessage() {
    const editedMessage = messageInput.value;
    const messageId = messageInput.dataset.messageId;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Operation successful');
                loadMessages(); // Reload messages after successful operation
            } else {
                console.error('Failed operation');
            }
        }
    };

    if (messageId) {
        xhr.open('POST', 'update.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('message-id=' + encodeURIComponent(messageId) + '&edited-message=' + encodeURIComponent(editedMessage));
    } else {
        xhr.open('POST', 'insert.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('message-input=' + encodeURIComponent(editedMessage));
    }

    messageInput.dataset.messageId = '';
    messageInput.value = '';
}
