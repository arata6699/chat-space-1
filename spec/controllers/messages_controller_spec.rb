require 'rails_helper'

describe MessagesController do
  let(:user) { create(:user) }
  let(:group) { create(:group) }

  
  describe 'GET #index' do
    context 'login' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end
  
        it "assigns @message" do
          expect(assigns(:message)).to be_a_new Message
        end
  
        it "assigns @group" do
          expect(assigns(:group)).to eq group
        end
    
        it "renders index" do
          expect(response).to render_template :index
        end
    end
  
    context 'logout' do
      before do
        get :index, params: { group_id: group.id }
      end 

      it "redirects to new_user_session_pass" do
        expect(response).to redirect_to new_user_session_path
      end
    end
  end

  describe 'POST #create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    context 'login' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: params
        }
        
        it "'count up message'" do
          expect{ subject }.to change(Message, :count).by(1)
        end
        it "redirects to group_messages_path" do
          subject
          expect(response).to redirect_to group_messages_path(group)
        end
      end

      context "can't save" do        
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, text: nil, image: nil) } }
        subject {
          post :create,
          params: invalid_params
        }

        it "can't save?" do
          # binding.pry
          expect{ subject }.not_to change(Message, :count)
        end

        it "render to group_messages_path" do
          subject
          expect(response).to render_template :index
        end
      end        
    end

    context 'logout' do
      it "redirects to new_user_session_pass" do
        post :create, params: params
        expect(response).to redirect_to new_user_session_path
      end 
    end
  end
end