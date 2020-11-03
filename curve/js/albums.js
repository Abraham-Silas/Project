import { empty } from './empty.js';
import { requests } from './server_requests.js';
import{
    album_feed,
    album_id,
    album_list,
    newAlbum
} from './variables.js'

class Albums{
    createAlbum = album => {
        requests.server_request(album).done(res => {
            if(parseInt(res) == 1){
                $(newAlbum).modal("hide");
                $(".viewAlbum").fadeIn("slow")
            }
            else
                alert(res)
        }).error(err => {
            alert(err)
        });
    }

    toggleView = (object, count) => {
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

    viewCompleteAlbum = album => {
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
                        }).data("image", value.photo)

                        let elements = [img, deleteControl]

                        $(album_list).append($("<span></span>").append(elements));
                    })
                }
                else
                    $(album_list).append(empty.album_list());

                $(".viewAlbum").fadeIn();
        }).fail(err => {
            console.log(err);
        });  
    }

    uploadImages2Album = frm => {
        requests.server_upload_request(frm).done(response => {
            console.log(response)
        }).error(err => {
            console.log(err);
        })
    }

    global_albums = () => {
        requests.server_request({global_album: true}).done(response => {
            $(album_feed).append(response)
        })
    }

    deleteAlbumImage = (object, e) => {
        requests.server_request(object).done(response => {
            if(parseInt(response) == 1)
            {
                $(e.target).parent().fadeOut("slow");
            }
        })
    }
}

export let albums = new Albums()