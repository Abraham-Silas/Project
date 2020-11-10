import { requests } from "./server_requests.js"
import { recent_chats } from "./variables.js";

class User{
    login = object => {
        requests.server_request(object).done(response => {
            let logged = JSON.parse(response)
            this.initialize_user(logged)
        })
    }

    initialize_user = logged => {
        sessionStorage.setItem("logged_user", logged.id);
        sessionStorage.setItem("name", logged.name);
        sessionStorage.setItem("surname", logged.surname);
        window.location.href = `${window.location.origin}/IMY220/u15231748/curve/home.php`;
    }

    create_new_account = object => {
        requests.server_request(object).done(response => {
            let logged = JSON.parse(response)
            this.initialize_user(logged)
        })
    }

    follow_user = (object, e) => {
        requests.server_request(object).done(response => {
            if(parseInt(response) == 1)
            {
                $(e.target).attr("class", "list-group-item m-0 unfollowUser")
                $(e.target).html(`<i class="fa fa-user-times mr-1"></i>Unfollow`);
            }
        })
    }

    unfollow_user = (object, e) => {
        requests.server_request(object).done(response => {
            if(parseInt(response) == 1)
            {
                $(e.target).attr("class", "list-group-item m-0 followUser")
                $(e.target).html(`<i class="fa fa-user-plus mr-1"></i>Follow`);
            }
        })
    }

    search_user = object => {
        $(recent_chats).empty()
        requests.server_request(object).done(response => {
            $(recent_chats).append(response)
        })
    }
}

export let user = new User()