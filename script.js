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

saveButton.addEventListener('click', (event) => {
    event.preventDefault();
});

const emojiButtons = document.querySelectorAll('.btn');
emojiButtons.forEach(emojiButton => {
    emojiButton.addEventListener('click', function (event) {
        event.preventDefault();
    });
});

function saveMessage() {
    const messageId = document.getElementById('message-id').value;
    if (messageId) {
        updateMessage();
    } else {
        var content = quill.getText();

        fetch('insert.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: content }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    updateSidebar();
                } else {
                    console.error('Error saving message:', data.error);
                }
            })
            .catch(error => console.error('Error saving message:', error));
    }
}

//  function saveMessage() {
//     const messageId = document.getElementById('message-id').value;
//     if (messageId) {
//         updateMessage();
//     } else {
//         var content = quill.getText();

//         fetch('insert.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: 'content=' + encodeURIComponent(content),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.success) {
//                     updateSidebar();
//                 } else {
//                     console.error('Error saving message:', data.error);
//                 }
//             })
//             .catch(error => console.error('Error saving message:', error));
//     }
// }


function updateMessage() {
    const messageId = document.getElementById('message-id').value;
    const editedMessage = quill.getText();

    fetch('update.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `message_id=${messageId}&edited_message=${encodeURIComponent(editedMessage)}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Message updated successfully!');
                updateSidebar();
            } else {
                console.error('Error updating message:', data.error);
            }
        })
        .catch(error => console.error('Error updating message:', error));
}


function updateSidebar() {
    fetch('getdata.php')
        .then(response => response.json())
        .then(data => {
            var messageList = document.getElementById('msg-list');
            messageList.innerHTML = '';

            data.messages.forEach(message => {
                var listItem = document.createElement('a');
                listItem.classList.add('messages');
                listItem.textContent = message.content;
                listItem.dataset.id = message.id;
                listItem.addEventListener('click', function () {
                    loadMessage(message.id);
                });
                messageList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching messages:', error));
}

function loadMessage(messageId) {
    fetch('getMsg.php?id=' + messageId)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                document.getElementById('message-id').value = data.message.id;
                quill.root.innerHTML = data.message.content;
            } else {
                console.error('Message not found:', data.message);
            }
        })
        .catch(error => console.error('Error fetching message:', error));
}

updateSidebar();
