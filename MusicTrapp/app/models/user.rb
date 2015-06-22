class User < ActiveRecord::Base
  has_many :playlists

  def password
    @password ||= BCrypt::Password.new(password_hash) #if password_hash.present?
  end

  def password=(new_password)
    @password = BCrypt::Password.create(new_password)
    self.password_hash = @password
  end

end
