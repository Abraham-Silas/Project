<div class="modal fade" id="newAlbum" role="dialog" aria-labelledby="newAlbum" aria-hidden="true">
    <div class="modal-dialog">
        <form method="POST" id="createalbum">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="newPost">Create New Album</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <label for="albTitle">Title</label>
                        <input type="text" id="albTitle" class="form-control round" placeholder="Artificial Intelligence" name="albTitle">
                    </div>
                    <div class="mt-2">
                        <label for="albdecription">Description</label>
                        <textarea placeholder="Type your album description here..." id="albdecription" class="form-control" rows="4" name="textpost"></textarea>
                    </div>
                    <div class="mt-2">
                        <label for="albTags">Hashtag(s)</label>
                        <input type="text" id="albTags" class="form-control round" placeholder="#AI" name="albTags">
                    </div>
                    <div class="mt-2">
                        <label for="albPrivacy">Privacy</label>
                        <select id="albPrivacy" class="form-control" name="albPrivacy">
                            <option value="none">--Select--</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer p-2">
                    <button type="submit" class="btn btn-secondary">Create</button>
                </div>
            </div>
        </form>
    </div>
</div>