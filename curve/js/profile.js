import { 
    requests 
} from './server_requests.js';

import{
    router
} from './variables.js'

export let showProfile = user => {
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

export let editUserProfile = data => {
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