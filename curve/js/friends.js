import { requests } from "./server_requests.js";

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
}

export let friend = new Friend();