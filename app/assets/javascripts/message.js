$(function(){
  function buildHTML(message){

   image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    
    var html = 
                  `<div class= message>
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
    // console.log(...formData.entries());
    var url = $(this).attr('action')
    // console.log(url)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      // console.log(data);
      var html = buildHTML(data);
      $('.maessages').append(html)
      // console.log(html);
      $('.form__input-box').val('')
      $('.chat-group-form__action-btn').attr('disabled', false);
      $('.maessages').animate({ scrollTop: $('.maessages')[0].scrollHeight }, 'fast');
    })
    .fail(function(){
      alert('入力してください');
    })
  })
  // debugger
});