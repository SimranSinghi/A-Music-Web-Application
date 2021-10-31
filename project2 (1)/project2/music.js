// Put your Last.fm API key here
var api_key = "b8f77188d32a66b0bbbff2c31dd349eb";

function sendRequest () {

    var artist = encodeURI(document.getElementById("form-input").value);

    var getinfoxhr = new XMLHttpRequest();
    var getinfomethod = "artist.getinfo";
    getinfoxhr.open("GET", "proxy.php?method="+getinfomethod+"&artist="+artist+"&api_key="+api_key+"&format=json", true);

    var getsimilarxhr = new XMLHttpRequest();
    var getSimilarMethod = "artist.getSimilar";
    getsimilarxhr.open("GET", "proxy.php?method="+getSimilarMethod+"&artist="+artist+"&api_key="+api_key+"&format=json", true);

    var gettopalbumsxhr = new XMLHttpRequest();
    var getTopAlbumsMethod = "artist.getTopAlbums";
    gettopalbumsxhr.open("GET", "proxy.php?method="+getTopAlbumsMethod+"&artist="+artist+"&api_key="+api_key+"&format=json", true);


    getinfoxhr.setRequestHeader("Accept","application/json");
    getsimilarxhr.setRequestHeader("Accept","application/json");
    gettopalbumsxhr.setRequestHeader("Accept","application/json");

    getinfoxhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            json.artist ? getArtistInfo(json.artist): console.log('no data') ;
        }
    };

    getsimilarxhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            json.similarartists.artist ? getSimilarArtistInfo(json.similarartists.artist): console.log('no data') ;
        }
    };

    gettopalbumsxhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            json.topalbums.album ? getTopAlbumsforArtist(json.topalbums.album): console.log("NO ALBUMS AVAILABLE!") ;
        }
    };
    getinfoxhr.send(null);
    getsimilarxhr.send(null);
    gettopalbumsxhr.send(null);

}

function getArtistInfo(artist) {

    if(artist){
    document.getElementById("name").innerHTML = artist.name;
    document.getElementById("webpageurl").innerHTML = artist.url;
    document.getElementById("picture").src = artist.image[2]['#text'];
    document.getElementById("bio").innerHTML = artist.bio.content;

    console.log(artist);
    }
}

function getTopAlbumsforArtist(album) {
    var heading = document.getElementById("top-albums").getElementsByTagName('h2')[0];
    var list = document.getElementById("top-albums").getElementsByTagName('ul')[0];

    heading.innerHTML = album ?  'Top albums' : 'NO ALBUMS AVAILABLE';
    list.innerHTML = "";

    album.forEach(a => {
        var name = "<span>" + a.name + "</span>";
        var img = "<img src = '" + a.image[2]['#text'] + "' />";
        var listItem = "<li>" + name + "<br>" + img + "</li>";
        list.innerHTML += listItem;
    });
}

function getSimilarArtistInfo(artists) {

    var heading = document.getElementById("similar").getElementsByTagName('h2')[0];
    var list = document.getElementById("similar").getElementsByTagName('ul')[0];

    heading.innerHTML = 'Similar artists';
    list.innerHTML = "";

    artists.forEach(artist => {
        list.innerHTML += "<li>" + artist.name + "</li>"
    });
}
