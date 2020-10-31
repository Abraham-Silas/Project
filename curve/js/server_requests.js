import { router } from "./variables.js";

class Requests{
    server_request = data => {
        return ($.ajax({
            url: router,
            method: 'POST',
            data: data
        }))
    }

    server_upload_request = data => {
        $.ajax({
            url: router,
            method: 'POST',
            data: data,
            processData: false,
            contentType: false
        })
    }
}

export let requests = new Requests();