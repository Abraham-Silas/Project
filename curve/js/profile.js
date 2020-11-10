import { requests } from './server_requests.js';
import { upload_images } from './upload.js';
import { changeProfilePic, currentUserPosts, fast, profileHead, profileImage, userEditDetails } from './variables.js';

class Profile{
    showProfile = user => {
        requests.server_request({viewUserProfile: user, user: sessionStorage.getItem("logged_user")}).done(response => {
            let users = JSON.parse(response)[0];
                $(profileImage).attr("style", `background-image: url(${users.profile})`);
                $("#profileUsernames").text(`${users.name} ${users.surname}`);
                $("#editName").val(users.name)
                $("#editSurname").val(users.surname)
                $("#profileEmail").text(users.email);
                $("#editEmail").val(users.email)
                $("#profileBirthday").text(users.birthday);
                $("#editBDay").val(users.birthday)
             
                sessionStorage.setItem("userType", users.type)
                sessionStorage.setItem("viewedProfile", users.user);
                switch(parseInt(users.type))
                {
                    case 0:
                        $(userEditDetails).fadeIn();
                        this.view_user_posts({loadUserPosts: user})
                        $(".userEditDetails h5").fadeIn(fast)
                        $(changeProfilePic).fadeIn(fast)
                        break;
                    case 1:
                        $(userEditDetails).fadeOut(fast);
                        this.view_user_posts({loadUserPosts: user})
                        $(".userEditDetails h5").fadeIn(fast)
                        $(changeProfilePic).fadeOut(fast)
                        break;
                    case 2:
                        $(userEditDetails).fadeOut("fast");
                        this.view_user_posts({loadUserPosts: user})
                        $(".userEditDetails h5").fadeOut(fast)
                        $(changeProfilePic).fadeOut(fast)
                        break;
                    case 3:
                        $(userEditDetails).fadeOut(fast);
                        $(".userEditDetails h5").fadeOut(fast)
                        $(changeProfilePic).fadeOut(fast)
                        break;
                }

        }).then(() => {
            $(".userProfileWindow").fadeIn("slow");
        })
    }

    view_user_posts = object => {
        $(currentUserPosts).empty();
        return requests.server_request(object).done(response => {
            $(currentUserPosts).append(response);
        });
    }

    view_user_friends = object => {
        return requests.server_request(object).done(response => {
            $(currentUserPosts).append(response);
        });
    }

    view_user_followers = object => {
        return requests.server_request(object).done(response => {
            $(currentUserPosts).append(response);
        });
    }
    
    editUserProfile = data => {
        requests.server_request(data).done(response => {
            switch(data.type)
            {
                case "email":
                    $("#profileEmail").text(data.editDetails);
                    break;
                case "bday":
                    $("#profileBirthday").text(data.editDetails);
                    break;
                case "names":
                    $("#profileUsernames").text(`${data.editDetails.name} ${data.editDetails.surname}`);
                    break;
            }
        });
    }

    setLoggedUserProfile = () => {
        requests.server_request({logged_user: sessionStorage.getItem("logged_user")}).done(response => {
            let user = JSON.parse(response);
            $(profileHead).attr("src", user.profile);
            $(profileHead).attr("data-logged", user.logged);
        })
    }

    change_user_profile = files => {
        let reader = new FileReader();
        reader.onload = e => {
            let splitVal = e.target.result.split(",")[0];
            let img = e.target.result;

            let new_profile = {
                change_profile: sessionStorage.getItem("logged_user"),
                profile: img.replace(`${splitVal},`, "")
            }

            if(upload_images(new_profile))
            {
                $(profileImage).attr("style", `background-image: url(${e.target.result});`)
            }
        }
        reader.readAsDataURL(files[0])
    }

    view_user_albums = object => {
        $(currentUserPosts).empty()
        requests.server_request(object).done(response => {
            $(currentUserPosts).append(response)
        })
    }

    view_user_friends = object => {
        $(currentUserPosts).empty()
        requests.server_request(object).done(response => {
            let friends = JSON.parse(response)
            if(friends.length> 0)
            {
                for(let friend of friends)
                {
                    let img = $("<img/>", {
                        src: friend.profile,
                        width: 50,
                        height: 50,
                        class: "rounded-circle"
                    })

                    let names = $("<b></b>", {
                        html: friend.names,
                        class: "ml-1"
                    })

                    let parent = $("<li></li>", {
                        class: "list-group-item"
                    }).append([img, names])

                    $(currentUserPosts).append(parent.hide().fadeIn("slow"))
                }
            }
            else
                $(currentUserPosts).append(`<h3 class="text-center pt-5">You have no friends</h3>`) 
        })
    }

    view_user_followers = object => {
        $(currentUserPosts).empty()
        requests.server_request(object).done(response => {
            let followers = JSON.parse(response)
            if(followers.length > 0)
            {
                for(let friend of followers)
                {
                    let img = $("<img/>", {
                        src: friend.profile,
                        width: 50,
                        height: 50,
                        class: "rounded-circle"
                    })

                    let names = $("<b></b>", {
                        html: friend.names,
                        class: "ml-1"
                    })

                    let parent = $("<li></li>", {
                        class: "list-group-item"
                    }).append([img, names])

                    $(currentUserPosts).append(parent.hide().fadeIn("slow"))
                }
            }
            else
                $(currentUserPosts).append(`<h3 class="text-center pt-5">You have no followers</h3>`) 
        })
    }

    view_user_followings = object => {
        $(currentUserPosts).empty()
        requests.server_request(object).done(response => {
            let followings = JSON.parse(response)
            if(followings.length > 0)
            {
                for(let friend of followings)
                {
                    let img = $("<img/>", {
                        src: friend.profile,
                        width: 50,
                        height: 50,
                        class: "rounded-circle"
                    })

                    let names = $("<b></b>", {
                        html: friend.names,
                        class: "ml-1"
                    })

                    let parent = $("<li></li>", {
                        class: "list-group-item"
                    }).append([img, names])

                    $(currentUserPosts).append(parent.hide().fadeIn("slow"))
                }
            }
            else
                $(currentUserPosts).append(`<h3 class="text-center pt-5">You have no followings</h3>`)
        })
    }
}

export let profile = new Profile();