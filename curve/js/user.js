import { requests } from "./server_requests.js"

class User{
    login = object => {
        requests.server_request(object).done(response => {
            sessionStorage.setItem("logged_user", response)
            window.location.href = `${window.location.origin}/IMY220/u15231748/curve/home.php`;
        })
    }
}

export let user = new User()