<?php
    session_start();
    function createNewAccount($userObject){
        global $connection;
        $default = addslashes(file_get_contents("../images/profile/default.jpg"));

        if($userObject->pass1 == $userObject->pass2)
        {
            $alreadyExists = $connection->query("SELECT * FROM `users` WHERE `email` = '$userObject->mail'");
            if($alreadyExists->num_rows == 0)
            {   
                $newUser = $connection->query("INSERT INTO `users` (`name`, `surname`, `email`, `birthday`, `profile`) VALUES ('$userObject->fname', '$userObject->lname', '$userObject->mail', '$userObject->bday', '$default')");
                if($newUser)
                {
                    $getID = $connection->query("SELECT * FROM `users` WHERE `email` = '$userObject->mail'");
                    
                    if($getID->num_rows == 1){
                        $_SESSION["signed"] = true;
                        $user = $getID->fetch_assoc();
                        $pass = hashPassword($userObject->pass1);
                        $setLogin = $connection->query("INSERT INTO `login` (`username`, `password`, `user_id`) VALUES ('$userObject->mail', '$pass', '$user[user_id]')");
                        if($setLogin){
                            $data["username"] = $userObject->mail;
                            $data["password"] = $userObject->pass1;
                            login(json_decode(json_encode($data)));
                        }
                        else{
                            $_SESSION["signed"] = false;
                            removeUser($userObject->mail);
                            redirectBackToIndex();
                        }
                    }
                }
                else{
                    $_SESSION["signed"] = false;
                    redirectBackToIndex();
                }
            }
            else{
                $_SESSION["signed"] = false;
                redirectBackToIndex();
            }
        }
        else{
            $_SESSION["signed"] = false;
            redirectBackToIndex();
        }
    }

    function removeUser($user)
    {
        global $connection;
        $remove = $connection->query("DELETE FROM `users` WHERE `email` = '$user'");
        if(!$remove)
            echo $remove->error;
    }

    function hashPassword($textPassword){
        return password_hash($textPassword, PASSWORD_BCRYPT, ["cost" => 12]);
    }

    function login($object)
    {
        global $connection;
        $userLogin = $connection->query("SELECT * FROM `login` WHERE `username` = '$object->username'");
        if($userLogin->num_rows == 1)
        {
            $user = $userLogin->fetch_assoc();
            if(password_verify($object->password, $user["password"]))
            {
                $logged = getUserDetails($user["username"]);
                toogleLoginStatus($logged);
                echo $logged;
            }
            else
                echo 0;
        }
        else
            echo 0;
    }

    function toogleLoginStatus($user)
    {
        global $connection;
        $connection->query("UPDATE `users` SET `status` = 'online' WHERE `user_id` = '$user'");            
    }

    function toogleLogoutStatus($user)
    {
        global $connection;
        $connection->query("UPDATE `users` SET `status` = 'offline' WHERE `user_id` = '$user'");
    }

    function getUserDetails($userId)
    {
        global $connection;
        $loggedUser = array();
        $fetchDetails = $connection->query("SELECT * FROM `users` WHERE `email` = '$userId'");
        $details = $fetchDetails->fetch_assoc();
        return $details["user_id"];
    }

    function redirectBackToIndex(){
        header("Location: http://$_SERVER[HTTP_HOST]/".Settings::getRoot()."/".Settings::getBase()."/");
    }

    function redirectToHome(){
        header("Location: http://$_SERVER[HTTP_HOST]/".Settings::getRoot()."/".Settings::getBase()."/curve/home.php");
    }
 
    function createNewPost($postObject, $images)
    {
        global $connection;
        $countfiles = count($images);
        $date = date("Y-m-d H:i:s", time());
        $newPost = $connection->query("INSERT INTO `posts` (`description`, `hashtags`, `user`, `post_datetime`) VALUES ('$postObject->textpost', '$postObject->hashtag', '$_SESSION[logged_user]', '$date')");
        if($newPost)
        {
            if($countfiles > 0)
            {
                $postId = getPostId($_SESSION["logged_user"]);
                $img = addslashes(file_get_contents($images));
                $saveImage = $connection->query("INSERT INTO `post_images` (`image`, `post`) VALUES ('$img', '$postId')");
            }
            redirectToHome();
        }
    }

    function getPostId($user)
    {
        global $connection;
        $getID = $connection->query("SELECT MAX(`post_id`) FROM `posts` WHERE `user` = '$user'");
        $postId = $getID->fetch_assoc();
        return $postId["MAX(`post_id`)"];
    }

    function getImageCount($post)
    {
        global $connection;
        $loadImages = $connection->query("SELECT * FROM `post_images` WHERE `post` = '$post'");
        return $loadImages->num_rows;
    }

    function globalActivity(){}

    function activity($object)
    {
        global $connection;
        if($object->post_type == "local")
            $loadPosts = $connection->query("SELECT * FROM `posts`, `users`, `friends` WHERE `friends`.`user` = '$object->local_content' AND `users`.`user_id` = `posts`.`user` AND `friends`.`friend` = `posts`.`user` ORDER BY `posts`.`post_datetime` DESC");
        else
            $loadPosts = $connection->query("SELECT * FROM `posts`, `users` WHERE `users`.`user_id` = `posts`.`user` ORDER BY `posts`.`post_datetime` DESC");
        
        if($loadPosts->num_rows > 0)
        {
            while ($post = $loadPosts->fetch_assoc())
            {
                $dateDisplay = "";
                $size = getImageCount($post["post_id"]);
                $today = date("Y-m-d 00:00:00", time());
                $yesterday = date("Y-m-d 00:00:00", time()-(60*60*24));
                $postDate = strtotime($post["post_datetime"]);
                $date = date("Y-m-d 00:00:00", $postDate);

                if(new DateTime($today) == new DateTime($date))
                    $dateDisplay = "Today";
                else if(new DateTime($yesterday) == new DateTime($date))
                    $dateDisplay = "Yesterday";
                else
                {
                    $month = monthSelection(date("m", $postDate));
                    $day = date("d", $postDate);
                    $dateDisplay = "$day-$month";
                }

                $status = check_reaction("post", $post["post_id"], $object->local_content) == false ? "reacted" : "unreacted";
                
                displayPost($post["post_id"], $post["user_id"], $post["name"], $post["surname"], $dateDisplay, $post["profile"],$post["hashtags"], $post["description"], $size, $status); 
            }
        }
        else
        {
            echo '<h4 class="text-center p-1 mb-1 mt-0">You have no local posts yet...</h4>';
            $data["local_content"] = $object->local_content;
            $data["post_type"] = "global";
            activity(json_decode(json_encode($data)));
        }
    }

    function displayPost($post_id, $post_user, $name, $surname, $date, $profile, $hashtag, $post, $size, $status)
    {
        echo '<div class="card post">
                <span class="p-2 card-header">
                    <span>
                        <img src="data:image/*;base64,'.base64_encode($profile).'" class="rounded-circle" width="50" height="50">
                    </span>
                    <span>
                        <label class="post_user" data-user="'.$post_user.'">'.$name.' '.$surname.'</label>
                        <label class="post_album" data-album="1"><i class="fa fa-images mr-1"></i>My Story</label>
                    </span>
                    <span class="dropdown" id="postMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <label>'.$date.'</label>
                        <i class="fas fa-caret-square-down dropdown-toggle" data-toggle="dropdown"></i>
                        <div class="dropdown-menu p-1" aria-labelledby="postMenu" id="postMenu">
                            <a class="dropdown-item m-0" href="#" data-post="'.$post_id.'"><b class="fas fa-trash mr-2"></b>Edit</a>
                            <a class="dropdown-item m-0" href="#" data-post="'.$post_id.'"><b class="fas fa-edit mr-2"></b>Delete</a>
                            <a class="dropdown-item m-0" href="#" data-post="'.$post_id.'"><b class="fas fa-user-plus mr-2"></b>Send Request</a>
                            <a class="dropdown-item m-0" href="#" data-post="'.$post_id.'"><b class="fas fa-user-times mr-2"></b>Unfriend</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item m-0" href="#"><b class="far fa-flag mr-2"></b>Report</a>
                        </div>
                    </span>
                </span>
                <span class="card-body p-0">
                    <div class="postText">
                        '.$post.'
                    </div>
                    <div class="postHashTag">
                        <a href="#">'.$hashtag.'</a>
                        <span>'.$size.'<i class="fa fa-images ml-1"></i></span>
                    </div>
                    <div class="postMedia">
                        '.postImages($post_id).'
                    </div>
                </span>
                <span class="card-footer p-1">
                    <img src="./images/display/img17.jpg" class="rounded-circle"/>
                    <img src="./images/display/img13.jpg" class="rounded-circle"/>
                    <img src="./images/display/img18.jpg" class="rounded-circle"/>
                    <label><a href="#" class="scrollTo" data-post="'.$post_id.'">Commented</a> on your post</label>
                    <span class="post_reactions">
                        <i class="fas fa-heart '.$status.'" data-post="'.$post_id.'"></i>
                        <i class="fas fa-comment comment_on_post" data-post="'.$post_id.'"></i>
                    </span>
                </span>
            </div>';
    }

    function monthSelection($month)
    {
        switch((int)$month)
        {
            case 1:
                return "Jan";
            case 2:
                return "Feb";
            case 3:
                return "Mar";
            case 4:
                return "Apr";
            case 5: 
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "Jul";
            case 8:
                return "Aug";
            case 9:
                return "Sep";
            case 10:
                return "Oct";
            case 11:
                return "Nov";
            case 12:
                return "Dec";
        }
    }

    function postImages($post)
    {
        global $connection;
        $loadImages = $connection->query("SELECT * FROM `post_images` WHERE `post` = '$post'");
        $images = "";
        if($loadImages->num_rows > 0)
        {
            while ($img = $loadImages->fetch_assoc()) 
            {
                $base64 = base64_encode($img["image"]);
                $images .= "<img class='col-12 m-0 p-0' src='data:image/*;base64,$base64'>";
            }
        }

        return $images;
    }

    function createNewAlbum($album)
    {
        global $connection;
        $insertAlbum = $connection->prepare("INSERT INTO albums (album_name, album_description, date_created, creator, album_status, album_hashtag) VALUES (?, ?, ?, ?, ?, ?)");
        $insertAlbum->bind_param("sssiss", $title, $description, $date, $creator, $status, $tags);
        $title = $album->title;
        $description = $album->description;
        $date = date("Y-m-d", time());
        $creator = $album->createalbum;
        $status = $album->privacy;
        $tags = $album->hashtag;
        
        if($insertAlbum->execute())
            echo 1;
        else
            echo $saveAlbum->error;
    }

    function global_albums()
    {
        global $connection;
        $loadAll = $connection->query("SELECT * FROM `albums`");
        if($loadAll->num_rows > 0)
        {
            while($album = $loadAll->fetch_assoc())
            {
                echo '<div>
                        <h5 class="m-0 p-1 pl-2" data-status="closed">
                            <span class="dropdown w-100" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <b class="w-100">'.$album["album_name"].'</b>
                                <i class="fa fa-angle-down float-right mr-1 dropdown-toggle" data-toggle="dropdown"></i>
                                <div class="dropdown-menu dropdown-menu-right" id="albumMenu">
                                    <a class="dropdown-item m-0 albumViewDetails" href="#" data-album="'.$album["album_id"].'"><i class="fa fa-binoculars mr-1"></i>View Album</a>
                                    <a class="dropdown-item m-0 albumDelete" href="#" data-album="'.$album["album_id"].'"><i class="fa fa-trash mr-1"></i>Delete</a>
                                    <a class="dropdown-item m-0 albumExit" href="#" data-album="'.$album["album_id"].'"><i class="fa fa-sign-out-alt mr-1"></i>Leave</a>
                                </div><br>
                                <a href="#">'.$album["album_hashtag"].'</a>
                            </span>
                            <span>
                                <img src="./images/display/img13.jpg" class="rounded-circle">
                                <img src="./images/display/img17.jpg" class="rounded-circle">
                                <img src="./images/display/img18.jpg" class="rounded-circle">
                                <label><a href="">+ 5 others</a> shared images on this album</label>
                            </span>
                        </h5>
                        <div class="albumImages">
                            <div>
                                <img src="./images/display/img13.jpg">
                            </div>
                            <div>
                                <img src="./images/display/img17.jpg">
                            </div>
                            <div>
                                <img src="./images/display/img6.jpg">
                            </div>
                        </div>
                    </div>';
            }
        }
        else
        {
            echo "<h5 class='text-center'>You have no albums yet...<h5>";
        }
    }

    function invited($user, $logged)
    {
        global $connection;
        $invited = $connection->query("SELECT * FROM `requests` WHERE `user` = '$logged' AND `requestee` = '$user'");
        return ($invited->num_rows > 0) ? true : false; 
    }

    function isFriend($user, $logged)
    {
        global $connection;
        $notFriend = '<a class="list-group-item m-0 friendRequest" href="#" data-user="'.$user.'"><i class="fa fa-user-plus mr-1"></i>Send Request</a>';
        $friend = '<a class="list-group-item m-0 unfollowFriend" href="#" data-user="'.$user.'"><i class="fa fa-user-times mr-1"></i>Unfriend</a>';
        $cancelReq = '<a class="list-group-item m-0 cancelRequest" href="#" data-user="'.$user.'"><i class="fa fa-user-times mr-1"></i>Cancel Request</a>';
        if(invited($user, $logged))
            return $cancelReq;
        else{
            $verifyFriendship = $connection->query("SELECT * FROM `friends` WHERE `user` = '$logged' AND `friend` = '$user'");
            return $verifyFriendship->num_rows == 1 ? $friend : $notFriend;
        }
    }

    function loadUsers($object)
    {
        global $connection;
        $loadAll = $connection->query("SELECT * FROM `users` WHERE `user_id` <> '$object->global_users'");
        if($loadAll->num_rows > 0)
        {
            while($user = $loadAll->fetch_assoc())
            {
                echo '<div class="user">
                        <span>
                            <img oncontextmenu="return false;" ondragstart="return false;" src="data:image/*;base64,'.base64_encode($user["profile"]).'" class="rounded">
                        </span>
                        <span class="w-100">
                            <b>'.$user["name"].' '.$user["surname"].'</b>
                            <b><i class="fas fa-circle mr-1 '.$user["status"].'"></i>'.$user["status"].'</b>
                            <b class="fa fa-angle-down toogleUserMenu">
                                <div class="p-1 userMenu">
                                    '.isFriend($user["user_id"], $object->global_users).'
                                    <a class="list-group-item m-0 hideUser" href="#"><i class="fa fa-user-slash mr-1"></i>Hide</a>
                                    <a class="list-group-item m-0 contactProfile" href="#" data-user="'.$user["user_id"].'"><i class="fa fa-user mr-1"></i>View Profile</a>
                                </div>
                            </b>
                        </span>
                    </div>';
            }
        }
    }

    function uploadImages($img, $album)
    {
        global $connection;
        $upload = $connection->query("INSERT INTO shared_photos (album, user, photo) VALUES ('$album', '$_SESSION[logged_user]', '$img')");
        if($upload)
            $_SESSION["uploaded"] = true;
        else
            $_SESSION["uploaded"] = false;
    }

    function albumImages($files, $album)
    {
        foreach($files["name"] as $key => $value)
        {
            $img = addslashes(file_get_contents($files["tmp_name"][$key]));
            uploadImages($img, $album);
        }
        redirectToHome();
    }

    function loadAlbumImages($object)
    {
        global $connection;
        $imgs = array();
        $photos = $connection->query("SELECT * FROM `shared_photos`,`users` WHERE `shared_photos`.`album` = '$object->viewAlbum' AND `shared_photos`.`user` = `users`.`user_id`");
        if($photos->num_rows > 0)
        {
            while($photo = $photos->fetch_assoc())
            {
                $data["names"] = "$photo[name] $photo[surname]";
                $data["photo"] = $photo["photo_id"];
                $data["img"] = "data:image/*;base64,".base64_encode($photo["photo"]);
                array_push($imgs, $data);
            }
        }
        echo json_encode($imgs);
    }

    function userPosts($user)
    {
        global $connection;
        $loadPosts = $connection->query("SELECT * FROM `posts`, `users` WHERE `users`.`user_id` = `posts`.`user` AND `users`.`user_id` = '$user' ORDER BY `posts`.`post_datetime` DESC");
        while ($post =  $loadPosts->fetch_assoc())
        {
            $dateDisplay = "";
            $size = getImageCount($post["post_id"]);
            $today = date("Y-m-d 00:00:00", time());
            $yesterday = date("Y-m-d 00:00:00", time()-(60*60*24));
            $postDate = strtotime($post["post_datetime"]);
            $date = date("Y-m-d 00:00:00", $postDate);

            if(new DateTime($today) == new DateTime($date))
                $dateDisplay = "Today";
            else if(new DateTime($yesterday) == new DateTime($date))
                $dateDisplay = "Yesterday";
            else
            {
                $month = monthSelection(date("m", $postDate));
                $day = date("d", $postDate);
                $dateDisplay = "$day-$month";
            }

            $status = check_reaction("post", $post["post_id"]) == false ? "reacted" : "unreacted";

            displayPost($post["post_id"], $post["user_id"], $post["name"], $post["surname"], $dateDisplay, $post["profile"],$post["hashtags"], $post["description"], $size, $status);
            
        }
    }

    function showUserProfile($id)
    {
        global $connection;
        $details = array();
        $profile = $connection->query("SELECT * FROM `users` WHERE `user_id` = '$id'");
        $user = $profile->fetch_array();
        $data["names"] = "$user[name] $user[surname]";
        $data["email"] = $user["email"];
        $data["birthday"] = $user["birthday"];
        $data["profile"] = "data:image/*;base64,".base64_encode($user["profile"]);
        array_push($details, $data);
        echo json_encode($details);
    }

    function editUserInfo($object)
    {
        global $connection;
        switch($object->type)
        {
            case "email":
                $editInfo = $connection->query("UPDATE `users` SET `email` = '$object->editDetails' WHERE `user_id` = '$object->user'");
                break;

            case "bday":
                $editInfo = $connection->query("UPDATE `users` SET `birthday` = '$object->editDetails' WHERE `user_id` = '$object->user'");
                break;

            case "names":
                list($fname, $lname) = explode(" ", $object->editDetails);
                if(strlen($lname) > 0)
                    $editInfo = $connection->query("UPDATE `users` SET `name` = '$fname', `surname` = '$lname' WHERE `user_id` = '$object->user'");
                else
                    $editInfo = $connection->query("UPDATE `users` SET `name` = '$fname' WHERE `user_id` = '$object->user'");
                break;
        }
    }

    function fetchComments($object)
    {
        global $connection;
        $comments = $connection->query("SELECT * FROM `comments`, `users` WHERE `comments`.`user` = `users`.`user_id` AND `comments`.`post` = '$object->viewComments'");
        $commentsArray = array();
        if($comments->num_rows > 0)
        {
            while($comment = $comments->fetch_assoc())
            {
                $data["_id"] = $comment["comment_id"];
                $data["_uid"] = $comment["user_id"];
                $data["_pid"] = $comment["post"];
                $data["_comment"] = $comment["comment"];
                $data["_date"] = $comment["comment_date"];
                $data["_name"] = $comment["name"];
                $data["_surname"] = $comment["surname"];
                $data["_profile"] = "data:image/*;base64,".base64_encode($comment["profile"]);
                $data["_status"] = check_reaction("comment", $comment["comment_id"]) == false ? "reacted" : "unreacted";
                array_push($commentsArray, $data);
            }
        }

        echo json_encode($commentsArray);
    }

    function fetch_comment_replies($object)
    {
        global $connection;
        $replies = $connection->query("SELECT * FROM `comment_reply`, `users` WHERE `comment_reply`.`user` = `users`.`user_id` AND `comment_reply`.`comment_id` = '$object->view_com_rep'");
        $repliesArray = array();
        if($replies->num_rows > 0)
        {
            while($reply = $replies->fetch_assoc())
            {

                $data["_id"] = $reply["reply_id"];
                $data["_uid"] = $reply["user_id"];
                $data["_reply"] = $reply["reply"];
                $data["_date"] = $reply["reply_date"];
                $data["_name"] = $reply["name"];
                $data["_surname"] = $reply["surname"];
                $data["_profile"] = "data:image/*;base64,".base64_encode($reply["profile"]);
                $data["_status"] = check_reaction("reply", $reply["reply_id"]) == false ? "reacted" : "unreacted";
                array_push($repliesArray, $data);
            }
        }

        echo json_encode($repliesArray);
    }

    function check_reaction($type, $type_id, $user = "2")
    {
        global $connection;
        switch($type)
        {
            case "comment":
                $q = "SELECT * FROM `comment_reactions` WHERE `comment` = '$type_id' AND `user` = '$user'";
                break;
            case "reply":
                $q = "SELECT * FROM `reply_reactions` WHERE `reply` = '$type_id' AND `user` = '$user'";
                break;
            case "post":
                $q = "SELECT * FROM `post_reactions` WHERE `post` = '$type_id' AND `user` = '$user'";
                break;
        }

        $check_react = $connection->query($q);

        return ($check_react->num_rows > 0) ? false : true;
    }

    function comment($comObject)
    {
        global $connection;
        $new_comment = $connection->prepare("INSERT INTO `comments` (`comment`, `comment_date`, `user`, `post`) VALUES (?, ?, ?, ?)");
        $new_comment->bind_param("ssii", $com, $date, $user, $post);
        $com = $connection->real_escape_string($comObject->comment);
        $date = date("Y-m-d H:i:s", time());
        $user = $comObject->user;
        $post = $comObject->post;
        if($new_comment->execute())
            echo true;
        else
            echo $new_comment->error;
    }

    function reply($repObject)
    {
        global $connection;
        $new_reply = $connection->prepare("INSERT INTO `comment_reply` (`reply`, `reply_date`, `user`, `comment_id`) VALUES (?, ?, ?, ?)");
        $new_reply->bind_param("ssii", $rep, $date, $user, $comment);
        $rep = $connection->real_escape_string($repObject->reply);
        $date = date("Y-m-d H:i:s", time());
        $user = $repObject->user;
        $comment = $repObject->comment_id;
        if($new_reply->execute())
            echo true;
        else
            echo $new_reply->error;
    }

    function post_reaction($object)
    {
        global $connection;
        if(check_reaction("post", $object->react2post))
        {
            $react = $connection->prepare("INSERT INTO `post_reactions` (`post`, `user`, `r_date`) VALUES (?, ?, ?)");
            $react->bind_param("iis", $post, $user, $rDate);
            $post = $object->react2post;
            $user = $object->user;
            $rDate = date("Y-m-d H:i:s", time());
            $react->execute();
            echo 1;
        }
        else
        {
            $remove = $connection->query("DELETE FROM `post_reactions` WHERE `post` = '$object->react2post' AND `user` = '$object->user'");
            echo 0;
        }
    }

    function comment_reaction($object)
    {
        global $connection;
        if(check_reaction("comment", $object->react_to_comment))
        {
            $react = $connection->prepare("INSERT INTO `comment_reactions` (`comment`, `user`, `r_date`) VALUES (?, ?, ?)");
            $react->bind_param("iis", $comment, $user, $rDate);
            $comment = $object->react_to_comment;
            $user = $object->user;
            $rDate = date("Y-m-d H:i:s", time());
            $react->execute();
            echo 1;
        }
        else
        {
            $remove = $connection->query("DELETE FROM `comment_reactions` WHERE `comment` = '$object->react_to_comment' AND `user` = '$object->user'");
            echo 0;
        }
    }

    function reply_reaction($object){
        global $connection;
        if(check_reaction("reply", $object->react_to_reply))
        {
            $react = $connection->prepare("INSERT INTO `reply_reactions` (`reply`, `user`, `r_date`) VALUES (?, ?, ?)");
            $react->bind_param("iis", $reply, $user, $rDate);
            $reply = $object->react_to_reply;
            $user = $object->user;
            $rDate = date("Y-m-d H:i:s", time());
            $react->execute();
            echo 1;
        }
        else
        {
            $remove = $connection->query("DELETE FROM `reply_reactions` WHERE `reply` = '$object->react_to_reply' AND `user` = '$object->user'");
            echo 0;
        }
    }

    function friend_request($object)
    {
        global $connection;
        $newRequest = $connection->prepare("INSERT INTO `requests` (`user`, `requestee`, `request_type`) VALUES (?, ?, ?)");
        $newRequest->bind_param("iis", $user, $friendee, $reqType);
        $user = $object->user;
        $friendee = $object->new_friend_request;
        $reqType = "friend";
        if($newRequest->execute())
            echo 1;
        else
            echo $newRequest->error;
    }

    function unfollowFriend($object)
    {
        global $connection;
    }

    function cancelFriendRequest($object)
    {
        global $connection;
        $removeReq = $connection->query("DELETE FROM `requests` WHERE `user` = '$object->user' AND `requestee` = '$object->cancel_friend_request'");
        if($removeReq)
            echo 1;
        else
            echo $removeReq->error;
    }

    function notifications($object)
    {
        global $connection;
        $notifications = array();
        $postReacttions = $connection->query("SELECT * FROM `post_reactions`,`posts`,`users` WHERE `posts`.`user` = '$object->load_notifications' AND `post_reactions`.`post` = `posts`.`post_id` AND `post_reactions`.`status` = 'unread' AND `post_reactions`.`user` = `users`.`user_id` AND `post_reactions`.`user` <> '$object->load_notifications'");
        if($postReacttions->num_rows > 0)
        {
            while($reaction = $postReacttions->fetch_assoc())
            {
                $data["user"] = "$reaction[name] $reaction[surname]";
                $data["profile"] = "data:image/*;base64,".base64_encode($reaction["profile"]);
                $data["type"] = "post_react";
                $data["reaction"] = $reaction["reaction_id"];
                $data["datetime"] = $reaction["r_date"];
                array_push($notifications, $data);
            }
        }

        $postReacttions = $connection->query("SELECT * FROM `comments`,`posts`,`users` WHERE `posts`.`user` = '$object->load_notifications' AND `comments`.`post` = `posts`.`post_id` AND `comments`.`status` = 'unread' AND `comments`.`user` = `users`.`user_id` AND `comments`.`user` <> '$object->load_notifications'");
        if($postReacttions->num_rows > 0)
        {
            while($reaction = $postReacttions->fetch_assoc())
            {
                $data["user"] = "$reaction[name] $reaction[surname]";
                $data["profile"] = "data:image/*;base64,".base64_encode($reaction["profile"]);
                $data["type"] = "comment";
                $data["reaction"] = $reaction["comment_id"];
                $data["datetime"] = $reaction["comment_date"];
                array_push($notifications, $data);
            }
        }

        $postReacttions = $connection->query("SELECT * FROM `comments`,`comment_reactions`,`users` WHERE `comments`.`user` = '$object->load_notifications' AND `comments`.`comment_id` = `comment_reactions`.`comment` AND `comment_reactions`.`status` = 'unread' AND `comment_reactions`.`user` = `users`.`user_id` AND `comment_reactions`.`user` <> '$object->load_notifications'");
        if($postReacttions->num_rows > 0)
        {
            while($reaction = $postReacttions->fetch_assoc())
            {
                $data["user"] = "$reaction[name] $reaction[surname]";
                $data["profile"] = "data:image/*;base64,".base64_encode($reaction["profile"]);
                $data["type"] = "comment_react";
                $data["reaction"] = $reaction["reaction_id"];
                $data["datetime"] = $reaction["r_date"];
                array_push($notifications, $data);
            }
        }

        $postReacttions = $connection->query("SELECT * FROM `comments`,`comment_reply`,`users` WHERE `comments`.`user` = '$object->load_notifications' AND `comments`.`comment_id` = `comment_reply`.`comment_id` AND `comment_reply`.`status` = 'unread' AND `comment_reply`.`user` = `users`.`user_id` AND `comment_reply`.`user` <> '$object->load_notifications'");
        if($postReacttions->num_rows > 0)
        {
            while($reaction = $postReacttions->fetch_assoc())
            {
                $data["user"] = "$reaction[name] $reaction[surname]";
                $data["profile"] = "data:image/*;base64,".base64_encode($reaction["profile"]);
                $data["type"] = "reply";
                $data["reaction"] = $reaction["reply_id"];
                $data["datetime"] = $reaction["reply_date"];
                array_push($notifications, $data);
            }
        }

        echo json_encode($notifications);
    }

    function openFriendRequests($object)
    {
        global $connection;
        $requests = array();
        $request = $connection->query("SELECT * FROM `requests`, `users` WHERE `requests`.`requestee` = '$object->open_friend_requests' AND `requests`.`user` = `users`.`user_id`");
        if($request->num_rows > 0)
        {
            while($req = $request->fetch_assoc())
            {
                $data["id"] = $req["request_id"];
                $data["user"] = "$req[name] $req[surname]";
                $data["profile"] = "data:image/*;base64,".base64_encode($req["profile"]);
                $data["type"] = $req["request_type"];
                array_push($requests, $data);
            }
        }

        echo json_encode($requests);
    }

    function acceptFriendRequest($object)
    {
        global $connection;
        $accept = $connection->query("SELECT * FROM `requests` WHERE `request_id` = '$object->accept_friend_request'");
        $request = $accept->fetch_assoc();

        $newConnection = $connection->prepare("INSERT INTO `friends` (`user`, `friend`, `friendship_inception`) VALUES (?, ?, ?)");
        $newConnection->bind_param("iis", $user, $friend, $date);
        $user = $object->user;
        $friend = $request["user"];
        $date = date("Y-m-d", time());
        if($newConnection->execute())
        {
            $newConnection = $connection->prepare("INSERT INTO `friends` (`user`, `friend`, `friendship_inception`) VALUES (?, ?, ?)");
            $newConnection->bind_param("iis", $user, $friend, $date);
            $user = $request["user"];
            $friend = $object->user;
            $date = date("Y-m-d", time());
            if($newConnection->execute())
            {
                $removeRequest = $connection->query("DELETE FROM `requests` WHERE `request_id` = '$object->accept_friend_request'");
                echo 1;
            }
            else
                echo $newConnection->error;
        }
        else
            echo $newConnection->error;
    }

    function requestsNotifications($object)
    {
        global $connection;
        $getRequests = $connection->query("SELECT * FROM `requests` WHERE `requestee` = '$object->load_requests'");
        echo $getRequests->num_rows;
    }

    function sent_a_message($sender, $receiver)
    {
        global $connection;
        $sent = $connection->query("SELECT * FROM `messages` WHERE `status` = 'unread' AND `receiver` = '$receiver' AND `sender` = '$sender'");
        if($sent->num_rows > 0)
            return true;
        else
            return false;
    }

    function chatFriendList($object)
    {
        global $connection;
        $list = array();
        $friends = $connection->query("SELECT * FROM `friends`, `users` WHERE `friends`.`user` = '$object->open_chats_win' AND `friends`.`friend` = `users`.`user_id`");
        if($friends->num_rows > 0)
        {
            while($user = $friends->fetch_assoc())
            {
                $data["user_id"] = $user["user_id"];
                $data["user"] = "$user[name] $user[surname]";
                $data["profile"] = "data:image/*;base64,".base64_encode($user["profile"]);
                if(sent_a_message($user["user_id"], $object->open_chats_win))
                    $data["sent"] = true;
                else
                    $data["sent"] = false;
                array_push($list, $data);
            }
        }

        echo json_encode($list);
    }

    function sendNewMessage($object)
    {
        global $connection;
        $message = $connection->prepare("INSERT INTO `messages` (`sender`, `receiver`, `message`, `msg_date`) VALUES (?, ?, ?, ?)");
        $message->bind_param("iiss", $sender, $receiver, $msg, $date);
        $sender = $object->sender;
        $receiver = $object->send_message_to;
        $date = date("Y-m-d H:i:s", time());
        $msg = $connection->real_escape_string($object->message);
        if($message->execute())
            echo 1;
        else
            echo 0;
    }

    function loadChatMessages($object)
    {
        global $connection;
        $messages = array();        
        $removeUnread = $connection->query("UPDATE `messages` SET `status` = 'read' WHERE `sender` = '$object->load_messages' AND `receiver` = '$object->user'");
        // get all the messages sent to another user
        $sent = $connection->query("SELECT * FROM `messages` WHERE `sender` = '$object->user' AND `receiver` = '$object->load_messages'");
        if($sent->num_rows > 0)
        {
            while($chat = $sent->fetch_assoc())
            {
                $data["message"] = stripcslashes($chat["message"]);
                $data["msg_date"] = $chat["msg_date"];
                $data["type"] = "s";
                array_push($messages, $data);
            }
        }

        // get all the messages sent to me!
        $received = $connection->query("SELECT * FROM `messages` WHERE `sender` = '$object->load_messages' AND `receiver` = '$object->user'");
        if($received->num_rows > 0)
        {
            while($chat = $received->fetch_assoc())
            {
                $data["message"] = stripcslashes($chat["message"]);
                $data["msg_date"] = $chat["msg_date"];
                $data["type"] = "r";
                array_push($messages, $data);
            }
        }

        echo json_encode($messages);
    }

    function checkNewMessages($object)
    {
        global $connection;
        $check = $connection->query("SELECT * FROM `messages` WHERE `receiver` = '$object->new_chats' AND `status` = 'unread'");
        echo $check->num_rows;
    }

    function markAsRead($msg)
    {
        global $connection;
        $connection->query("UPDATE `messages` SET `status` = 'read' WHERE `msg_id` = '$msg'");
    }

    function newMessagesAwait($object)
    {
        global $connection;
        $messages = array();
        $new_message = $connection->query("SELECT * FROM `messages` WHERE `receiver` = '$object->user' AND `sender` = '$object->messages_from' AND `status` = 'unread'");
        if($new_message->num_rows > 0)
        {
            while($message = $new_message->fetch_assoc())
            {
                $data["message"] = $message["message"];
                $data["msg_date"] = $message["msg_date"];
                array_push($messages, $data);
                markAsRead($message["msg_id"]);
            }
        }

        echo json_encode($messages);
    }

    function logged_user_profile($object)
    {
        global $connection;
        $profile = $connection->query("SELECT * FROM `users` WHERE `user_id` = '$object->logged_user'");
        $user = $profile->fetch_assoc();
        $data["profile"] = "data:image/*;base64,".base64_encode($user["profile"]);
        $data["logged"] = $user["user_id"];
        echo json_encode($data);
    }
?>