class PlaylistsController < ApplicationController
  def create
    @user = User.find(params[:user_id])
    @playlist = Playlist.new(playlist_params)

    respond_to do |format|
      if @playlist.save
        format.html {redirect_to user_path(@user)}
        format.json { render :json => @playlist }
      else
        format.json { render :json => @playlist.errors.full_messages, :status => :unprocessable_entity }
      end
    end
  end

  private

  def playlist_params
    params.require(:playlist).permit(:user_id, :name)
  end
end
