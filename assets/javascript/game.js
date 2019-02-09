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
        currentWord = "_ ".repeat(animal.length - 1) + "_"; // Eg. "_ _ _ _ _"
        numberRemaining = parseInt(factor * animal.length);
        lettersGuessed = "";
        numberGuessed = 0;

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