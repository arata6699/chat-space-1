class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
    respond_to do |format| 
      format.html
      format.json { Message.where(params[:id])}
    end
  end
end
