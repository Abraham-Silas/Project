import { albums } from './albums.js';
import { profile } from './profile.js';
import { empty } from './empty.js';
import { comment } from './comments.js';
import { post } from './post.js';
import { friend } from './friends.js';
import { _notifications } from './notifications.js';
import { message } from './messages.js';
import { validations } from './validations.js';
import { user } from './user.js';
import {
    albumTitle,
    albumDescription,
    albumTags,
    albumPrivacy,
    checked,
    status,
    createalbum,
    deleteAlbum,
    leaveAlbum,
    viewAlbum,
    albumImages,
    addImages,
    profileHead,
    saveOrEdit,
    closeViewedAlbum,
    closeProfileWindow,
    close_comments,
    comments_window,
    post_comments,
    send_comment,
    comment_text,
    userHiddenInfo,
    month,
    userMenu,
    comment_on_post,
    comment_post_id,
    new_comment,
    comment_replies,
    return_to_comments,
    com_section,
    comment_controls,
    close_notification,
    click,
    notification_list,
    notifications,
    open_notifications,
    friendRequest,
    unfollowFriend,
    hideuser,
    cancelRequest,
    toogleUserMenu, 
    loadInitializers, 
    close_messages_window, 
    messagesWin, 
    send_chat_message, 
    chat_message, 
    open_friend_requests, 
    open_chats, 
    close_requests_win, 
    friend_requests_win, 
    chatsList, 
    frmLogin, 
    submit, 
    log_user, 
    log_pass, 
    change, 
    keyup, preview, dropzone, browse, close_album_upload_win, uploadImages, albumUpload, chooseFiles, addFriendsToAlbum, albumInvite, close_friend_invite, clearImageDelete, deleteAlbumImage, fast, slow
} from './variables.js';

$(() => {
    loadInitializers();
    _notifications.check_notifications();
    _notifications._requests();
    _notifications._chat_messages()
    friend.global_users()
    albums.global_albums()
    profile.setLoggedUserProfile()
    post.load_posts({ local_content: sessionStorage.getItem("logged_user"), post_type: "local" })

    $(frmLogin).on(submit, e => {
        e.preventDefault()

        if(!validations.isEmpty(log_user.value) && !validations.isEmpty(log_pass.value))
        {
            let userLog = {
                username: log_user.value,
                password: log_pass.value,
                login: true
            }

            user.login(userLog);
        }
        else
        {
            if(validations.isEmpty(log_user.value))
                log_user.style.borderColor= "red";

            if(validations.isEmpty(log_pass.value))
                log_pass.style.borderColor= "red";
        }
    })

    $(document).on(click, ".albumsFeed h5", e => {
        let count = $(e.target).parent().children("div").children("div").length;
        albums.toggleView(e, count)
    })

    $(document).on(click, ".scrollTo", e => {
        e.preventDefault();
        comment_post_id.value = $(e.target).data("post");
        comment.view_post_comments({ viewComments: comment_post_id.value })
    })

    $(document).on(click, "nav span:nth-child(3) div #switch_view label", e => {
        if (checked.checked) {
            $(e.target).css({
                "background": "white",
                "left": "0px"
            })
            post.load_posts({ local_content: sessionStorage.getItem("logged_user"), post_type: "local" })
            status.innerHTML = "Local"
        } else {
            $(e.target).css({
                "background": "gold",
                "left": "23px"
            })
            post.load_posts({ local_content: sessionStorage.getItem("logged_user"), post_type: "global" })
            status.innerHTML = "Global"
        }
    })

    $(albumTitle).on(keyup, e => {
        !validations.isEmpty(e.target.value) ? validations.validate_titles(e.target) ? e.target.style.borderColor = "green" : e.target.style.borderColor = "red" : e.target.style.borderColor = "lightgrey";
    })

    $(albumDescription).on(keyup, e => {
        if (!validations.isEmpty(e.target.value))
            if (validations.validate_description(e.target))
                e.target.style.borderColor = "green";
            else
                e.target.style.borderColor = "red";
        else
            e.target.style.borderColor = "lightgrey";
    })

    $(albumTags).on(keyup, e => {
        if (!validations.isEmpty(e.target.value))
            if (validations.validate_hashtag(e.target))
                e.target.style.borderColor = "green";
            else
                e.target.style.borderColor = "red";
        else
            e.target.style.borderColor = "lightgrey";
    })

    $(createalbum).on(submit, e => {
        e.preventDefault()
        if (!validations.isEmpty(albumTitle.value) && !validations.isEmpty(albumDescription.value) && !validations.isEmpty(albumTags.value)) {
            if (validations.validate_titles(albumTitle) && validations.validate_description(albumDescription) && validations.validate_hashtag(albumTags)) {
                if (albumPrivacy.value != "none") {
                    let newAlbum = {
                        title: albumTitle.value,
                        description: albumDescription.value,
                        hashtag: albumTags.value,
                        privacy: albumPrivacy.value,
                        createalbum: sessionStorage.getItem("logged_user")
                    }

                    albums.createAlbum(newAlbum);
                } else
                    alert("Warning: specify album privacy")
            } else {
                validations.validate_titles(albumTitle);
                validations.validate_description(albumDescription);
            }
        } else
            alert("Error: required fields empty");
    })

    deleteAlbum.on(click, e => {
        alert($(e.target).data("album"))
    })

    leaveAlbum.on(click, e => {
        alert($(e.target).data("album"))
    })

    $(document).on(click, viewAlbum, e => {
        sessionStorage.setItem("album", $(e.target).data("album"))
        albums.viewCompleteAlbum(sessionStorage.getItem("album"))
    })

    $(addImages).on(click, () => {
        $(albumImages).click()
    })

    $(profileHead).on(click, e => {
        profile.showProfile($(e.target).data("logged"));
    })

    saveOrEdit.on(click, e => {
        switch ($(e.target).data("state")) {
            case "edit":
                $(e.target).parent().children("label").css("display", "none");
                $(e.target).parent().children("input").css("display", "inline-flex");
                $(e.target).data("state", "save")
                $(e.target).attr("class", "fa fa-save float-right")
                break;
            case "save":
                $(e.target).parent().children("label").css("display", "inline-flex");
                $(e.target).parent().children("input").css("display", "none");
                $(e.target).data("state", "edit")
                $(e.target).attr("class", "fa fa-pen float-right")
                let editObject = {
                    type: $(e.target).data("type"),
                    editDetails: $(e.target).parent().children("input").val(),
                    user: sessionStorage.getItem("logged_user")
                }
                profile.editUserProfile(editObject);
                break;
        }
    })

    $(closeViewedAlbum).on(click, () => {
        $(".viewAlbum").fadeOut(slow);
        $(clearImageDelete).fadeOut(slow)
        $(deleteAlbumImage).fadeIn(slow)
        $(".al-images i").fadeOut(slow)
        sessionStorage.removeItem("album")
    })

    $(closeProfileWindow).on(click, () => {
        $(".userProfileWindow").fadeOut(slow);
    })

    $(document).on(click, ".deleteImages", e => {
        $(".al-images i").css("display", "block");
        $(e.target).css("display", "none");
        $(".clearDelete").css("display", "block")
    })

    $(document).on(click, ".al-images i", e => {
        albums.deleteAlbumImage({delete_album_image: $(e.target).data("image")})
    })

    $(document).on(click, ".clearDelete", e => {
        $(".al-images i").css("display", "none");
        $(e.target).css("display", "none");
        $(".deleteImages").css("display", "block")
    })

    $(close_comments).on(click, () => {
        $(comments_window).fadeOut();
        $(new_comment).fadeIn("fast")
        $(post_comments).css({
            "height": "100vh"
        })
        $(post_comments).empty();
    });

    $(send_comment).on(click, e => {
        if (($(comment_text).val()).length > 0) 
        {
            let now = new Date();
            if ($(e.target).data("type") == "comment")
            {
                let comObject = {
                    user: {
                        id: $(profileHead).data("logged"),
                        name: $(userHiddenInfo).data("user").split(" ")[0],
                        surname: $(userHiddenInfo).data("user").split(" ")[1],
                        profile: $(profileHead).attr('src')
                    },
                    post_id: $(comment_post_id).val(),
                    comment: $(comment_text).val(),
                    date: `${now.getDate()} ${month(now.getMonth())} ${now.getFullYear()}`,
                    time: `${parseInt(now.getHours()) < 10 ? `0${now.getHours()}` : now.getHours()}:${parseInt(now.getMinutes()) < 10 ? `0${now.getMinutes()}` : now.getMinutes()}`
                }

                if (post_comments.querySelector("#no_comments") != null)
                    $(post_comments.querySelector("#no_comments")).remove();
                $(post_comments).append(comment.send_comment(comObject))
                
            }
            else
            {
                let reply = {
                    user: {
                        id: $(profileHead).data("logged"),
                        name: $(userHiddenInfo).data("user").split(" ")[0],
                        surname: $(userHiddenInfo).data("user").split(" ")[1],
                        profile: $(profileHead).attr('src')
                    },
                    rep_id: $(comment_post_id).val(),
                    reply: $(comment_text).val(),
                    date: `${now.getDate()} ${month(now.getMonth())} ${now.getFullYear()}`,
                    time: `${parseInt(now.getHours()) < 10 ? `0${now.getHours()}` : now.getHours()}:${parseInt(now.getMinutes()) < 10 ? `0${now.getMinutes()}` : now.getMinutes()}`
                }

                if(comment_replies.querySelector("#no_replies") != null)
                    $(comment_replies.querySelector("#no_replies")).remove();

                $(comment_replies).append(comment.send_reply(reply))
            } 
            comment_text.value = "";
        }
        else
            alert("Comment cannot be empty...");
    })

    $(document).on(click, ".post_user", e => {
        profile.showProfile($(e.target).data("user"));
    })

    $(document).on(click, ".post_album", e => {
        albums.viewCompleteAlbum($(e.target).data("album"));
    })

    userMenu.on(click, e => {
        profile.showProfile($(e.target).data("user"))
    })

    $(document).on(click, comment_on_post, e => {
        comment_post_id.value = $(e.target).data("post");
        comment.view_post_comments({ viewComments: comment_post_id.value })
    })

    $(new_comment).on(click, e => {
        $(new_comment).fadeOut("fast")
        $(comment_controls).fadeIn("fast")
        $(post_comments).css({
            "height": "73vh"
        })
    });

    $(document).on(click, ".comment_response b:nth-child(1)", e => {
        $(comment_post_id).val($(e.target).data("comment"));
        comment.view_comment_replies({ view_com_rep: comment_post_id.value });
    })

    $(document).on(click, ".comment_response b:nth-child(2)", e => {
        comment.react_to_comment({ react_to_comment: $(e.target).data("comment"), user: sessionStorage.getItem("logged_user") }, e);
    })

    $(document).on(click, ".reply_response b:nth-child(1)", e => {
        comment.react_to_reply({ react_to_reply: $(e.target).data("reply"), user: sessionStorage.getItem("logged_user") }, e);
    })

    $(return_to_comments).on(click, e => {
        $(comment_controls).fadeOut("fast")
        $(com_section).html(`<b class="fas fa-comment mr-1"></b>Comments`)
        $(post_comments).slideDown("slow")
        $(comment_text).attr("placeholder", "Type your comment here...")
        $(e.target).css("display", "none")
        $(send_comment).data("type", "comment")
        $(new_comment).fadeIn("fast")
        $(comment_replies).empty();
        $(comment_replies).css({
            "height": "0vh"
        })
    })

    $(document).on(click, ".comment span a", e => {
        profile.showProfile($(e.target).data("user"));
    })

    $(document).on(click, ".post_reactions i:nth-child(1)", e => {
        post.react_to_post({ react2post: $(e.target).data("post"), user: sessionStorage.getItem("logged_user") }, e);
    })

    $(document).on(click, toogleUserMenu, e => {
        $(".userMenu").fadeOut("fast")
        $(e.target).children(".userMenu").toggle("slow")
    })

    $(document).on(click, friendRequest, e => {
        e.preventDefault()
        let newFriendReq = {
            new_friend_request: $(e.target).data("user"),
            user: sessionStorage.getItem("logged_user")
        }

        friend.friendRequest(newFriendReq, e)
    })

    $(document).on(click, unfollowFriend, e => {
        e.preventDefault()
        let unfollowFriend = {
            unfollow_friend: $(e.target).data("user"),
            user: sessionStorage.getItem("logged_user")
        }

        friend.unfollowFriend(unfollowFriend, e);
    })

    $(document).on(click, cancelRequest, e => {
        e.preventDefault()
        let cancelReq = {
            cancel_friend_request: $(e.target).data("user"),
            user: sessionStorage.getItem("logged_user")
        }

        friend.cancelFriendRequest(cancelReq, e)
    })

    $(hideuser).on(click, e => {
        e.preventDefault()
        $(e.target).parent().parent().parent().parent().fadeOut("slow");
    })

    $(open_notifications).on(click, () => {
        _notifications._notifications()
    })

    $(close_notification).on(click, () => {
        $(notifications).fadeOut("slow")
        $(notification_list).empty();
    })

    $(close_messages_window).on(click, () => {
        $(messagesWin).fadeOut("slow")
        sessionStorage.removeItem("active")
    })

    $(close_requests_win).on(click, () => {
        $(friend_requests_win).fadeOut("slow")
    })

    $(open_friend_requests).on(click, () => {
        friend.openFriendRequests({open_friend_requests: sessionStorage.getItem("logged_user")});
    })

    $(open_chats).on(click, () => {
        friend.showFriendsList()
        let times;
        let reload = () => {
            friend.reloadUsers();
            return times = setTimeout(reload, 1000)
        }

        reload()
    })

    $(document).on(click, ".acceptFriendRequest", e => {
        let accept = {
            accept_friend_request: $(e.target).data("request"),
            user: sessionStorage.getItem("logged_user")
        }

        friend.acceptFriendRequest(accept, e)
    })

    $(document).on(click, ".rejectFriendRequest", e => {
        alert($(e.target).data("request"))
    })

    $(document).on(click, ".acceptAlbumRequest", e => {
        alert($(e.target).data("request"))
    })

    $(document).on(click, ".rejectAlbumRequest", e => {
        alert($(e.target).data("request"))
    })

    $(document).on(click, ".acceptInvitationRequest", e => {
        albums.accept_invitation({
            accept_invitation: $(e.target).data("request")
        })
    })

    $(document).on(click, ".rejectInvitationRequest", e => {
        albums.reject_invitation({
            reject_invitation: $(e.target).data("request")
        })
    })

    $(document).on(click, "#chat_users_list li", e => {
        $(chatsList).empty()
        sessionStorage.setItem("active", $(e.target).data("user"))
        let loadMessages = {
            user: sessionStorage.getItem("logged_user"),
            load_messages: sessionStorage.getItem("active")
        }

        message.user_chat_messages(loadMessages)
        message.await_new_messages();
    })

    $(document).on(click, "#al-list i", e => {
        albums.deleteAlbumImage({delete_album_image: $(e.target).data("image")}, e);
    })

    $(send_chat_message).on(click, () => {
        let new_message = {
            sender: sessionStorage.getItem("logged_user"),
            message: $(chat_message).val(),
            send_message_to: sessionStorage.getItem("active")
        }

        message.send_message(new_message)
    })

    dropzone.addEventListener('drop', e => {
        e.preventDefault()
        e.stopPropagation();
        albums.loadAndUploadImages(e.dataTransfer.files)
    })

    dropzone.addEventListener("dragover", e => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    })

    $(chooseFiles).on("change", e => {
        if(e.target.files.length > 0)
            albums.loadAndUploadImages(e.target.files)
    })

    $(browse).on(click, e => {
        e.preventDefault()
        $(chooseFiles).click()
    })

    $(albumUpload).on(click, () => {
        $(uploadImages).fadeIn("slow")
    })

    $(close_album_upload_win).on(click, () => {
        $(uploadImages).fadeOut("slow")
        $(preview).empty()
        albums.album_images({viewAlbum: sessionStorage.getItem("album")})
    })

    $(addFriendsToAlbum).on(click, () => {
        albums.inviteFriends()
    })

    $(close_friend_invite).on(click, () => {
        $(albumInvite).fadeOut("slow")
    })

    $(document).on(click, ".friendToInvite a", e => {
        e.preventDefault()
        profile.showProfile($(e.target).data("user"));
    })

    $(document).on(click, ".friendToInvite button", e => {
        if(parseInt($(e.target).data("cancel")) == 0)
            albums.send_invitation({
                invitation: $(e.target).data("user"),
                user: sessionStorage.getItem("logged_user"),
                album: sessionStorage.getItem("album")
            }, e)
        else
        {
            albums.cancel_invitation({
                cancel_invitation: $(e.target).data("cancel")
            }, e)
        }
    })
})