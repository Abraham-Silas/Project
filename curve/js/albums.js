import { 
    empty 
} from './empty.js';

import { 
    requests 
} from './server_requests.js';

import{
    album_id,
    album_list
} from './variables.js'

export function createAlbum(album)
{
    requests.server_request(album).done(res => {
        //Open the view albums window
        $("#newAlbum").modal("toggle");
        $(".viewAlbum").fadeIn("slow")
    }).error(err => {
        alert(err)
    });
}

export function toggleView(object, count)
{
    let height = 0;
    switch($(object.target).data("status"))
    {
        case "closed":
            $(object.target).data("status", "open")
            if(count > 0 && count < 4)
                height = 102;
            else if(count > 3 && count < 7)
                height = 205;
            else
                height = 304;
            $($(object.target).parent().children("div")).css("height", `${height}px`);
            break;

        case "open":
            $(object.target).data("status", "closed")
            $($(object.target).parent().children("div")).css("height", "0");
            break;
    }
}

export let viewCompleteAlbum = album => {
    $(album_id).attr("value", album);
    $(album_list).empty();
    requests.server_request({viewAlbum: album}).done(response => {
            let data = JSON.parse(response);
            if(data.length > 0)
            {
                $.each(data, (index, value) => {
                    let img = $("<img/>", {
                        src: value.img,
                        class: "mr-1"
                    }).data("names", value.names)

                    let deleteControl = $("<i></i>", {
                        class: "fa fa-times"
                    })

                    let elements = [img, deleteControl]

                    $(album_list).append($("<span></span>", {}).append(elements));
                })
            }
            else
                $(album_list).append(empty.album_list());

            $(".viewAlbum").fadeIn();
    }).fail(err => {
        console.log(err);
    });  
}

export let uploadImages2Album = frm => {
    requests.server_upload_request(frm).done(response => {
        console.log(response)
    }).error(err => {
        console.log(err);
    })
}