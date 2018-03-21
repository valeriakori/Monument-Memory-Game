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

var moves = document.getElementsByClassName("moves");
var numberOfMoves = 0; //Initial value of moves

var restart = document.getElementsByClassName("restart");

var stars = document.getElementsByClassName("stars");

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

/******************************************* 
** Selector of modal and respective spans **
********************************************/

var modalDisplay = document.getElementsByClassName("modal-bg");
var starModal = document.getElementsByClassName("stars-modal");
var timeModal = document.getElementsByClassName("time-modal");


/****************************************************
** Functions that initialize values and start game **
*****************************************************/

(function gameInit(){
    moves.innerText = numberOfMoves;
    console.log(moves.innerText);
})();

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


//restart.addEventListener("click", gameInit);

//Append values from array to ul
for (i = 0 ; i < card.length; i++) {
    card[i].children.item(0).setAttribute("src", cards[i].img); //Assigns img-path to img tag
    card[i].setAttribute("data-card-value", cards[i].dataValue); //Assigns data-card-value to li
  }

//Turning card over
deck.addEventListener("click", function openCard(e){

    e.preventDefault();
    startTimer(); //Starts timer 

    if (e.target.hasAttribute("data-card-value")) {

        e.target.className += " open"; //Adds flip animation to selected card

        setTimeout(function() {

            e.target.className += " show selected"; //Shows image of selected card and adds helping class of selected
            
            //Fetching data-card-value of selected card 
            var cardVal = e.target.getAttribute("data-card-value"); 
            arrayOfSelectedCards.push(cardVal); 

            if (cardCounter == 0) {
                selectedCardOne = e.target;
                cardCounter++;
            } else if (cardCounter==1) {
                selectedCardTwo = e.target;
            }

            //Comparing Elements of arrayOfSelectedCards
            if (arrayOfSelectedCards.length == 2) {
            
                changeScore(); //Calls addMove function to add 1 to the # of moves

                if (arrayOfSelectedCards[0]==arrayOfSelectedCards[1]) {

                    //Animate Selected Cards
                    selectedCardOne.className += " animated tada";
                    selectedCardTwo.className += " animated tada";

                    //Reset of Array and cardCounter
                    arrayOfSelectedCards=[];
                    cardCounter = 0;

                } 
                else {  

                    //Animate Selected Cards
                    selectedCardOne.className += " animated wobble";
                    selectedCardTwo.className += " animated wobble";

                    setTimeout(function(){

                        //Add flip animation
                        selectedCardOne.classList.remove("open");
                        selectedCardTwo.classList.remove("open");

                        selectedCardOne.classList.add("open");
                        selectedCardTwo.classList.add("open");

                        setTimeout(function(){

                            //Remove all unnessecary classes to reset cards for further moves
                            selectedCardOne.classList.remove("open", "show", "selected", "animated", "wobble");
                            selectedCardTwo.classList.remove("open", "show", "selected", "animated", "wobble");
                            
                            //Reset of Array and cardCounter
                            arrayOfSelectedCards=[];
                            cardCounter = 0;

                        },300)

                    },800);

                }
            }

            if (document.getElementsByClassName("selected").length == 16) {
                showModal();
            }

        },300); //Displays class show with a little delay
    }
});

function changeScore() {

    numberOfMoves++;
    moves.innerHTML = numberOfMoves;
    console.log(moves.innerHTML);


    if (numberOfMoves == 12) {
        //remove one star
    } else if (numberOfMoves == 16) {
        //remove second star
    }
}

// Closure Function from https://stackoverflow.com/questions/12713564/function-in-javascript-that-can-be-called-only-once
// Closure makes it that the function setTime(); can only be called once
// Timer Functions from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript

var startTimer = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            setInterval(setTime, 1000);
            function setTime() {
                ++totalSeconds;
                secondsLabel.innerHTML = pad(totalSeconds % 60);
                minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
              }
              
              function pad(val) {
                var valString = val + "";
                if (valString.length < 2) {
                  return "0" + valString;
                } else {
                  return valString;
                }
              }
        }
    };
})();



function showModal() {
}
