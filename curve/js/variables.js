export let albumTitle = document.getElementById('albTitle')
export let albumDescription = document.getElementById('albdecription')
export let albumTags = document.getElementById('albTags')
export let albumPrivacy = document.getElementById('albPrivacy')
export let checked = document.getElementById('switch')
export let status = document.getElementById('activityStatus')
export let uploadDisp = $('.uploadDisplay')
export let router = `${window.location.origin}/${window.location.pathname.split("/")[1]}/${window.location.pathname.split("/")[2]}/curve/php/router.php`;
export let createalbum = document.getElementById('createalbum')
export let deleteAlbum = $('.albumsFeed h5 .albumDelete');
export let leaveAlbum = $('.albumsFeed h5 .albumExit')
export let viewAlbum = $('.albumsFeed h5 .albumViewDetails')
export let albumImages = document.getElementById('newAlbImgs')
export let addImages = document.getElementById('addImages')
export let uploadedImages = $("#uploadImages .modal-body")
export let profileHead = document.getElementById('profileHead')
export let userHiddenInfo = document.getElementById('userHiddenInfo')
export let saveOrEdit = $(".userEditDetails b, #profileImage b")
export let closeViewedAlbum = document.getElementById('closeAlbumView')
export let closeProfileWindow = document.getElementById('closeUsersProfileWin')
export let close_comments = document.getElementById('close_comments')
export let comments_window = document.getElementById('comments_window')
export let post_comments = document.getElementById('post_comments')
export let album_list = document.getElementById('al-list')
export let album_id = document.getElementById('albumId')
export let send_comment = document.getElementById('send_comment')
export let comment_text = document.getElementById('comment_text')
export let no_comments = document.getElementById('no_comments')
export let userMenu = $("a.contactProfile")
export let comment_on_post = `.post_reactions .comment_on_post`
export let comment_post_id = document.getElementById('comment_post_id')
export let new_comment = document.getElementById('new_comment')
export let comment_controls = document.getElementById('comment_controls')
export let comment_replies = document.getElementById('comment_replies')
export let return_to_comments = document.getElementById('return_to_comments')
export let com_section = document.getElementById('com_section')
export let close_notification = document.getElementById('close_notification')
export let month = index => {
    switch (index) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
    }
}

export let loadInitializers = () => {
    $(".dropdown-toggle").dropdown();
    $('[data-toggle="tooltip"]').tooltip()
}

export let click = "click"
export let notification_list = document.getElementById('notification_list')
export let notifications = document.getElementById('notifications')
export let open_notifications = document.getElementById('open_notifications')
export let friendRequest = ".friendRequest"
export let unfollowFriend = ".unfollowFriend"
export let hideuser = ".hideUser"
export let cancelRequest = ".cancelRequest"
export let toogleUserMenu = ".toogleUserMenu"