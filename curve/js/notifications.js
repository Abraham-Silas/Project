import { requests } from "./server_requests.js"

class Notification{
    _notifications = () => {
        requests
        .server_request({open_notifications: true})
        .done(response => {

        });
    }

    check_notifications = () => {
        requests.server_request({load_notifications: true}).done(response => {
            
        })
    }
}

export let notications = new Notification()