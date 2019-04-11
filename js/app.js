// Create a list that holds all the cards
const allCards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]

// Specify the container of all cards
const cardsContainer = document.querySelector(".deck");

// Create an empty list to store cards for checking later
let ClickedCards = [];
let matchedCount = 0;

for (let i = 0; i < allCards.length; i++) { // Create the cards one by one
    const card = document.createElement("li");
    cardsContainer.appendChild(card);
    card.classList.add("card");
    card.innerHTML = `<i class="${allCards[i]}"></i>`;

    // Add event listeners for clicking on the cards
    card.addEventListener("click", function () {

        // Assign cards to variables for readability
        const currentCard = this;
        const previousCard = ClickedCards[0];

        // Flip the card
        currentCard.classList.add("open", "show");

        // Check the number of clicked cards (for match checking and flipping cards back, etc)
        if (ClickedCards.length === 1) { // If a single card has been clicked already


            if (currentCard.innerHTML === previousCard.innerHTML) { // If the cards match:
                // Add the matching card style to them and leave them open
                previousCard.classList.add("match");
                currentCard.classList.add("match");

                // Increment the counter of matched cards to end the game when all cards are open
                matchedCount += 2;

                // Call gameEnd to end the game if all cards are open
                gameEnd();

            } else { // If the two cards don't match:
                setTimeout(function () { // Flip the cards back after 500 milliseconds
                    previousCard.classList.remove("open", "show");
                    currentCard.classList.remove("open", "show");

                }, 500);
            }

            // reset the clickedCards list to be used for next matchings
            ClickedCards = [];
        } else {
            ClickedCards.push(currentCard);
        }
    });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Check if all cards are open, then show a congrats message
function gameEnd() {
    if (matchedCount === allCards.length)
        setTimeout(function () {
            alert("Congratulations! You solved the game");
        }, 200)
}





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */