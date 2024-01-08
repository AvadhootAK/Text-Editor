const saveButton = document.getElementById('send-button');
const emojiContainer = document.getElementById('emojiContainer');
const displayArea = document.getElementById('display-area');
const boldBtn = document.getElementById('btnBold');
const italicBtn = document.getElementById('btnItalic');
const searchBtn = document.getElementById('search')

const quill = new Quill('#editor', {
    theme: 'snow',
});

const messageInput = quill.getText();

const emojis = ['😊', '😍', '🥳', '🎉', '👍', '🙌', '🚩'];

emojis.forEach(emoji => {
    const emojiButton = document.createElement('button');
    emojiButton.innerHTML = emoji;
    emojiButton.addEventListener('click', () => loadEmoji(emoji));
    emojiButton.classList.add('btn');
    emojiContainer.appendChild(emojiButton);
});

function bold() {
    messageInput.classList.toggle('bold')
}

function italic() {
    messageInput.classList.toggle('italic')
}

// messageInput.addEventListener('input', handleInput);

saveButton.addEventListener('click', sendMessage());

function loadEmoji(emoji) {
    var cursorPosition = quill.getSelection(true).index;
    quill.insertText(cursorPosition, emoji);
    quill.focus();
}

function getEditorContent() {
    var content = quill.root.innerHTML;
    console.log(content);
}

function copyFormattedText(choice) {
    var content = quill.getText()
    switch (choice) {
        case 'whatsapp':
            var formattedText = formatText(content, 'whatsapp');
            break;

        case 'telegram':
            var formattedText = formatText(content, 'telegram');
            break;
    }
    copyToClipboard(formattedText);
}

function formatText(text, app) {
    var delta = quill.getContents();

    switch (app) {
        case 'whatsapp':
            var formattedText = delta.ops.reduce(function (result, op, index, ops) {
                var insert = op.insert;
                var nextOp = ops[index + 1];

                if (op.attributes) {
                    if (op.attributes.bold) {
                        insert = '*' + insert + '*';
                        if (nextOp && nextOp.attributes && nextOp.attributes.bold) {
                            insert += ' ';
                        }
                    }
                    if (op.attributes.italic) {
                        insert = '_' + insert + '_';
                        if (nextOp && nextOp.attributes && nextOp.attributes.italic) {
                            insert += ' ';
                        }
                    }
                }
                return result + insert;
            }, '');
            break;

        case 'telegram':
            var formattedText = delta.ops.reduce(function (result, op, index, ops) {
                var insert = op.insert;
                var nextOp = ops[index + 1];
                if (op.attributes) {
                    if (op.attributes.bold) {
                        insert = '**' + insert + '**';
                        if (nextOp && nextOp.attributes && nextOp.attributes.bold) {
                            insert += ' ';
                        }
                    }
                    if (op.attributes.italic) {
                        insert = '__' + insert + '__';
                        if (nextOp && nextOp.attributes && nextOp.attributes.italic) {
                            insert += ' ';
                        }
                    }
                }
                return result + insert;
            }, '');
            break;
    }

    return formattedText;
}



function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log('Text copied to clipboard:', text);
}

document.addEventListener('DOMContentLoaded', function () {
    const campaignMessages = document.querySelectorAll('.campaign-message');
    const messageInput = document.getElementById('message-input');

    campaignMessages.forEach(message => {
        message.addEventListener('click', () => loadMessage(message));
    });
})

function saveToMySQL() {

}

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
            var content = quill.getText();

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "insert.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                }
            };
            xhr.send("content=" + encodeURIComponent(content));
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

/*function sendMessage() {
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
 }*/
