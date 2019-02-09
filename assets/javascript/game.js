const message = "Press any key to get started!";
var getStarted = message;

var wins = 0;
var losses = 0;
var currentWord = "???";
var numberRemaining = 0;
var lettersGuessed = "???";

document.getElementById("get-started").textContent = getStarted;
document.getElementById("wins").textContent = wins;
document.getElementById("losses").textContent = losses;
document.getElementById("current-word").textContent = currentWord;
document.getElementById("number-remaining").textContent = numberRemaining;
document.getElementById("letters-guessed").textContent = lettersGuessed;

const animals = ["beaver", "bear", "alligator", "moose", "butterfly", "armadillo",
    "titmouse", "wolf", "monster", "caribou", "hummingbird", "ferret"];

const animalImages = [
    "assets/images/beaver.jpg",
    "assets/images/bear.jpg",
    "assets/images/alligator.jpg",
    "assets/images/moose.jpg",
    "assets/images/butterfly.jpg",
    "assets/images/armadillo.jpg",
    "assets/images/titmouse.jpg",
    "assets/images/wolf.jpg",
    "assets/images/monster.jpg",
    "assets/images/caribou.jpg",
    "assets/images/hummingbird.jpg",
    "assets/images/ferret.jpg"
];

const animalNames = [
    "The American Beaver",
    "The Brown Bear",
    "The American Alligator",
    "The American Moose",
    "The Monarch Butterfly",
    "The Nine-Banded Armadillo",
    "The Tufted Titmouse",
    "The Arctic Wolf",
    "The Gila Monster",
    "The Caribou",
    "The Ruby-Throated Hummingbird",
    "The Black-Footed Ferret"
];

var restart = true;
var animal = "";
const factor = 2; // Number of guesses allowed = factor * number of letters in the word
var numberGuessed = 0;

// Find indices of `letter` in `word`
function ind(letter, word) {
    var indices = [];

    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            indices.push(i);
        }
    }
    return indices;
}

// Replace `letter` at `indices` in `word` leaving the spaces unchanged. Eg. "_ _ _" -> "_ a _"
function repl(letter, indices, word) {
    for (let i = 0; i < indices.length; i++) {
        var ind = indices[i] * 2;
        word = word.substr(0, ind) + letter + word.substr(ind + 1);
    }
    return word;
}

document.onkeydown = function (event) {
    var userLetter = event.key.toLowerCase();

    if (restart) {
        getStarted = "";
        animal = animals[Math.floor(Math.random() * animals.length)];

        // Initiate the word as eg. "_ _ _ _ _"
        currentWord = "_ ".repeat(animal.length - 1) + "_";

        numberRemaining = parseInt(factor * animal.length);
        lettersGuessed = "";
        numberGuessed = 0;

        document.getElementById("animal-image").style = "display: none";
        document.getElementById("animal-name").textContent = "";

        restart = false;

    } else {
        // If the letter has not already been guessed
        if (lettersGuessed.indexOf(userLetter) === -1) {

            // Find positions of the letter in the word
            var indices = ind(userLetter, animal);

            // If there is/are the letter in the word
            if (indices.length > 0) {

                // Update the word with the letter
                currentWord = repl(userLetter, indices, currentWord);

                numberRemaining--;
                numberGuessed += indices.length;
                lettersGuessed += userLetter + ", ";

            } else { // Otherwise loosing a guess
                numberRemaining--;

            }
        }

        // Condition for wining
        if (numberGuessed === animal.length) {
            getStarted = message;
            wins++;

            document.getElementById("animal-image").src = animalImages[animals.indexOf(animal)];
            document.getElementById("animal-image").style = "display: initial";
            document.getElementById("animal-name").textContent = animalNames[animals.indexOf(animal)];

            restart = true;

        } else { // Otherwise check if condition for loosing
            if (numberRemaining === 0) {
                getStarted = message;
                losses++;

                restart = true;
            }
        }
    }

    document.getElementById("get-started").textContent = getStarted;
    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("current-word").textContent = currentWord;
    document.getElementById("number-remaining").textContent = numberRemaining;
    document.getElementById("letters-guessed").textContent = lettersGuessed;
}