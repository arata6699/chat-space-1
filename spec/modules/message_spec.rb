require 'rails_helper'

describe Message do
  describe '#create' do    
    context 'can save' do
      it "is valid with a message" do
        expect(build(:message, image: nil)).to be_valid
      end
  
      it "is valid with a image" do
        expect(build(:message, text: nil)).to be_valid
      end
      
      it "is valid with a image & text" do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      it "is invalid without a image & text" do
        message = build(:message, text: nil, image: nil)
        message.valid?
        expect(message.errors[:text]).to include("を入力してください")
      end
      it "is invalid without a group_id" do
        message = build(:message, group_id: nil )
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
      it "is invalid without a user_id" do
        message = build(:message, user_id: nil )
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end