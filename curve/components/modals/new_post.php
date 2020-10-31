<div class="modal fade" id="newPost" tabindex="-1" role="dialog" aria-labelledby="newPost"
    aria-hidden="true">
    <div class="modal-dialog">
        <form method="POST" enctype="multipart/form-data" action="./php/router.php">
            <div class="modal-content">
                <div class="modal-header p-1">
                    <h3 class="modal-title" id="newPost">Create New Post</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body p-0">
                    <textarea placeholder="Type your post here..." class="form-control" rows="8" name="textpost"></textarea>
                    <input type="text" class="form-control" placeholder="#hashtags" name="hashtag">
                </div>
                <div class="modal-footer p-2">
                    <label for="file" class="fa fa-images"></label>
                    <input type="file" name="file" id="file" accept="image/*">
                    <button type="submit" name="createpost" class="btn btn-secondary">Share</button>
                </div>
            </div>
        </form>
    </div>
</div>