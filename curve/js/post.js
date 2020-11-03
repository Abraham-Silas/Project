import { requests } from "./server_requests.js"
import { posts } from "./variables.js"

class Post{
    react_to_post = (post, e) => {
        requests.server_request(post).done(response => {
            if(response == "1")
                e.target.setAttribute("class", "fas fa-heart reacted")
            else
                e.target.setAttribute("class", "fas fa-heart unreacted")
        })
    }

    load_posts = object => {
        $(posts).empty()
        requests.server_request(object).done(response => {
            $(posts).append(response)
        })
    }
}

export let post = new Post();