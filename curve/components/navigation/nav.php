<nav class="navbar">
    <span class="col-4 p-0">
        <img id="logo" src="./images/logo/curve__.png">
    </span>
    <span class="col-4 p-0">
        <input type="search" class="form-control" id="searchForPost" name="findPost" placeholder="Search for a post...">
        <i class="fa fa-search postSearch"></i>
    </span>
    <span class="col-4 p-0">
        <div>
            <span class="mr-3">
                <label class="mr-1" id="activityStatus">Local</label>
                <label id="switch_view">
                    <label for="switch" class="mr-1"></label>
                    <input type="checkbox" id="switch">
                </label>
            </span>
            <span class="mr-2">
                <i class="fas fa-flag" id="open_reports" data-toggle="tooltip" data-placement="bottom" title="Post Reports">
                    <b id="report_notification_count">0</b>
                </i>
                <i class="fas fa-user-plus" id="open_friend_requests" data-toggle="tooltip" data-placement="bottom" title="Friend Requests">
                    <b id="friend_requests_count">0</b>
                </i>
                <i class="fas fa-comment-alt" id="open_chats" data-toggle="tooltip" data-placement="bottom" title="Chat Messages">
                    <b id="chats_notification_count">0</b>
                </i>
                <i class="fas fa-bell" id="open_notifications" data-toggle="tooltip" data-placement="bottom" title="Notifications">
                    <b id="notifications_count">0</b>
                </i>
            </span>
            <span>
                <img src="./images/profile/default.jpg" alt="user profile image" class="rounded-circle" id="profileHead">
            </span>
        </div>
    </span>
</nav>