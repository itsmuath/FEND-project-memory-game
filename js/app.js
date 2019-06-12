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
    if (currentCard.innerHTML === previousCard.innerHTML) { // If the cards match:
        // Add the matching card style to them and leave them open
        previousCard.classList.add("match");
        currentCard.classList.add("match");

        // Increment the counter of matched cards to end the game when all cards are open
        matchedCount += 2;

        // Call endGame to end the game if all cards are open
        endGame();

    } else { // If the two cards don't match:
        setTimeout(function () { // Flip the cards back after 500 milliseconds
            previousCard.classList.remove("open", "show", "disable");
            currentCard.classList.remove("open", "show", "disable");

        }, 500);
    }

    // Call a function that increments the number of moves shown to the user
    incrementMoves();
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

// Initialize the move counter
let moves = 0;

function incrementMoves() {
    const movesContainer = document.querySelector(".moves");
    // document.querySelector(".moves").innerHTML ++;
    moves++;
    movesContainer.innerHTML = moves;
}

/*
 * Check if all cards are open, then show a congrats message
 */
function endGame() {
    if (matchedCount === allCards.length)
        setTimeout(function () {
            alert("Congratulations! You solved the game 😃");
        }, 200)
}

/*
 * Restart the game
 */
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function () {
    // Erase all cards
    cardsContainer.innerHTML = "";

    // Reset any related values
    matchedCount = 0;
    moves = 0;
    document.querySelector(".moves").innerHTML = 0;
    // reset the clickedCards list to be used for the new game
    clickedCards = [];

    // Create the cards again and start the game
    init();
})