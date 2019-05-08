## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|integer|null: false|

### Association
- has_many :messages
- has_many :groups, through: :group_users
- has_many :group_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :users, through: :group_users
- has_many :group_users

## group_userテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|index: true, foreign_key: true|
|group_id|integer|index: true, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|string|---|
|group-id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user