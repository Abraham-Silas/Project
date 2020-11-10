<?php
    include_once './server.php';
    include_once './config.php';

    switch ($_POST) 
    {
        case isset($_POST["login"]):
            login(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["register"]):
            createNewAccount(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["createpost"]):
            createNewPost(json_decode(json_encode($_POST)), $_FILES["files"]["tmp_name"]);
            break;

        case isset($_POST["createalbum"]):
            createNewAlbum(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["uploadImages"]):
            albumImages($_FILES["albumImages"], $_POST["albumId"]);
            break;

        case isset($_POST["viewAlbum"]):
            loadAlbumImages(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["viewAlbumInfo"]):
            album_info(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["viewUserProfile"]):
            showUserProfile(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["loadUserPosts"]):
            userPosts(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["editDetails"]):
            editUserInfo(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["viewComments"]):
            fetchComments(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["comment"]):
            comment(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["reply"]):
            reply(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["view_com_rep"]):
            fetch_comment_replies(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["react2post"]):
            post_reaction(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["react_to_comment"]):
            comment_reaction(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["react_to_reply"]):
            reply_reaction(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["new_friend_request"]):
            friend_request(json_decode(json_encode($_POST)));
            break;
        
        case isset($_POST["unfollow_friend"]):
            unfollowFriend(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["unfollow"]):
            unfollow_user(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["cancel_friend_request"]):
            cancelFriendRequest(json_decode(json_encode($_POST)));
            break;
            
        case isset($_POST["load_notifications"]):
            notifications(json_decode(json_encode($_POST)));
            break;
            
        case isset($_POST["open_friend_requests"]):
            openFriendRequests(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["accept_friend_request"]):
            acceptFriendRequest(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["load_requests"]):
            requestsNotifications(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["open_chats_win"]):
            chatFriendList(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["send_message_to"]):
            sendNewMessage(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["load_messages"]):
            loadChatMessages(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["local_content"]):
            activity(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["new_chats"]):
            checkNewMessages(json_decode(json_encode($_POST)));
            break;
    
        case isset($_POST["messages_from"]):
            newMessagesAwait(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["global_users"]):
            loadUsers(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["global_album"]):
            global_albums(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["local_album"]):
            local_albums(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["logged_user"]):
            logged_user_profile(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["upload_shared_photos"]):
            share_photos(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["delete_album_image"]):
            delete_image(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["invite_friends"]):
            invite_friends(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["invitation"]):
            send_invitation(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["cancel_invitation"]):
            cancel_invitation(json_decode(json_encode($_POST)));
            break;
            
        case isset($_POST["accept_invitation"]):
            accept_invitation(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["reject_invitation"]):
            reject_invitation(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["selected_post_images"]):
            post_images_load(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["change_profile"]):
            change_profile_image(json_decode(json_encode($_POST)));
            break;
                  
        case isset($_POST["follow"]):
            follow_user(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["view_user_albums"]):
            user_albums(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["view_user_friends"]):
            user_friends(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["view_user_followers"]):
            user_followers(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["view_user_followings"]):
            user_followings(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["delete_user_post"]):
            delete_post(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["search_post"]):
            post_search(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["find_a_user"]):
            user_search(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["get_report_reasons"]):
            report_reasons(json_decode(json_encode($_POST)));
            break;

        case isset($_POST["report_post"]):
            report_post(json_decode(json_encode($_POST)));
            break;
            
        default:
            redirectBackToIndex();
            break;
    }
?>