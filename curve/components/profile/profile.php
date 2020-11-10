<div class="userProfileWindow">
    <div class="profileDetails">
        <div class="p-0 jumbotron">
            <div id="profileImage">
                <i class="fa fa-times float-right mr-1" id="closeUsersProfileWin"></i>
                <label id="changeProfilePic" for="changeProfile" class="fa fa-camera float-left"></label>
                <input type="file" id="changeProfile" class="w-75">
                <h3 class="p-2">
                    <i class="fa fa-user mr-2"></i>
                    <label class="m-0 p-0" id="profileUsernames">Name Surname</label>
                    <input type="text" id="editName" placeholder="Name">
                    <input type="text" id="editSurname" placeholder="Surname">
                    <b class="fa fa-pen float-right" data-state="edit" data-type="names"></b>
                </h3>
            </div>
            <div class="p-3 userEditDetails">
                <h5 class="w-100">
                    <i class="fa fa-envelope mr-1"></i>
                    <label id="profileEmail">email@gmail.com</label>
                    <input type="text" class="w-75" id="editEmail">
                    <b class="fa fa-pen float-right" data-state="edit" data-type="email"></b>
                </h5>
                <h5>
                    <i class="fa fa-calendar mr-1"></i>
                    <label id="profileBirthday">03 January 1997</label>
                    <input type="date" class="w-75" id="editBDay">
                    <b class="fa fa-pen float-right" data-state="edit" data-type="bday"></b>
                </h5>
                <h5 class="text-center">
                    <label id="logout" class="btn btn-danger"><i class="fa fa-sign-out-alt mr-1"></i>Logout</label>
                </h5>
            </div>
            <h4 class="m-0 row" id="profile_menu_tab">
                <button class="btn btn-dark" id="view_user_posts">Posts</button>
                <button class="btn btn-dark" id="view_user_albums">Albums</button>
                <button class="btn btn-dark" id="view_user_friends">Friends</button>
                <button class="btn btn-dark" id="view_user_followers">Followers</button>
                <button class="btn btn-dark" id="view_user_followings">Following</button>
            </h4>
        </div>
        <div class="posts">
            <div class="currentUserPosts">
                
            </div>
        </div>
    </div>
</div>