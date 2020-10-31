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
                    <input type="text" class="w-75">
                    <b class="fa fa-pen float-right" data-state="edit" data-type="names"></b>
                </h3>
            </div>
            <div class="p-3 userEditDetails">
                <h5 class="w-100">
                    <i class="fa fa-envelope mr-1"></i>
                    <label id="profileEmail">email@gmail.com</label>
                    <input type="text" class="w-75">
                    <b class="fa fa-pen float-right" data-state="edit" data-type="email"></b>
                </h5>
                <h5>
                    <i class="fa fa-calendar mr-1"></i>
                    <label id="profileBirthday">03 January 1997</label>
                    <input type="date" class="w-75">
                    <b class="fa fa-pen float-right" data-state="edit" data-type="bday"></b>
                </h5>
                <h5 class="text-center">
                </h5>
            </div>
            <h4 class="p-1 pl-3 m-0 align-bottom">
                <button class="btn btn-dark">Posts</button>
                <button class="btn btn-dark">Albums</button>
                <button class="btn btn-dark">Friends</button>
                <button class="btn btn-dark">Followers</button>
                <button class="btn btn-dark">Friend Request</button>
            </h4>
        </div>
        <div class="posts">
            <div class="currentUserPosts">
                <?php
                    globalActivity();
                ?>
            </div>
        </div>
    </div>
</div>