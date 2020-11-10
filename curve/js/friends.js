import { requests } from "./server_requests.js";
import { chat_users_list, friend_requests_win, messagesWin, recent_chats, requests_list } from "./variables.js";

class Friend {
    friendRequest = (user, e) => {
        requests.server_request(user).done(response => {
            if (parseInt(response) == 1) {
                $(e.target).attr("class", "list-group-item m-0 cancelRequest")
                $(e.target).html(`<i class="fa fa-user-times mr-1"></i>Cancel Request`);
            }
        })
    }

    cancelFriendRequest = (user, e) => {
        requests.server_request(user).done(response => {
            if (parseInt(response) == 1) {
                $(e.target).attr("class", "list-group-item m-0 friendRequest")
                $(e.target).html(`<i class="fa fa-user-plus mr-1"></i>Send Request`)
            }
        })
    }

    unfollowFriend = (user, e) => {
        requests.server_request(user).done(response => {
            if (parseInt(response) == 1) {
                $(e.target).attr("class", "list-group-item m-0 friendRequest")
                $(e.target).html(`<i class="fa fa-user-plus mr-1"></i>Send Request`);
            }
        })
    }

    viewFriendRequest = object => {
        let img = $("<img/>", {
            src: object.profile,
            class: "rounded-circle mr-2",
            width: "40px",
            height: "40px",
            alt: "User Profile"
        })

        let child1 = $("<span></span>").append(img)

        let child2 = $("<span></span>", {
            html: `<b class="mr-1">${object.user}</b>sent you a friend request`
        })

        let btnReject = $("<button></button>", {
            class: "btn btn-danger btn-sm float-right rejectFriendRequest",
            html: "Reject"
        })

        btnReject.attr("data-request", object.id)

        let btnAccept = $("<button></button>", {
            class: "btn btn-success btn-sm float-right mr-2 acceptFriendRequest",
            html: "Accept"
        })

        btnAccept.attr("data-request", object.id)

        let buttons = [btnReject, btnAccept]

        let child3 = $("<div></div>").append(buttons)

        let bindChildren = [child1, child2, child3]

        let parent = $("<li></li>", {
            class: "list-group-item"
        }).append(bindChildren)

        return parent;
    }

    viewAlbumRequest = object => {
        let type_description;
        let btnAcceptType;
        let btnRejectType;

        if(object.type == "album")
        {
            type_description = `sent you a request to join their album <a href="#" data-album="${object.album_id}">${object.album}</a>`
            btnAcceptType = `acceptAlbumRequest`
            btnRejectType = `rejectAlbumRequest`
        }
        else
        {
            type_description = `sent you an invitation to join their album <a href="#" data-album="${object.album_id}">${object.album}</a>`
            btnAcceptType = `acceptInvitationRequest`
            btnRejectType = `rejectInvitationRequest`
        }

        let img = $("<img/>", {
            src: object.profile,
            class: "rounded-circle mr-2",
            width: "40px",
            height: "40px",
            alt: "User Profile"
        })

        let child1 = $("<span></span>").append(img)

        let child2 = $("<span></span>", {
            html: `<b class="mr-1">${object.user}</b>${type_description}`
        })

        let btnReject = $("<button></button>", {
            class: `btn btn-danger btn-sm float-right ${btnRejectType}`,
            html: "Reject"
        })

        btnReject.attr("data-request", object.id)

        let btnAccept = $("<button></button>", {
            class: `btn btn-success btn-sm float-right mr-2 ${btnAcceptType}`,
            html: "Accept"
        })

        btnAccept.attr("data-request", object.id)

        let buttons = [btnReject, btnAccept]

        let child3 = $("<div></div>").append(buttons)

        let bindChildren = [child1, child2, child3]

        let parent = $("<li></li>", {
            class: "list-group-item"
        }).append(bindChildren)

        return parent;
    }

    openFriendRequests = object => {
        requests.server_request(object).done(response => {
            let requests = JSON.parse(response)
            $(requests_list).empty()
            for(let req of requests)
            {
                if(req.type == "friend")
                    $(requests_list).append(this.viewFriendRequest(req))
                else
                    $(requests_list).append(this.viewAlbumRequest(req))
            }
        }).then(() => {
            $(friend_requests_win).fadeIn("slow")
        })
    }

    acceptFriendRequest = (object, e) => {
        requests.server_request(object).done(response => {
            if(parseInt(response) == 1){
                $(e.target).parent().parent().fadeOut("slow");
            }
        })
    }

    friendView = object => {
        let profile = $("<img/>", {
            src: object.profile,
            class: "rounded-circle"
        })

        let name = $("<b></b>", {
            html: object.user
        })

        let hasMessage = $("<i></i>", {
            class: "fa fa-comment-dots mt-2 float-right"
        })

        let binding;

        if(object.sent)
            binding = [profile, name, hasMessage]
        else
            binding = [profile, name]

        let parent = $("<li></li>", {
            class: "list-group-item list-group-item-action"
        }).append(binding)

        parent.attr("data-user", object.user_id)

        return parent;
    }

    showFriendsList = () => {
        this.reloadUsers().then(() => {
            $(messagesWin).fadeIn("slow");
        })
    }

    reloadUsers = () => {
        return requests.server_request({open_chats_win: sessionStorage.getItem("logged_user")}).done(response => {
                $(chat_users_list).empty()
                let friends = JSON.parse(response)
                
                friends.sort((a, b) => {
                    return b.sent - a.sent;
                })

                if(friends.length > 0)
                {
                    for(let friend of friends)
                        $(chat_users_list).append(this.friendView(friend));
                }
                else
                    $(chat_users_list).append(`<button class="btn btn-primary text-center">Start Chat</button>`);
            })
    }

    global_users = () => {
        $(recent_chats).empty()
        requests.server_request({global_users: sessionStorage.getItem("logged_user")}).done(response => {
            $(recent_chats).append(response)
        })
    }
}

export let friend = new Friend();