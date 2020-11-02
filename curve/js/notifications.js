import { requests } from "./server_requests.js"
import { notifications, notifications_count, notification_list } from "./variables.js";

class Notification {
    _notifications = () => {
        requests.server_request({ load_notifications: true }).done(response => {
            let notifs = JSON.parse(response);

            notifs.sort((a, b) => {
                return new Date(b["datetime"]) - new Date(a["datetime"]);
            })

            $(notification_list).empty();
            for (let n of notifs) {
                let reason = "";
                let img = $("<img/>", {
                    class: "rounded-circle mr-2",
                    width: "30px",
                    height: "30px",
                    src: n.profile
                })

                switch (n.type) {
                    case "post_react":
                        reason = "reacted on your post";
                        break;
                    case "comment":
                        reason = "commented on your post";
                        break;
                    case "comment_react":
                        reason = "reacted on your comment";
                        break;
                    case "reply":
                        reason = "replied to your comment"
                        break;
                }

                let content = $("<span></span>", {
                    html: `<b class="mr-1">${n.user}</b>${reason}<span class="float-right">${n.datetime}</span>`
                })

                let merge = [img, content]

                let final = $("<li></li>", {
                    class: "list-group-item list-group-item-action"
                }).append(merge)

                $(notification_list).append(final)
            }
        }).then(() => {
            $(notifications).fadeIn("slow")
        })
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