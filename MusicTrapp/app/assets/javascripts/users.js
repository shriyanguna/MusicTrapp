$(document).ready(function(){
    profInfo();
    eventBindings();

})

var params = getHashParams();
var access_token = params.access_token
var market = ""

var eventBindings = function(){
  $('#search-form').on('submit', newSearch);
  $('#search-results-container').on('click', '.related-artist-avatar', clickSearch);

}

var profInfo = function(){
  var url = 'https://api.spotify.com/v1/me'

  var request = $.ajax({
      method: 'get',
      url: url,
      headers: {
                  'Authorization': 'Bearer ' + access_token
                }
    }).done(function(response){
      console.log(response);
      market = response.country

    }).fail(function(){
      console.log("Fail");
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


    albumSearch();
    relatedArtists();

    })
}

var albums = ""

var albumSearch = function(){
  var url = 'https://api.spotify.com/v1/artists/' + artistId + '/albums?album_type=album&market=' + market

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
    // $(artistInfoDom).height("auto");

    artistAlbumsDom = "#artist-" + artistId +"-albums";

    artistAlbumsHeight = $(artistAlbumsDom).height()
    artistInfoHeight = $(artistInfoDom).height()



    if(artistAlbumsHeight > artistInfoHeight){
      $(artistDivId).height(artistAlbumsHeight);
    } else {
     $(artistDivId).height(artistInfoHeight);
    }

  })

}

function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }


