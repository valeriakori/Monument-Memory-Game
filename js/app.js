// Array that holds all image-paths and data-*

cards = 
[
    {
        dataValue:1,
        img:"img/beach.png"
    },
    {
        dataValue:1,
        img:"img/beach.png"
    },
    {
        dataValue:2,
        img:"img/bigben.png"
    },
    {
        dataValue:2,
        img:"img/bigben.png"
    },
    {
        dataValue:3,
        img:"img/eiffel.png"
    },
    {
        dataValue:3,
        img:"img/eiffel.png"
    },
    {
        dataValue:4,
        img:"img/liberty.png"
    },
    {
        dataValue:4,
        img:"img/liberty.png"
    },
    {
        dataValue:5,
        img:"img/mosque.png"
    },
    {
        dataValue:5,
        img:"img/mosque.png"
    },
    {
        dataValue:6,
        img:"img/opera.png"
    },
    {
        dataValue:6,
        img:"img/opera.png"
    },
    {
        dataValue:7,
        img:"img/pisa.png"
    },
    {
        dataValue:7,
        img:"img/pisa.png"
    },
    {
        dataValue:8,
        img:"img/temple.png"
    },
    {
        dataValue:8,
        img:"img/temple.png"
    }
]

/******************************* 
** Selector of deck and cards **
********************************/

var deck = document.querySelector(".deck"); //ul that holds all cards (li-elements)
var card = document.querySelectorAll(".card"); //li that holds card (img-elements)
let cardArray = [...card];


/***************************************************
** Helping variables to declare and compare Cards **
****************************************************/

var arrayOfSelectedCards = []; //Array that will hold data-card-value of selected cards in order to compare them
var cardCounter = 0; //Click counter, 1 after first selected card, resets to 0 after second selected card
var selectedCardOne = ""; //First selected card, will be declared after click on one card
var selectedCardTwo = ""; //Second selected card, will be declared after click on another card

/************************************* 
** Selector of icons in score panel **
**************************************/

var moves = document.querySelector(".moves");
var numberOfMoves = 0; //Initial value of moves

var restart = document.querySelector(".restart");

var stars = document.getElementById("stars");
var starsReset = 
`<li>
    <i class="fa fa-star"></i>
</li>
<li>
    <i class="fa fa-star"></i>
</li>
<li>
    <i class="fa fa-star"></i>
</li>
`

//var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.querySelector(".seconds");
var totalSeconds = 0;
var interval;

/******************************************* 
** Selector of modal and respective spans **
********************************************/

var modalDisplay = document.querySelector(".modal-bg");
var starModal = document.querySelector(".stars-modal");
var minModal = document.querySelector(".minutes-modal");
var secModal = document.querySelector(".seconds-modal");
var movesModal = document.querySelector(".moves-modal");
var restartModal = document.querySelector(".restart-modal");


/****************************************************
** Functions that initialize board and start game **
*****************************************************/

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
shuffle(cards);

//Append values from array to ul
for (i = 0 ; i < card.length; i++) {
    card[i].children.item(0).setAttribute("src", cards[i].img); //Assigns img-path to img tag
    card[i].setAttribute("data-card-value", cards[i].dataValue); //Assigns data-card-value to li
  }

//Turning card over
deck.addEventListener("click", function openCard(e){

    e.preventDefault();

    // && !e.target.classList("open", "show", "selected") to differentiate
    if (e.target.hasAttribute("data-card-value")) {

        e.target.className += " open"; //Adds flip animation to selected card

        setTimeout(function() { //Displays class show with a delay of ~.3 sec; Ends on line 229

            e.target.className += " show selected"; //Shows image of selected card and adds helping class of selected
            
            //Fetching data-card-value of selected card 
            var cardVal = e.target.getAttribute("data-card-value"); 
            arrayOfSelectedCards.push(cardVal); 

            if (cardCounter == 0) {
                selectedCardOne = e.target;
                cardCounter++;
                changeScore(); //Calls addMove function to add 1 to the # of moves

            } else if (cardCounter==1) {
                selectedCardTwo = e.target;
            }

            //Comparing Elements of arrayOfSelectedCards
            if (arrayOfSelectedCards.length == 2) {

                //Remove "clickability", i. e. you can't click an card while nomatch animation is run to prevent errors on game board
                //for duration of animation, gets readded after animation
                for ( var x = 0; x < cardArray.length; x++) {cardArray[x].style.pointerEvents = "none";};
                
                if (arrayOfSelectedCards[0]==arrayOfSelectedCards[1]) {

                    //Animate Selected Cards
                    selectedCardOne.className += " animated tada matched";
                    selectedCardTwo.className += " animated tada matched";

                    //Reset of Array and cardCounter
                    arrayOfSelectedCards=[];
                    cardCounter = 0;

                    selectedCardOne = "";
                    selectedCardTwo = "";
                    //Add "clickability" again
                    for ( var x = 0; x < cardArray.length; x++) {cardArray[x].style.pointerEvents = "";};

                } else {  

                    //Animate Selected Cards
                    selectedCardOne.className += " animated wobble";
                    selectedCardTwo.className += " animated wobble";

                    setTimeout(function(){

                        //Remove classes of open, show, selected, animated and wobble
                        selectedCardOne.className = "card";
                        selectedCardTwo.className = "card";
                        
                        //Reset of Array and cardCounter
                        arrayOfSelectedCards=[];
                        cardCounter = 0;

                        selectedCardOne = "";
                        selectedCardTwo = "";

                        //Add "clickability" again
                        for ( var x = 0; x < cardArray.length; x++) {cardArray[x].style.pointerEvents = "";};

                    },500);

                }
            }

            if (document.getElementsByClassName("matched").length == 16) {
                setTimeout(function(){showModal();},600)
            }

        },300); 
    }
});

//Increases the amount of moves after each check
//Removes li/star after set amount of moves
function changeScore() {

    numberOfMoves++;
    moves.innerText = numberOfMoves;

    if (numberOfMoves == 1) {
        startTimer();
    }
    else if (numberOfMoves == 12) {
        //remove first star
        document.querySelector('.fa-star:last-of-type').classList.remove('fa-star');
    } else if (numberOfMoves == 16) {
        //remove second star
        document.querySelector('.fa-star:last-of-type').classList.remove('fa-star');
    }
}

function startTimer(){
    interval = setInterval(function(){
        if (document.getElementsByClassName("matched").length < 16) {
            ++totalSeconds;
        } else if (document.getElementsByClassName("matched").length == 16) {
            clearInterval();
        }
        secondsLabel.innerHTML = totalSeconds;
    },1000);
}

function showModal() {
    modalDisplay.style.display = "flex";

    movesModal.innerText = numberOfMoves;
    starModal.innerHTML = stars.innerHTML;
    secModal.innerHTML = secondsLabel.innerHTML;
}

function closeModal() {
    modalDisplay.style.display = "none";
}

restart.addEventListener("click", restartGame);
restartModal.addEventListener("click", restartGame);

function restartGame(){
    // shuffle deck
    shuffle(cards);
    for (i = 0 ; i < card.length; i++) {
        card[i].children.item(0).setAttribute("src", cards[i].img); //Assigns img-path to img tag
        card[i].setAttribute("data-card-value", cards[i].dataValue); //Assigns data-card-value to li
      }

    // reset all helper variables
    arrayOfSelectedCards=[];
    selectedCardOne = "";
    selectedCardTwo = "";
    numberOfMoves = 0;
    cardCounter = 0;

    //reset score board
    moves.innerText = 0;    //reset moves
    stars.innerHTML = starsReset;   //reset star rating

    var secondsLabel = document.querySelector(".seconds");

    clearInterval(interval);    //reset timer
    totalSeconds = 0;
    secondsLabel.innerHTML = "00";  

    //close modal
    closeModal();
    
    //remove all possible classes a card may have
    for ( var x = 0; x < cardArray.length; x++) {
        cardArray[x].classList.remove("open", "show", "selected", "animated", "wobble", "tada", "matched");
    };  
}
