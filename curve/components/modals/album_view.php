<div class="viewAlbum">
    <div class="albumDetails">
        <h4 class="p-3 m-0"><b class="fa fa-images float-left mr-2"></b><span id="albumHeader">Album Name</span><i class="fa fa-times float-right" id="closeAlbumView"></i></h4>
        <div class="row m-0">
            <div class="col-3 m-0 p-0 albumViewMenu">
                <h5 class="text-center mb-2 pt-2">Menu</h5>
                <hr class="m-0 mb-1 p-0">
                <button class="btn btn-default text-left form-control mb-1" type="button" id="albumUpload">Upload<i class="fa fa-upload float-right mr-1"></i></button>
                <button class="btn btn-default text-left form-control mb-1" type="button" id="addFriendsToAlbum">Add Friends<i class="fa fa-user-plus float-right"></i></button>
                <button class="btn btn-default text-left form-control mb-1 deleteImages" type="button" id="deleteAlbumImage">Delete<i class="fa fa-trash float-right mr-1"></i></button>
                <button class="btn btn-default text-left form-control mb-1 clearDelete" type="button" id="clearImageDelete">Clear<i class="far fa-times-circle float-right mr-1"></i></button>
                <button class="btn btn-default text-left form-control mb-1" type="button">View<i class="fa fa-info-circle float-right mr-1"></i></button>
                <div id="album_privacy">
                    <i class="fa fa-lock mr-1"></i><label>Private</label>
                </div>
            </div>
            <div class="col m-0 al-images">
                <div id="al-list">
                    <!-- Album Images Will Appear Here -->
                </div>
            </div>
        </div>
    </div>
</div>

<div id="uploadImages">
    <div id="uploadSection">
        <h3 class="card-header">
            <i class="fa fa-images float-left mr-1"></i>Upload Images
            <b class="fa fa-times float-right" id="close_album_upload_win"></b>
        </h3>
        <div class="row m-0" id="uploadControls">
            <div class="col-5 p-0">
                <div id="dropzone">
                    <span class="text-center">
                        <b class="fa fa-file"></b>
                        <label for="chooseFiles">Drop Files or <a id="browse" href="#">Browse</a></label>
                        <input type="file" id="chooseFiles" multiple>
                    </span>
                </div>
            </div>
            <div class="col p-1" id="uploadPreview">
                <li class="list-group-item mb-1">
                    <span class="w-25">
                        <img src="./images/display/img17.jpg" width="70" height="70"/>
                    </span>
                    <span class="w-75 pl-2">
                        <b>Image Name</b>
                        <div><b class="fa fa-check-circle uploadStatus"></b>uploaded</div>
                    </span>
                </li>
            </div>
        </div>
    </div>
</div>

<div id="albumInvite">
    <div id="inviteSection">
        <h4 class="card-header"><b class="fa fa-user-plus"></b> Invite Friends <i class="fa fa-times float-right" id="close_friend_invite"></i> </h4>
        <div id="albumFriendsList" class="p-2">
            <!-- Friend List to invite will appear here -->
        </div>
    </div>
</div>