$(function(){
  function buildHTML(message){

   image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    
    var html = 
                  `<div class= message data-id= ${message.id} data-group_id="${message.group_id}">
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
                      ${image}
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
});
