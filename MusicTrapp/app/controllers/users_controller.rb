class UsersController < ApplicationController

  def login
    @user = User.find_by(email: params["user"][:email])
    if @user && @user.password_hash == params["user"][:password_hash]
      signin(@user)
      redirect_to @user
    else
      redirect_to '/'
    end
  end

  def create
    @user = User.create(user_params)
    if @user.save
      signin(@user)
      redirect_to @user
    end
  end

  def logout
    logout!
    redirect_to '/'
  end

  def show
    @user = User.find(params[:id])
  end


private
  def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password_hash, :profile_pic)
  end

  def signin(user)
    session[:user_id] = user.id
  end

  def logout!
    session[:user_id] = nil
  end
end