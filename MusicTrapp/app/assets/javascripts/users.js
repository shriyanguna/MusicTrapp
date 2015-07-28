$(document).ready(function(){
    eventBindings();
    // $('#search-container').hide();
})

var eventBindings = function(){
  // $('#new_playlist').on('submit', newPlaylist)
  $('#search-form').on('submit', newSearch);
  $('#search-results-container').on('click', '.related-artist-avatar', clickSearch);

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



    $('#media-wrapper').prepend(template(context))

    albumSearch();
    relatedArtists();
    })
}

var clickSearch = function(event){
  event.preventDefault();
  $('#track_title').val(event.target.attributes[1].value)
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



    $('#media-wrapper').prepend(template(context))

    relatedArtists();
    albumSearch();

    })
}

var albums = ""

var albumSearch = function(){
  var url = 'https://api.spotify.com/v1/artists/' + artistId + '/albums?album_type=album&market=GB'

  var request = $.ajax({
    method: 'get',
    url: url
  }).done(function(response){
    console.log(response)

    var source = $('#album-stuff').html();
    var template = Handlebars.compile(source);


    var uniqueAlbums = {};
    var albums = response.items;
    var uniques = [];

    for(var i=0; i < albums.length; i++){
        var title = albums[i].name.split(" (")[0];
        if(!uniqueAlbums[title]){
        uniqueAlbums[title] = albums[i];
        uniques.push(uniqueAlbums[title])
      }

    }

    var context = {albums: uniques}

    artistAlbumsDom = "#artist-" + artistId +"-albums"
    $(artistAlbumsDom).append(template(context));


  })
}

var relatedArtists = function(){
  var url = 'https://api.spotify.com/v1/artists/' + artistId + '/related-artists'

  var request = $.ajax({
    method: 'get',
    url: url,
    dataType: 'json'
  }).done(function(response){
    console.log(response);

    var topResults = response.artists.slice(0,9)

    var source = $('#related-artists').html();
    var template = Handlebars.compile(source);
    var context = {artists: topResults};

    artistInfoDom = "#artist-info-" + artistId

    $(artistInfoDom).append(template(context));

    artistDivId = "#" +artistId
    $(artistInfoDom).height("auto");

    artistAlbumsHeight = $(artistAlbumsDom).height()
    artistInfoHeight = $(artistInfoDom).height()

    if(artistAlbumsHeight > artistInfoHeight){
      $(artistDivId).height(artistAlbumsHeight);
    } else {
    $(artistDivId).height(artistInfoHeight);
    }
    debugger
  })

}


