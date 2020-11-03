import { chatsList, chat_message, newMSG } from "./variables.js";
import { requests } from "./server_requests.js";

class Message{
    tr_new_messages = null;

    sent_message = object => {
        return `<div class="sent_chat">
                    <div>
                        ${object.message}
                    </div>
                </div>`;
    }

    received_message = object => {
        return `<div class="received_chat">
                    <div>
                        ${object.message}
                    </div>
                </div>`;
    }

    send_message = object => {
        $(chatsList).append(this.sent_message(object))
        $(chat_message).val("");
        chatsList.scrollTop = chatsList.scrollHeight;
        requests.server_request(object).done(response => {
            if(parseInt(response) == 1)
                console.log("message sent")
            else
                console.log("message not sent")
        })
    }

    user_chat_messages = object => {
        requests.server_request(object).done(response => {
            let messages = JSON.parse(response)

            messages.sort((a, b) => {
                return new Date(a.msg_date) - new Date(b.msg_date);
            })

            for(let message of messages){
                if(message.type == "s")
                    $(chatsList).append(this.sent_message(message))
                else
                    $(chatsList).append(this.received_message(message))
            }
        }).then(() => {
            chatsList.scrollTop = chatsList.scrollHeight
        })
    }

    await_new_messages = () => {
        requests.server_request({
            user: sessionStorage.getItem("logged_user"),
            messages_from: sessionStorage.getItem("active")
        }).done(response => {
            let messages = JSON.parse(response);
            if(messages.length > 0)
            {
                newMSG.play()
                for(let message of messages)
                {                    
                    let currectHeight = $(chatsList).scrollTop() + $(chatsList).innerHeight()
                    
                    if(parseInt(currectHeight) == chatsList.scrollHeight)
                    {
                        $(chatsList).append(this.received_message(message))
                        chatsList.scrollTop = chatsList.scrollHeight
                    }
                    else
                        $(chatsList).append(this.received_message(message))
                }
            }
        })

        if(this.tr_new_messages != null && (sessionStorage.getItem("active") == null || sessionStorage.getItem("active") == undefined))
            clearTimeout(this.tr_new_messages);

        this.tr_new_messages = setTimeout(this.await_new_messages, 1000)
    }
}

export let message = new Message()