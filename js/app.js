/*
 * Create a list that holds all of your cards
 */
const allCards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]

// Specify the container of all cards
const cardsContainer = document.querySelector(".deck");

// Create cards
for (let i = 0; i < allCards.length; i++) {
    const card = document.createElement("li");
    cardsContainer.appendChild(card);
    card.classList.add("card");
    card.innerHTML = `<i class="${allCards[i]}"></i>`;

    // Add event listeners for clicking on the cards
    card.addEventListener("click", function () {

                    // Assign cards to variables for readability
                    const currentCard = this;
                    const previousCard = ClickedCards[0];

        // Check the number of clicked cards (for match checking and flipping cards back, etc)
        if (ClickedCards.length === 1) { // If a single card has been clicked already

            // Flip the card
            card.classList.add("open", "show")

        } else { // If no card has been clicked yet, simply flip the current card
            currentCard.classList.add("open", "show")
        }
    });
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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