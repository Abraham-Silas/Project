export let albumTitle = document.getElementById('albTitle')
export let albumDescription = document.getElementById('albdecription')
export let albumTags = document.getElementById('albTags')
export let albumPrivacy = document.getElementById('albPrivacy')
export let newAlbum = document.getElementById('newAlbum')
export let checked = document.getElementById('switch')
export let status = document.getElementById('activityStatus')
export let uploadDisp = $('.uploadDisplay')
export let router = `${window.location.origin}/${window.location.pathname.split("/")[1]}/${window.location.pathname.split("/")[2]}/curve/php/router.php`;
export let createalbum = document.getElementById('createalbum')
export let deleteAlbum = $('.albumsFeed h5 .albumDelete');
export let leaveAlbum = $('.albumsFeed h5 .albumExit')
export let viewAlbum = '.albumsFeed h5 .albumViewDetails'
export let albumImages = document.getElementById('newAlbImgs')
export let addImages = document.getElementById('addImages')
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

export let notification_list = document.getElementById('notification_list')
export let notifications = document.getElementById('notifications')
export let open_notifications = document.getElementById('open_notifications')
export let friendRequest = ".friendRequest"
export let unfollowFriend = ".unfollowFriend"
export let hideuser = ".hideUser"
export let cancelRequest = ".cancelRequest"
export let toogleUserMenu = ".toogleUserMenu"
export let notifications_count = document.getElementById('notifications_count')
export let close_messages_window = document.getElementById('close_messages_window')
export let messagesWin = document.getElementById('messagesWin')
export let chat_message = document.getElementById('chat_message')
export let send_chat_message = document.getElementById('send_chat_message')
export let open_friend_requests = document.getElementById('open_friend_requests')
export let open_chats = document.getElementById('open_chats')
export let close_requests_win = document.getElementById('close_requests_win')
export let friend_requests_win = document.getElementById('friend_requests_win')
export let requests_list = document.getElementById('requests_list')
export let friend_requests_count = document.getElementById('friend_requests_count')
export let chats_container = document.getElementById('chats_container')
export let chat_users_list = document.getElementById('chat_users_list')
export let chatsList = document.getElementById('chatsList')
export let posts = document.getElementById('posts')
export let chats_notification_count = document.getElementById('chats_notification_count')
export let recent_chats = document.getElementById('recent_chats')
export let album_feed = document.getElementById('album_feed')
export let frmLogin = document.getElementById('frmLogin')
export let log_user = document.getElementById('log_user')
export let log_pass = document.getElementById('log_pass')
export let preview = document.getElementById('uploadPreview')
export let dropzone = document.getElementById('dropzone')
export let browse = document.getElementById('browse')
export let close_album_upload_win = document.getElementById('close_album_upload_win')
export let uploadImages = document.getElementById('uploadImages')
export let albumUpload = document.getElementById('albumUpload')
export let chooseFiles = document.getElementById('chooseFiles')
export let addFriendsToAlbum = document.getElementById('addFriendsToAlbum')
export let albumInvite = document.getElementById('albumInvite')
export let close_friend_invite = document.getElementById('close_friend_invite')
export let albumFriendsList = document.getElementById('albumFriendsList')
export let deleteAlbumImage = document.getElementById('deleteAlbumImage')
export let albumHeader = document.getElementById('albumHeader')
export let album_privacy = document.getElementById('album_privacy')
export let clearImageDelete = document.getElementById('clearImageDelete')
export let localAlbums = document.getElementById('localAlbums')
export let globalAlbum = document.getElementById('globalAlbum')
// Media Tones
export let newMSG = new Audio("./tones/msg.mp3")
// on Events
export let click = "click"
export let submit = "submit"
export let change = "change"
export let keyup = "keyup"
export let fast = "fast"
export let slow = "slow"
export let mouseover = "mouseover"