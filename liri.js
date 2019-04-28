require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

let whatToDo = process.argv[2]
let searchQuery = process.argv.slice(3).join(" ")



switch (whatToDo) {
    case 'spotify-this-song':
        spotify
            .search({ type: 'track', query: searchQuery })
            .then(function (response) {
                console.log("Song: " + response.tracks.items[0].name);
                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Album: " + response.tracks.items[0].album.name)
                console.log("Preview URL: " + response.tracks.items[0].preview_url)
            })
            .catch(function (err) {
                console.log(err);
            });
        break;
}
