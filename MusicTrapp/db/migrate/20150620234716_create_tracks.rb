class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title
      t.string :artist
      t.string :spotify_track_id
      t.string :spotify_album_id
      t.string :spotify_artist_id

      t.timestamps null: false
    end
  end
end
