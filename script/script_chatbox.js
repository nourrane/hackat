var isRefresh = false;

$(document).ready(function(){
    // Form submission
  $('form').submit(function(e){
    // Avoid page reload
    e.preventDefault();
    // Get the message
    let get_msg = $('input').val();
    // Prepare message
    if( get_msg != ' '){
      send_ret = $.post("htbin/chatsend.py", "msg=" + get_msg);
      $('input').val("");
      refreshMessages();
      isRefresh = false;
    }
  });
  if(!isRefresh){
    refreshMessages();
    isRefresh = true;
  }
});

// Refreshing chat messages.
function refreshMessages() {
  $.ajax({
    url: 'htbin/chatget.py',
    type: 'GET',
    dataType: 'JSON',
    success: function(data) {
      $('.box .inner').empty();
      for(var i = 0; i < data.length; i++){
        $('.box .inner').append("<p>" + " > ["+ data[i].time + "] " + data[i].user  + " : " + data[i].msg + "</p>");
      }
    }
  });
}
