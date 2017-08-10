const express = require('express');
const app = express();
const request = require('request');
var bodyParser = require('body-parser');

// movies array. we have none so far.
let movies = null;

app.use(bodyParser.json()); // for parsing application/json

// enabling CORS for ALL requests.
app.all('/**', function (req, res, next) { 
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// app.get sets up a GET request to the /rando-movie url
// when it receives this request, it logs a meaningless message
// and sends back 'hello, world!'
app.get('/rando-movie', function (req, res) { 
  console.log('sending back a rando movie');
  
  // generates a random number 0 through movies.length (exclusive)
  let i = Math.floor(Math.random() * movies.length);

  // send back the movie object
  res.send({
    id: i,
    description: movies[i].overview
  });
});

app.post('/guess', function (req, res) {
  let movie = movies[req.body.id];

  console.log(movie.title);

  res.send({
    success: movie.title === req.body.guess
  });
});

app.listen(3000, function () { 
  console.log('node app started!');
  request(
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&vote_count.gte=25&api_key=0603313ca18aa157f0e6df581a8fbadf', 
    function (error, response, body) { 
      body = JSON.parse(body);
      console.log('***** LOADED MOVIES *****');

      movies = body.results;
    });
});