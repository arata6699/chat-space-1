$(function() {

  var search_list = $('#user-search-result');
  var member_list = $('.chat-group-users');

  function appendProduct(user){
    var html =
              `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                   ${user.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendMember(member){
    var html = 
              `<div class="chat-group-user clearfix, id=chat-group-user-${ member.id }>
                <input name='chat_group[user_ids][]' type='hidden' value=${ member.id }>
                <p class="chat-group-user__name">${member.name}</p>
              </div>`

    member_list.append(html)
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendProduct(user);
        });
      }
    })
    .fail(function(){
      alert('ユーザーの検索に失敗しました');
    })
  })

  $(document).on('click', ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function(){
    var member = {};
    member.id = $(this).attr("data-user-id");
    member.name = $(this).attr("data-user-name");
    appendMember(member);
    
  })

});
