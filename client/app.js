
// 1. Fetch a new movie
// 2. Retrieve DOM elements to add listeners
// 3. Send a guess (button listener)

const description = document.querySelector('.description');
const input = document.querySelector('input');
const submitBtn = document.querySelector('#submit');

let id = null;

function getNewMovie() {
    fetch('http://192.168.1.49:3000/rando-movie')
        .then(function (response) {
            return response.json();
        })
        .then(function (movie) {
            description.textContent = movie.description;
            id = movie.id;
        });
}

function sendGuess(guess) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch('http://192.168.1.49:3000/guess', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
            id: id,
            guess: input.value,
        }),
    }).then(function (resp) {
        return resp.json();
    }).then(function (result) {
        console.log(result.success);

        input.value = '';
        
        getNewMovie();
    });

    // send this to a different URL from ben
}

getNewMovie();

submitBtn.addEventListener('click', function () {
    const guessText = input.value;

    console.log('send guess');
    sendGuess(guessText);
});