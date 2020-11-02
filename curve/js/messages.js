class Message{
    sent_message = object => {
        return `<div class="sent_chat">
                    <div>
                        ${object}
                    </div>
                </div>`;
    }

    received_message = object => {
        return `<div class="received_chat">
                    <div>
                        ${object}
                    </div>
                </div>`;
    }
}