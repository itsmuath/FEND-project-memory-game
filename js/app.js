// Create a list that holds all the cards
const allCards = ["fa fa-diamond", "fa fa-diamond",
    "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor",
    "fa fa-bolt", "fa fa-bolt",
    "fa fa-cube", "fa fa-cube",
    "fa fa-leaf", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bicycle",
    "fa fa-bomb", "fa fa-bomb"
]

// Specify the container of all cards
const cardsContainer = document.querySelector(".deck");

// Create an empty list to store cards for checking later
let clickedCards = [];

// Initialize a counter for the number of matched cards
let matchedCount = 0;

// Start the game
init();

/*
 * Create and match cards
 */
function init() {

    // Start the game by shuffling all cards
    shuffle(allCards);

    for (let i = 0; i < allCards.length; i++) { // Create the cards one by one
        const card = document.createElement("li");
        cardsContainer.appendChild(card);
        card.classList.add("card");
        card.innerHTML = `<i class="${allCards[i]}"></i>`;

        // Call a method that opens cards and compares them to each others
        viewCard(card);
    }
    // Start the timer
    setTimer();
}

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function viewCard(card) {

    // Add event listeners for clicking on the cards
    card.addEventListener("click", function () {

        // Assign cards to variables for readability
        const currentCard = this;
        const previousCard = clickedCards[0];

        // Flip the card and prevent clicking on it
        currentCard.classList.add("open", "show", "disable");

        // Check the number of clicked cards (for match checking and flipping cards back, etc)
        if (clickedCards.length === 1) { // If a single card has been clicked already


            // Compare both opened cards to check if they match
            compare(currentCard, previousCard);

            // reset the clickedCards list to be used for next matchings
            clickedCards = [];
        } else { // Just add the card if there's no previous card
            clickedCards.push(currentCard);
        }
    });
}

function compare(currentCard, previousCard) {
    // Call a function that increments the number of moves shown to the user
    incrementMoves();
    // Call a function to compute the star rating
    computeRating(moves);

    // Call endGame to end the game if all cards are open
    if (currentCard.innerHTML === previousCard.innerHTML) { // If the cards match:
        // Add the matching card style to them and leave them open
        previousCard.classList.add("match");
        currentCard.classList.add("match");

        // Increment the counter of matched cards to end the game when all cards are open
        matchedCount += 2;

        if (matchedCount === allCards.length)
            endGame();

    } else { // If the two cards don't match:
        setTimeout(function () { // Flip the cards back after 500 milliseconds
            previousCard.classList.remove("open", "show", "disable");
            currentCard.classList.remove("open", "show", "disable");

        }, 500);
    }
}

// Initialize the move counter
let moves = 0;

function incrementMoves() {
    const movesContainer = document.querySelector(".moves");
    // document.querySelector(".moves").innerHTML ++;
    moves++;
    movesContainer.innerHTML = moves;
}

let seconds = 0;

function setTimer() {
    timer = setInterval(function () {

        const timeContainer = document.querySelector(".seconds");
        seconds++;
        timeContainer.innerHTML = seconds;
    }, 1000);
}

/*
 * Restart the game if any restart button is clicked
 */
$(document).on('click', '.restart', function () {
    // Erase all cards
    cardsContainer.innerHTML = "";

    // Reset moves counter
    matchedCount = 0;
    moves = document.querySelector(".moves").innerHTML = 0;
    // Reset timer
    clearInterval(timer);
    seconds = document.querySelector(".seconds").innerHTML = 0;
    // reset the clickedCards list to be used for the new game
    clickedCards = [];

    resetRating();

    // Create the cards again and start the game
    init();
});

// Set the star rating to the initial state (3 stars)
stars = document.querySelector("ul.stars");

function resetRating() {
    stars.innerHTML = '<li><i class="fa fa-star"></i></li>' +
        '<li><i class="fa fa-star"></i></li>' +
        '<li><i class="fa fa-star"></i></li>';
}

let rating = 3;

// Calculate the star rating based on the number of moves
function computeRating(moves) {
    if (moves == 10) {
        stars.removeChild(stars.children[0]);
        rating = 2;
    } else if (moves == 15) {
        stars.removeChild(stars.children[0]);
        rating = 1;
    } else if (moves == 20) {
        stars.removeChild(stars.children[0]);
        rating = 0;
    }
}

/*
 * Stop the game and show a congrats message
 */
function endGame() {
    // Stop the timer
    clearInterval(timer);
    // Prepare results to be shown in the modal
    document.getElementById("timeResult").innerHTML = seconds;
    document.getElementById("moveResult").innerHTML = moves;
    document.getElementById("ratingResult").innerHTML = rating;

    setTimeout(function () {
        $('#myModal').modal('show');
    }, 200);
}