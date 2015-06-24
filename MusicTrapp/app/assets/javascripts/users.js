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


var newSearch = function(event){
  event.preventDefault();
}