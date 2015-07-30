class HomeController < ApplicationController
  def login

  end

  def index
    @user = User.new
  end
end
