import { empty } from './empty.js';
import { friend } from './friends.js';
import { requests } from './server_requests.js';
import { upload_images } from './upload.js';
import{
    addFriendsToAlbum,
    albumFriendsList,
    albumHeader,
    albumInvite,
    album_feed,
    album_id,
    album_list,
    album_privacy,
    deleteAlbumImage,
    newAlbum,
    preview
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
        requests.server_request({viewAlbumInfo: album}).done(response => {
            let info = JSON.parse(response);
            if(parseInt(info.admin) != parseInt(sessionStorage.getItem("logged_user")))
            {
                $(addFriendsToAlbum).css("display", "none")
                $(deleteAlbumImage).css("display", "none")
            }
            else
            {
                $(addFriendsToAlbum).css("display", "block")
                $(deleteAlbumImage).css("display", "block")
            }

            $(albumHeader).text(info.album_name)

            if(info.status == "private")
            {
                $(album_privacy).children("i").attr("class", "fa fa-lock mr-1")
                let first = info.status.charAt(0)
                $(album_privacy).children("label").text(info.status.replace(first, first.toUpperCase()))
            }
            else
            {
                $(album_privacy).children("i").attr("class", "fa fa-unlock mr-1")
                let first = info.status.charAt(0)
                $(album_privacy).children("label").text(info.status.replace(first, first.toUpperCase()))
            }

        }).then(() => {
            this.album_images({viewAlbum: album})
        })
    }

    album_images = object => {
        $(album_list).empty();
        requests.server_request(object).done(response => {
            let albums = JSON.parse(response);
            if(albums.length > 0)
            {
                for(let album of albums)
                {
                    let img = $("<img/>", {
                        src: album.img,
                        class: "mr-1"
                    }).data("names", album.names)

                    let deleteControl = $("<i></i>", {
                        class: "fa fa-times"
                    }).data("image", album.photo)

                    let elements = [img, deleteControl]

                    $(album_list).append($("<span></span>").append(elements));
                }
            }
            else
                $(album_list).append(empty.album_list());

            $(".viewAlbum").fadeIn();
        }).fail(err => {
            console.log(err);
        });
    }

    global_albums = () => {
        requests.server_request({global_album: true}).done(response => {
            $(album_feed).append(response)
        })
    }

    deleteAlbumImage = (object, e) => {
        requests.server_request(object).done(response => {
            if(parseInt(response) == 1)
                $(e.target).parent().fadeOut("slow");
        })
    }

    uplading_images = (name, data, uploaded) => {
        let img = $("<img/>", {
            src: data,
            width: 70,
            height: 70
        })

        let child1 = $("<span></span>", {
            class: "w-25"
        }).append(img)

        let imgName = $("<b></b>", {
            html: name,
            class: "imgName"
        })

        let status = $("<div></div>",{
            html: uploaded ? `<b class="fa fa-check-circle uploaded"></b>uploaded` : `<b class="fa fa-times-circle notUploaded"></b>failed`
        })

        let child2 = $("<span></span>", {
            class: "w-75 pl-2"
        }).append([imgName, status])

        return $("<li></li>", {
            class: "list-group-item mb-1"
        }).append([child1, child2])
    }

    loadAndUploadImages = files => {
        let approved = ["image/jpg", "image/jpeg", "image/png", "image/bmp", "image/gif"]
        $(preview).empty()
        for(let file of files)
        {
            let reader = new FileReader()
            if(approved.includes(file.type))
            {
                reader.onprogress = ev => {
                    let progress = parseInt((ev.loaded/ev.total)*100);
                    if(progress == 100)
                    {
                        reader.onload = ev => {
                            let new_photo = {
                                upload_shared_photos: ev.target.result.replace(`${ev.target.result.split(",")[0]},`, ''),
                                user: sessionStorage.getItem("logged_user"),
                                album: sessionStorage.getItem("album")
                            }

                            $(preview).append(this.uplading_images(file.name, ev.target.result, upload_images(new_photo)))
                        }
                    }
                }
                reader.readAsDataURL(file);
            }
            else
            {
                reader.onload = ev => {
                    $(preview).append(this.uplading_images(file.name, ev.target.result, false))
                }
                reader.readAsDataURL(file);
            }
        }
    }

    viewFriendToInvite = object => {
        let profile = $("<img/>", {
            src: object.profile,
            width: 55,
            height: 55,
            class: "rounded-circle"
        })

        let child1 = $("<span></span>", {
            class: "d-block text-center"
        }).append(profile)

        let names = $("<a></a>", {
            href: "",
            html: object.names
        }).data("user", object.user)

        let child2 = $("<span></span>", {
            class: "d-block text-center"
        }).append(names)

        let btnInvite = null;

        if(object.status > 0)
        {
            btnInvite = $("<button></button>", {
                class: "btn btn-warning btn-sm form-control",
                html: "Cancel"
            }).data("user", object.user).data("cancel", object.status)
        }
        else
        {
            btnInvite = $("<button></button>", {
                class: "btn btn-dark btn-sm form-control",
                html: "Invite"
            }).data("user", object.user).data("cancel", object.status)
        }

        let child3 = $("<span></span>", {
            class: "d-block"
        }).append(btnInvite)

        let parent = $("<div></div>", {
            class: "col friendToInvite"
        }).append([child1, child2, child3])

        return parent;
    }

    inviteFriends = () => {
        let invite = {
            invite_friends: sessionStorage.getItem("album"),
            user: sessionStorage.getItem("logged_user")
        }

        $(albumFriendsList).empty();

        requests.server_request(invite).done(response => {
            let friends = JSON.parse(response);
            if(friends.length > 0)
            {
                for(let friend of friends)
                    $(albumFriendsList).append(this.viewFriendToInvite(friend))
            }
            else
                $(albumFriendsList).append(`<h3 class="text-center">You have no friends to add!</h3>`);
        }).then(() => {
            $(albumInvite).fadeIn("slow")
        })
    }

    send_invitation = (object, e) => {
        requests.server_request(object).done(response => {
            if(parseInt(response) > 0){
                $(e.target).text("Cancel").data("cancel", parseInt(response)).attr("class", "btn btn-warning btn-sm form-control")
            }
        })
    }

    cancel_invitation = (object, e) => {
        requests.server_request(object).done(response => {
            if(parseInt(response) > 0){
                $(e.target).text("Invite").data("cancel", 0).attr("class", "btn btn-dark btn-sm form-control")
            }
        })
    }

    accept_invitation = object => {
        requests.server_request(object).done(response => {
            if(parseInt(response) > 0){
                friend.openFriendRequests({open_friend_requests: sessionStorage.getItem("logged_user")});
            }
        })
    }

    reject_invitation = object => {
        requests.server_request(object).done(response => {
            if(parseInt(response) > 0){
                friend.openFriendRequests({open_friend_requests: sessionStorage.getItem("logged_user")});
            }
        })
    }
}

export let albums = new Albums()