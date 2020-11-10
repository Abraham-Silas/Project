import { empty } from "./empty.js";
import { requests } from "./server_requests.js";
import { comment_controls, comment_replies, comment_text, com_section, month, new_comment, post_comments, return_to_comments, send_comment } from "./variables.js";

class Comments
{
    send_comment = comObject => {
        let send = {
            user: comObject.user.id,
            post: comObject.post_id,
            comment: comObject.comment
        }

        const _comment = new Promise((resolve, reject) => {
            resolve(send)
        })

        _comment.then(data => {
            requests.server_request(data).done(response => {
                if(response)
                {
                    $(new_comment).fadeIn("fast")
                    $(post_comments).css({
                        "height" : "100vh"
                    })
                }
                // alert("Remember to add the link to your comment in the case you want to reply to your own comment!!")
            })
        });

        return this.view_comment(comObject);
    }

    send_reply = repObject => {
        let send = {
            user: repObject.user.id,
            comment_id: repObject.rep_id,
            reply: repObject.reply
        }

        const _reply = new Promise((resolve, reject) => {
            resolve(send)
        })

        _reply.then(data => {
            requests.server_request(data).done(response => {
                // alert("Remember to add the link to your reply in the case you want to react to your own reply!!")
            })
        });

        return this.view_reply(repObject);
    }

    view_reply = repObject => {
        return `<div class="w-100 p-2 comment" data-comment="${repObject.rep_id}">
                    <span>
                        <img src="${repObject.user.profile}" class="rounded-circle">
                        <a href="#" data-user="${repObject.user.id}">${repObject.user.name} ${repObject.user.surname}</a>
                    </span>
                    <span>
                        ${repObject.reply}
                    </span>
                    <div class="mt-2">
                        <span class="float-right reply_response">
                            <b class="ml-2 mt-2" data-reply="${repObject.rep_id}"><span><i class="fa fa-heart mr-1 ${repObject.status}"></i>Love</span></b>
                            <b class="ml-2"><span><i class="fa fa-clock mr-1"></i>${repObject.time}, ${repObject.date}</span></b>
                        </span>
                    </div>
                </div>
                <hr class="m-0">`;
    }

    view_comment = comObject => {
        return `<div class="w-100 p-2 comment" data-comment="${comObject.com_id}">
                    <span>
                        <img src="${comObject.user.profile}" class="rounded-circle">
                        <a href="#" data-user="${comObject.user.id}">${comObject.user.name} ${comObject.user.surname}</a>
                    </span>
                    <span>
                        ${comObject.comment}
                    </span>
                    <div class="mt-2">
                        
                        <span class="float-right comment_response">
                            <b class="ml-2 mt-2 comment_reply" data-comment="${comObject.com_id}"><span><i class="fa fa-reply mr-1"></i>Reply</span></b>
                            <b class="ml-2 mt-2 reply_love" data-comment="${comObject.com_id}"><span><i class="fa fa-heart mr-1 ${comObject.status}"></i>Love</span></b>
                            <b class="ml-2"><span><i class="fa fa-clock mr-1"></i>${comObject.time}, ${comObject.date}</span></b>
                        </span>
                    </div>
                </div>
                <hr class="m-0">`;
    }

    mini_replies_view = () => {
        return `<b class="comment_recent_replies">
                    <img src="./images/display/img6.jpg" class="rounded-circle">
                    <img src="./images/display/img18.jpg" class="rounded-circle">
                    <img src="./images/display/img18.jpg" class="rounded-circle">
                    <span>
                        responded to this
                    </span>
                </b>`;
    }

    view_post_comments = post => {
        $(post_comments).empty()
        requests.server_request(post).done(response => {
            let comments = JSON.parse(response);
            if(comments.length > 0)
            {
                for(let item of comments)
                {
                    let now = new Date(item._date);
                    let comment = {
                        user: {
                            id: item._uid,
                            name: item._name,
                            surname: item._surname,
                            profile: item._profile
                        },
                        post_id: item._pid,
                        com_id: item._id,
                        comment: item._comment,
                        status: item._status,
                        date: `${now.getDate()} ${month(now.getMonth())} ${now.getFullYear()}`,
                        time: `${parseInt(now.getHours()) < 10 ? `0${now.getHours()}` : now.getHours()}:${parseInt(now.getMinutes()) < 10 ? `0${now.getMinutes()}` : now.getMinutes()}`
                    }
                    $(post_comments).append(this.view_comment(comment));
                }
            }
            else
                $(post_comments).append(empty.comments())
        }).then(() => {
            $(comments_window).fadeIn("slow")
        })
    }

    view_comment_replies = comment => {
        $(comment_replies).empty()
        requests.server_request(comment).done(response => {
            let replies = JSON.parse(response);
            if(replies.length > 0)
            {
                for(let item of replies)
                {
                    let now = new Date(item._date);
                    let reply = {
                        user: {
                            id: item._uid,
                            name: item._name,
                            surname: item._surname,
                            profile: item._profile
                        },
                        rep_id: item._id,
                        reply: item._reply,
                        status: item._status,
                        date: `${now.getDate()} ${month(now.getMonth())} ${now.getFullYear()}`,
                        time: `${parseInt(now.getHours()) < 10 ? `0${now.getHours()}` : now.getHours()}:${parseInt(now.getMinutes()) < 10 ? `0${now.getMinutes()}` : now.getMinutes()}`
                    }
                    $(comment_replies).append(this.view_reply(reply));
                }
            }
            else
                $(comment_replies).append(empty.replies())

        }).then(() => {
            $(comment_controls).fadeIn("fast")
            $(new_comment).fadeOut("fast")
            $(post_comments).slideUp("slow")
            $(com_section).text("Replies")
            $(comment_text).attr("placeholder", "Type your reply here...")
            $(return_to_comments).fadeIn()
            $(send_comment).data("type", "reply")
            $(comment_replies).css({
                "height":"73vh",
                "display":"block"
            })
        });
    }

    reaction_state = (response, e) => {
        if(response == "1")
            $(e.target).children("span").children("i").attr("class", "fa fa-heart mr-1 reacted")
        else
            $(e.target).children("span").children("i").attr("class", "fa fa-heart mr-1 unreacted")
    }

    react_to_comment = (com, e) => {
        requests.server_request(com).done(response => {
            this.reaction_state(response, e)
        })
    }

    react_to_reply = (rep, e) => {
        requests.server_request(rep).done(response => {
            this.reaction_state(response, e)
        })
    }
}

export let comment = new Comments();