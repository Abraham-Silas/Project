<div id="newPost">
    <form id="post_content" method="POST" enctype="multipart/form-data" action="./php/router.php">
        <h4 class="card-header">
            <b>Create New Post</b><i class="fa fa-times float-right" id="close_post_window"></i>
        </h4>
        <div class="d-block w-100">
            <textarea id="post_text" placeholder="Type your post here..." class="form-control" rows="10" name="post_text"></textarea>
            <span>
                <input id="hashtag" type="text" class="form-control" placeholder="#hashtags" name="hashtags">
            </span>
        </div>
        <div class="post_footer m-0">
            <label for="post_images_files" class="fa fa-images"></label>
            <input type="file" name="files[]" id="post_images_files" accept="image/*" multiple>
            <input type="hidden" name="user" id="user">
            <button type="submit" name="createpost" class="btn btn-dark float-right"><i class="fas fa-share mr-1"></i>Share</button>
        </div>
        <div id="post_image_preview"></div>
    </form>
</div>

<div id="post_images_win">
    <div id="post_image_section" class="row">
        <div class="col-12 p-0 image_preview">
            <i class="fa fa-times" id="close_image_preview"></i>
            <img id="selected_post_image_preview" src="./images/profile/default.jpg"/>
        </div>
        <div class="col-12 p-0 next_preview">
        </div>
    </div>
</div>