$(function(){
  function buildHTML(message){
    // <p>
    // <img src = '${message.image}' >               
    // </p>
    var html = 
                  `<div class= message>
                    <div class= upper-info>
                      <p class= "upper-info__user">
                        ${message.user_name}
                      </p>
                      <p "upper-info__date">
                        ${message.created_at}
                      </p>
                   </div>
                      <p>
                        ${message.text}
                      </p>
                     
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
      $('.input').val('')
      $('.chat-group-form__action-btn').attr('disabled', false);
      $('.maessages').animate({ scrollTop: $('.maessages')[0].scrollHeight }, 'fast');
    })
  })
  // debugger
});