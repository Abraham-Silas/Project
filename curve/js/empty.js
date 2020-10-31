class Empty{
    constructor(){}

    comments(){
        return `<span class="text-center" id="no_comments">
                    <i class="fa fa-comments"></i><br/>
                    <label>No Comments</label>
                </span>`;
    }

    replies(){
        return `<span class="text-center" id="no_replies">
                    <i class="fa fa-comments"></i><br/>
                    <label>No Replies</label>
                </span>`;
    }

    albums(){
        return ``;
    }

    album_image_upload(){
        return `<label for="newAlbImgs">
                    <i class="fa fa-file"></i>
                    <br>Select to upload images <br><b>or</b><br> Drop your files here
                </label>`;
    }

    album_list(){
        return `<h2 class="text-center p-4">This album is empty...</h2>`;
    }
}

export let empty = new Empty();