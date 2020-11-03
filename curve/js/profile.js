import { requests } from './server_requests.js';
import { profileHead } from './variables.js';

class Profile{
    showProfile = user => {
        requests.server_request({viewUserProfile: user}).done(response => {
            let users = JSON.parse(response)[0];
                $("#profileImage").attr("style", `background-image: url(${users.profile})`);
                $("#profileUsernames").text(users.names);
                $("#profileEmail").text(users.email);
                $("#profileBirthday").text(users.birthday);
                $(".userProfileWindow").fadeIn("slow");
        }).then(e => {
            $(".currentUserPosts").empty();
            requests.server_request({loadUserPosts: user}).done(response => {
                $(".currentUserPosts").append(response);
            });
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
                    $("#profileUsernames").text(data.editDetails);
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
}

export let profile = new Profile();