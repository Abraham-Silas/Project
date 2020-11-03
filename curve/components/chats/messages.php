<div id="messagesWin">
    <div id="messages_content">
        <h3 class="m-0 card-header">
            <i class="fa fa-comment mr-1"></i>
            Chat Messages
            <b class="fa fa-times float-right" id="close_messages_window"></b>
        </h3>
        <div class="row m-0" id="chats_container">
            <div class="col-4 p-0" id="chat_users_list">
                <!-- Users List -->
            </div>
            <div class="col-8 p-0" id="chat_messages">
                <div class="w-100" id="chatsList">
                    <!-- Messages will appear here -->
                </div>
                <div class="row m-0" id="chat_message_controls">
                    <span>
                        <i class="fa fa-grin m-2 mt-0"></i>
                        <i class="fa fa-paperclip m-2 mt-0"></i>
                    </span>
                    <span class="col-10 p-0">
                        <textarea id="chat_message" class="form-control" rows="3" placeholder="Type your message..."></textarea>
                    </span>
                    <span class="col p-0">
                        <button type="button" id="send_chat_message" class="btn btn-warning ml-2">Send</button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>