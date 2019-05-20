$(function(){
  function buildHTML(message){

    var addImage = "";
    if (message.image) {
      addImage = `<img src="${message.image}" class="lower-message__image">`;
    }
    
    var html = 
                  `<div class= "message" data-id= "${message.id}" data-group-id= "${message.group_id}">
                    <div class= upper-info>
                      <p class= "upper-info__user">
                        ${message.user_name}
                      </p>
                      <p class= "upper-info__date">
                        ${message.created_at}
                      </p>
                    </div>
                      <p>
                        ${message.text}
                      </p>
                      ${addImage}
                  </div>`
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.maessages').append(html)
      $('.new_message')[0].reset();
      $('.chat-group-form__action-btn').attr('disabled', false);
      $('.maessages').animate({ scrollTop: $('.maessages')[0].scrollHeight }, 'fast');
    })
    .fail(function(){
      alert('入力してください');
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.message:last').data('id');
    group_id = $('.message:last').data('group-id');
    console.log(group_id, last_message_id);
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages);
      var insertHTML = '';
      $.each(messages, function(i, message){
        if (message.id > last_message_id ) {
          insertHTML += buildHTML(message);
          $('.maessages').append(insertHTML);
          console.log(insertHTML);
        }
      });
      $('.maessages').animate({ scrollTop: $('.maessages')[0].scrollHeight }, 'fast');
    })
    .fail(function() {
      console.log('error');
    });
  }
  $(function() {
      setInterval(reloadMessages, 5000);
    });
});
