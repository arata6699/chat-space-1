json.array! @new_messages do |message|
  json.id         message.id
  json.text       message.text
  json.image      message.image.url
  json.created_at message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name  message.user.name
  json.group_id   message.group_id
end
