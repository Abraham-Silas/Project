import {
    createAlbum,
    toggleView,
    viewCompleteAlbum
} from './albums.js';

import {
    showProfile,
    editUserProfile
} from './profile.js';

import {
    validate_description,
    validate_titles,
    validate_hashtag,
    isEmpty
} from './validations.js';

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
    uploadedImages,
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
    toogleUserMenu, loadInitializers
} from './variables.js';

import {
    empty
} from './empty.js';

import {
    comment
} from './comments.js';

import {
    post
} from './post.js';

import {
    friend
} from './friends.js';

import {
    notications
} from './notifications.js';

$(() => {
    loadInitializers();

    notications.check_notifications();

    $(document).on("click", ".albumsFeed h5", e => {
        let count = $(e.target).parent().children("div").children("div").length;
        toggleView(e, count)
    })

    $(document).on("click", ".scrollTo", e => {
        e.preventDefault();
        comment_post_id.value = $(e.target).data("post");
        comment.view_post_comments({ viewComments: comment_post_id.value })
    })

    $(document).on("click", "nav span:nth-child(3) div #switch_view label", e => {
        if (checked.checked) {
            $(e.target).css({
                "background": "white",
                "left": "0px"
            })

            status.innerHTML = "Local"
        } else {
            $(e.target).css({
                "background": "gold",
                "left": "23px"
            })

            status.innerHTML = "Global"
        }
    })

    $(albumTitle).on("keyup", e => {
        !isEmpty(e.target.value) ? validate_titles(e.target) ? e.target.style.borderColor = "green" : e.target.style.borderColor = "red" : e.target.style.borderColor = "lightgrey";
    })

    $(albumDescription).on("keyup", e => {
        if (!isEmpty(e.target.value))
            if (validate_description(e.target))
                e.target.style.borderColor = "green";
            else
                e.target.style.borderColor = "red";
        else
            e.target.style.borderColor = "lightgrey";
    })

    $(albumTags).on("keyup", e => {
        if (!isEmpty(e.target.value))
            if (validate_hashtag(e.target))
                e.target.style.borderColor = "green";
            else
                e.target.style.borderColor = "red";
        else
            e.target.style.borderColor = "lightgrey";
    })

    $(document).on("submit", createalbum, e => {
        e.preventDefault()
        if (!isEmpty(albumTitle.value) && !isEmpty(albumDescription.value) && !isEmpty(albumTags.value)) {
            if (validate_titles(albumTitle) && validate_description(albumDescription) && validate_hashtag(albumTags)) {
                if (albumPrivacy.value != "none") {
                    let newAlbum = {
                        title: albumTitle.value,
                        description: albumDescription.value,
                        hashtag: albumTags.value,
                        privacy: albumPrivacy.value,
                        createalbum: true
                    }

                    createAlbum(newAlbum);
                } else
                    alert("Warning: specify album privacy")
            } else {
                validate_titles(albumTitle);
                validate_description(albumDescription);
            }
        } else
            alert("Error: required fields empty");
    })

    deleteAlbum.on('click', e => {
        alert($(e.target).data("album"))
    })

    leaveAlbum.on('click', e => {
        alert($(e.target).data("album"))
    })

    viewAlbum.on('click', e => {
        viewCompleteAlbum($(e.target).data("album"))
    })

    $(albumImages).on("change", e => {
        let size = e.target.files.length;
        uploadedImages.empty();
        if (size > 0) {
            for (let i = 0; i < size; i++) {
                let img_src = URL.createObjectURL(e.target.files[i])
                uploadedImages.append($("<img>", {
                    src: img_src
                }))
            }

            $(addImages).fadeIn("slow")
        } else
            uploadedImages.append(empty.album_image_upload())
    })

    $(addImages).on("click", () => {
        $(albumImages).click()
    })

    $(profileHead).on("click", e => {
        showProfile($(e.target).data("logged"));
    })

    saveOrEdit.on("click", e => {
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
                    editDetails: $(e.target).parent().children("input").val()
                }
                editUserProfile(editObject);
                break;
        }
    })

    $(closeViewedAlbum).on("click", () => {
        $(".viewAlbum").fadeOut("slow");
        $(".al-images i").css("display", "none");
    })

    $(closeProfileWindow).on("click", () => {
        $(".userProfileWindow").fadeOut("slow");
    })

    $(document).on("click", ".deleteImages", e => {
        $(".al-images i").css("display", "block");
        $(e.target).css("display", "none");
        $(".clearDelete").css("display", "block")
    })

    $(document).on("click", ".al-images i", e => {
        $(e.target).parent().fadeOut("slow");
    })

    $(document).on("click", ".clearDelete", e => {
        $(".al-images i").css("display", "none");
        $(e.target).css("display", "none");
        $(".deleteImages").css("display", "block")
    })

    $(close_comments).on("click", () => {
        $(comments_window).fadeOut();
        $(new_comment).fadeIn("fast")
        $(post_comments).css({
            "height": "100vh"
        })
        $(post_comments).empty();
    });

    $(send_comment).on("click", e => {
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

    $(document).on("click", ".post_user", e => {
        showProfile($(e.target).data("user"));
    })

    $(document).on("click", ".post_album", e => {
        viewCompleteAlbum($(e.target).data("album"));
    })

    userMenu.on("click", e => {
        showProfile($(e.target).data("user"))
    })

    $(document).on("click", comment_on_post, e => {
        comment_post_id.value = $(e.target).data("post");
        comment.view_post_comments({ viewComments: comment_post_id.value })
    })

    $(new_comment).on("click", e => {
        $(new_comment).fadeOut("fast")
        $(comment_controls).fadeIn("fast")
        $(post_comments).css({
            "height": "73vh"
        })
    });

    $(document).on("click", ".comment_response b:nth-child(1)", e => {
        $(comment_post_id).val($(e.target).data("comment"));
        comment.view_comment_replies({ view_com_rep: comment_post_id.value });
    })

    $(document).on("click", ".comment_response b:nth-child(2)", e => {
        comment.react_to_comment({ react_to_comment: $(e.target).data("comment") }, e);
    })

    $(document).on(click, ".reply_response b:nth-child(1)", e => {
        comment.react_to_reply({ react_to_reply: $(e.target).data("reply") }, e);
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
        showProfile($(e.target).data("user"));
    })

    $(document).on(click, ".post_reactions i:nth-child(1)", e => {
        post.react_to_post({ react2post: $(e.target).data("post") }, e);
    })

    $(document).on(click, toogleUserMenu, e => {
        $(".userMenu").fadeOut("fast")
        $(e.target).children(".userMenu").toggle("slow")
    })

    $(document).on(click, friendRequest, e => {
        e.preventDefault()
        friend.friendRequest({ new_friend_request: $(e.target).data("user") }, e)
    })

    $(document).on(click, unfollowFriend, e => {
        e.preventDefault()
        friend.unfollowFriend({ unfollow_friend: $(e.target).data("user") }, e);
    })

    $(document).on(click, cancelRequest, e => {
        e.preventDefault()
        friend.cancelFriendRequest({ cancel_friend_request: $(e.target).data("user") }, e)
    })

    $(hideuser).on(click, e => {
        e.preventDefault()
        $(e.target).parent().parent().parent().parent().fadeOut("slow");
    })

    $(open_notifications).on(click, () => {
        notications._notifications()
    })

    $(close_notification).on(click, () => {
        $(notifications).fadeOut("slow")
        $(notification_list).empty();
    })
})