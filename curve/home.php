<!DOCTYPE html>
<html>
    <?php
        include_once './php/config.php';
        include_once './php/server.php';
        include_once './components/head/head.php';
    ?>
    <body>
        <div class="fluid-container">
            <?php include_once './components/navigation/nav.php'; ?>
            <div class="row m-0 postContent">
                <div id="messages">
                    <h4 class="text-left">
                        <span id="usersListHeader">
                            <b class="fa fa-users mr-1"></b> 
                            <i class="fa fa-search float-right" id="find_a_user"></i>
                        </span>
                        <span id="FindUser">
                            <i class="fa fa-arrow-left" id="close_user_search"></i>
                            <input type="text" id="begin_find_user_search" class="form-control" placeholder="Find a user"/>
                        </span>
                    </h4>
                    <div class="recent_chats" id="recent_chats">
                        <!-- Users List will appear here -->
                    </div>
                </div>
                <div id="posts">
                    <!-- Posts will appear here -->
                </div>
                <div id="albums">
                    <h4 class="row m-0">
                        <b class="btn btn-success btn-sm col" id="localAlbums"><span class="fa fa-people-arrows mr-1"></span><span class="label">Local</span></b> 
                        <b class="btn btn-primary btn-sm col" id="globalAlbum"><span class="fa fa-globe mr-1"></span><span class="label">Global</span></b> 
                        <b class="btn btn-danger btn-sm col" data-toggle="modal" data-target="#newAlbum"><span class="fa fa-plus mr-1"></span><span class="label">New</span></b>
                        <b class="btn btn-warning btn-sm col-1"><span class="fa fa-search"></span></b>
                    </h4>
                    <div class="albumsFeed" id="album_feed">
                        <!-- Albums will appear here -->
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
            include_once './components/chats/messages.php';
            include_once './components/notifications/notification.php';  
            include_once './components/requests/requests.php';  
            include_once './components/report/report.php';  
        ?>
        <script type="module" src="./js/main_.js"></script>
    </body>
    <?php include_once './components/footer/footer.html'; ?>
</html>