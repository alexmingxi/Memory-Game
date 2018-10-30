/*
 * Create a list that holds all of your cards
 */

var cards = ["fa fa-diamond", "fa fa-diamond",
             "fa fa-paper-plane-o", "fa fa-paper-plane-o",
             "fa fa-anchor", "fa fa-anchor",
             "fa fa-bolt", "fa fa-bolt",
             "fa fa-cube", "fa fa-cube",
             "fa fa-leaf", "fa fa-leaf",
             "fa fa-bicycle", "fa fa-bicycle",
             "fa fa-bomb", "fa fa-bomb"
              ];
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

// add all cards information into HTML
var deck = document.querySelector('.deck');

function createCard(card) {
  for (let card of cards) {
    deck.innerHTML += `<li class="card"><i class= "${card}"></i></li>`}  
}

createCard(cards);




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


const allcards = document.querySelectorAll('.card');
const countNumber = document.querySelector('.moves');
var stars = document.getElementsByClassName('fa-star');
var modal = document.getElementById('myModal');
var content = document.getElementById('modal-content');


//the function used to check if two cards are matched
var openCard = [];
function ifMatch(a){
  if (openCard.length === 2) {
    if (openCard[0].innerHTML === openCard[1].innerHTML && openCard[0] !== openCard[1]) {
      openCard[0].classList.add('open', 'match');
      openCard[1].classList.add('open', 'match');
      
  }
    else {
      function reset() {
        openCard[0].classList.remove('open','show');
        openCard[1].classList.remove('open','show');
        openCard = [];
      }
      setTimeout(reset, 800);
    }
  }
}

//the function used to count the move number and remove the stars
var count = 0;
function counter (card) {
  if (card.className === 'card open show' && openCard[0] !== openCard[1]) {
    count += 1;
    countNumber.textContent = count;
    if (count === 25 || count === 37) {
      stars[0].removeAttribute("class");
    }
}}


//the function to restarted the game
function restart(){
  location.reload();
}


//the function used to check if the game finished, count the game time and pop up the modal information
let success = 0;
var t0 = Date.now();
var t1 = 0;
function finish(card) {
  if (card.className === 'card open show match' && openCard[0] !== openCard[1] ) {
    success += 1;
    openCard = [];
    if (success === 8) {
      t1 = Date.now();
      modal.style.display = "block";
      content.textContent = `Congratulation! You have complete this game! \n 
      You have spend ${millisToMinutesAndSeconds (t1 - t0)}. \n
      Your have got ${stars.length} stars.`
    }
  }
}



//the function used to convert the millisencond to minutes and seconds.
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}





//execute the functions, set every card is clickable, every click will push the card to array openCard, make sure it is unclickable after two cards in openCard, count the move time, check two cards in openCard if they are matched, and finally check if the player complete the game.
for (let card of allcards) {
  card.addEventListener('click', function() {
    openCard.push(card);
    if (openCard.length <= 2) {
      card.classList.add('open', 'show');
      counter(card); 
      ifMatch(card);
      finish(card);   
    }
  })
}



    

    


