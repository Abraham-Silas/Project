import { requests } from "./server_requests.js"
import { posts, post_images_win, preview_container, reason_for_report, report_win, selected_post_image_preview } from "./variables.js"

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

    load_post_images = object => {
        requests.server_request(object).done(response => {
            let images = JSON.parse(response)
            let size = images.length;
            $(preview_container).empty()
            
            for(let i = 0; i < size; i++)
            {
                if(i == 0)
                    $(selected_post_image_preview).attr("src", images[i].image)
                else
                {
                    let img = $("<img/>", {
                        src: images[i].image
                    })
                    $(preview_container).append(img)
                }
            }
        }).then(() => {
            $(post_images_win).fadeIn("slow")
        })
    }

    delete_post = object => {
        requests.server_request(object).done(response => {
            if(parseInt(response) == 1)
                window.location.reload(true);
        })
    }

    search_post = object => {
        $(posts).empty()
        requests.server_request(object).done(response => {
            $(posts).append(response)
        })
    }

    report_reasons = () => {
        requests.server_request({get_report_reasons: true}).done(response => {
            let reasons = JSON.parse(response)
            $(reason_for_report).empty()
            for(let reason of reasons)
            {
                let li = $("<li></li>", {
                    class: "list-group-item list-group-item-action",
                    html: reason.reason
                }).data("reason", reason.id)

                $(reason_for_report).append(li)
            }
        }).then(() => {
            $(report_win).fadeIn();
        })
    }

    report_post = object => {
        requests.server_request(object).done(response => {
            if(parseInt(response) == 1)
                sessionStorage.removeItem("report_post")
            
            $(report_win).fadeOut();
        })
    }
}

export let post = new Post();