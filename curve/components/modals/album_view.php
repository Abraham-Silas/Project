<div class="viewAlbum">
    <div class="albumDetails">
        <h4 class="p-3 m-0"><b class="fa fa-images float-left mr-2"></b>Album Title<i class="fa fa-times float-right" id="closeAlbumView"></i></h4>
        <div class="row m-0">
            <div class="col-3 m-0 p-0 albumViewMenu">
                <h3 class="text-center mb-2 pt-2">Menu</h3>
                <hr class="m-0 mb-1 p-0">
                <button class="btn btn-default text-left form-control mb-1" type="button" data-toggle="modal" data-target="#uploadImages">Upload<i class="fa fa-upload float-right mr-1"></i></button>
                <button class="btn btn-default text-left form-control mb-1" type="button">Add Friends<i class="fa fa-user-plus float-right"></i></button>
                <button class="btn btn-default text-left form-control mb-1 deleteImages" type="button">Delete<i class="fa fa-trash float-right mr-1"></i></button>
                <button class="btn btn-default text-left form-control mb-1 clearDelete" type="button">Clear<i class="far fa-times-circle float-right mr-1"></i></button>
                <button class="btn btn-default text-left form-control mb-1" type="button">Settings<i class="fa fa-cog float-right mr-1"></i></button>
                <div>
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

<div class="modal fade" id="uploadImages">
    <div class="modal-dialog">
        <form method="POST" enctype="multipart/form-data" action="./php/router.php" id="uploadAlbumImages">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="m-0"><i class="fa fa-upload float-left mr-1"></i>Upload Images</h3>
                </div>
                <div class="p-1 modal-body">
                    <label for="newAlbImgs" class="uploadDisplay"><i class="fa fa-file"></i><br>Select to upload images <br><b>or</b><br> Drop your files here</label>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-dark" type="button" id="addImages">Add Images</button>
                    <button type="submit" class="btn btn-danger" name="uploadImages">Upload</button>
                    <input type="file" name="albumImages[]" id="newAlbImgs" accept="image/*" multiple>
                    <input type="hidden" name="albumId" id="albumId">
                </div>
            </div>
        </form>
    </div>
</div>