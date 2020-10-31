<!DOCTYPE html>
<html>
    <?php
        include_once './php/config.php';
        include_once './php/server.php';
        include_once './components/head/head.php';
        if(!isset($_SESSION["logged_user"]))
            redirectBackToIndex();
        if(isset($_SESSION["uploaded"]))
            unset($_SESSION["uploaded"]);
    ?>
    <body>
        <div class="fluid-container">
            <?php include_once './components/navigation/nav.php'; ?>
            <div class="row m-0 postContent">
                <div id="messages">
                    <h4 class="text-left">
                        <b class="fa fa-users mr-1"></b> 
                        <i class="fa fa-search float-right"></i>
                    </h4>
                    <div class="recent_chats">
                        <?php loadUsers(); ?>
                    </div>
                </div>
                <div id="posts">
                    <?php globalActivity(); ?>
                </div>
                <div id="albums">
                    <h4>
                        <b class="fas fa-album mr-1 ml-1"></b> 
                        <b class="btn btn-dark btn-sm float-right" data-toggle="modal" data-target="#newAlbum"><b>New</b></b>
                    </h4>
                    <div class="albumsFeed">
                        <?php albums(); ?>
                    </div>
                </div>
            </div>
        </div>
        <?php 
            include_once './components/buttons/buttons.html';
            include_once './components/modals/new_post.php';
            include_once './components/modals/new_album.php';
            include_once './components/modals/album_view.php';
            include_once './components/profile/profile.php'; 
            include_once './components/comments/comments.html'; 
            include_once './components/notifications/notification.php'; 
        ?>
        <script type="module" src="./js/main_.js"></script>
    </body>
    <?php include_once './components/footer/footer.html'; ?>
</html>