json.array! @users do |user|
  json.id user.id
  json.title user.name
end
