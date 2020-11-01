import { requests } from "./server_requests.js"
import { notifications_count } from "./variables.js";

class Notification {
    _notifications = () => {
        requests.server_request({ load_notifications: true }).done(response => {
            let notifs = JSON.parse(response);
            console.log(notifs)
        });
    }

    check_notifications = () => {
        requests.server_request({ load_notifications: true }).done(response => {
            let notifs = JSON.parse(response);
            if (notifs.length > 0)
                $(notifications_count).text(notifs.length)
            setTimeout(this.check_notifications, 1000)
        })
    }
}

export let notications = new Notification()