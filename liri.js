require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");


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
    case 'OMDB':
        axios
            .get("http://www.omdbapi.com/?t=" + searchQuery + "&apikey=62771a8e")
            .then(function (response) {
                console.log("Title: " + response.data.Title)
                console.log("Year: " + response.data.Year)
                console.log("IMDB Rating: " + response.data.Ratings[0].Value)
                console.log("Rotton Tomatoes Rating: " + response.data.Ratings[1].Value)
                console.log("Country of production: " + response.data.Country)
                console.log("Plot: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors)
                
            })
            .catch(function (error) {
                console.log(error);
            });


}
