import { chatsList, chat_message } from "./variables.js";
import { requests } from "./server_requests.js";

class Message{
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
        requests.server_request(object).done(response => {
            if(parseInt(response) == 1)
                console.log("message sent")
            else
                console.log("message not sent")
        })
    }

    user_chat_messages = object => {
        requests.server_request(object).done(response => {
            // alert(response)
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
        })
    }
}

export let message = new Message()