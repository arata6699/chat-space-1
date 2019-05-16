$(function() {

  var search_list = $('#user-search-result');

  function appendProduct(user){
    console.log(user);
    var html =
              `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                   ${user.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    // console.log(input)
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      // var html = buildHTML(data);
      // $('#user-search-result').append(html)
      // console.log(html);
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
  });
});
