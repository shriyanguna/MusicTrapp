class PlaylistsController < ApplicationController
  def create
    @user = User.find(params[:user_id])
    @playlist = Playlist.new(playlist_params)
    if @playlist.save
      redirect_to user_path(@user)
    end
  end

  private

  def playlist_params
    params.require(:playlist).permit(:user_id, :name)
  end
end
