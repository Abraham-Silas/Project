import { requests } from "./server_requests.js"

class Post{
    react_to_post = (post, e) => {
        requests.server_request(post).done(response => {
            if(response == "1")
                e.target.setAttribute("class", "fas fa-heart reacted")
            else
            e.target.setAttribute("class", "fas fa-heart unreacted")
        })
    }
}

export let post = new Post();