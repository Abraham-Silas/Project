import { requests } from "./server_requests.js";

export let upload_images = (object) => {
    return requests.server_request(object).done(response => {
        if(parseInt(response) == 1)
            return true;
        else
            return false;
    })
}