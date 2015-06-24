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

  $.ajax({
    method: 'post',
    url: url,
    data: data
  }).done(function(response){
    console.log(response)
  })
}


var newSearch = function(event){
  event.preventDefault();
}