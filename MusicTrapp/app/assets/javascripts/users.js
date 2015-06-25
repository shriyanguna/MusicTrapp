$(document).ready(function(){
    eventBindings();
    $('#search-container').hide();
})

var eventBindings = function(){
  $('#new_playlist').on('submit', newPlaylist)
  $('#search-form').on('submit', newSearch)
}

var newPlaylist = function(event){
  event.preventDefault();

  var data = $('#new_playlist').serialize();
  var url = $('#new_playlist').attr('action')

  $('#new-playlist-container').hide();
  $('#search-container').show();

  $.ajax({
    method: 'post',
    url: url,
    data: data,
    dataType: 'json'
  }).done(function(response){
    console.log(response)
    var source = $('#playlists-template').html();
    var template = Handlebars.compile(source);
    $('#playlists-list').append(template(response));

  })
}

var artistId = ""

var newSearch = function(event){
  event.preventDefault();
  var artist = $('#track_title').val().replace(/\s/g, "+");
  var url = 'https://api.spotify.com/v1/search?q=' + artist + '&type=artist&limit=1'
  var request = $.ajax({
    method: 'get',
    url: url
  })
  request.done(function(response){
    console.log(response);
    artistId = response.artists.items[0].id

    var source = $('#artist-stuff').html();
    var template = Handlebars.compile(source);
    var context = response.artists.items[0]
    debugger
    $('#search-results-container').append(template(context))

    albumSearch();
    })
}

var albumSearch = function(){
  var url = 'https://api.spotify.com/v1/artists/' + artistId + '/albums?album_type=album&market=US'

  var request = $.ajax({
    method: 'get',
    url: url
  }).done(function(response){
    console.log(response)
    debugger
  })
}