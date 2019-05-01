require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
var fs = require('fs');
let whatToDo = process.argv[2]
let searchQuery = process.argv.slice(3).join(" ")
liri();

function liri() {
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
        case 'movie-this':
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
            break;
        case 'concert-this':
            axios
                .get("https://rest.bandsintown.com/artists/" + searchQuery + "/events?app_id=7413daf4-0487-476e-b5d7-ed1e4cc1c089")
                .then(function (response) {
                    console.log("Venue name: " + response.data[0].venue.name)
                    console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region)
                    var date = response.data[0].datetime.slice(0, 10)
                    var time = response.data[0].datetime.slice(11)
                    console.log("Date of concert: " + moment(date).format("MM/DD/YYYY") + ", Time: " + moment(time, "HH:mm:ss").format("HH:mm"))
                })
                .catch(function (error) {
                    console.log(error);
                });
            break;
        case 'do-what-it-says':
            fs.readFile('random.txt', 'utf8', function (err, data) {
                if (err) {
                    console.log(err)
                }
                var dataArr = data.split(",");
                whatToDo = dataArr[0]
                searchQuery = dataArr[1]
                liri(whatToDo, searchQuery)
            });
            break;
        default:
            console.log("Pick an actual command. The proper commands are as follows:")
            console.log("'spotify-this-song', 'movie-this', 'concert-this', 'do-what-it-says'.");
            console.log("All other commands will result in me needing to repeat this message. Please don't make me do that.");
    }
}