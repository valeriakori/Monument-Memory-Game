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

var deck = document.querySelector(".deck"); //ul that holds all cards (li-elements)
var card = document.querySelectorAll(".card"); //li that holds card (img-elements)


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
    card[i].children.item(0).setAttribute('src', cards[i].img); //Assigns img-path to img tag
    card[i].setAttribute('data-card-value', cards[i].dataValue); //Assigns data-card-value to li
  }


var arrayOfSelectedCards = [];

//Turning card over
deck.addEventListener("click", function openCard(e){
    e.preventDefault();
    e.target.className += " open";
    setTimeout(function() {
        e.target.className += " show selected"; 

        var cardVal = e.target.getAttribute("data-card-value"); //Fetch data-card-value of selected card
        
        //console.log(cardVal);
        arrayOfSelectedCards.push(cardVal);
        console.log(arrayOfSelectedCards);
        
            if(arrayOfSelectedCards.length==2) {
           
            console.log("2 cards selected and they are", arrayOfSelectedCards);

                if(arrayOfSelectedCards[0]==arrayOfSelectedCards[1]) {
                    console.log("its a match");
                    arrayOfSelectedCards=[];
                } else {
                    console.log("not a match");
                    arrayOfSelectedCards=[];
                    //document.querySelectorAll(".selected").classList.remove(open, show, selected);
                    var selCards = document.querySelectorAll(".selected");
                    console.log(selCards);

                }
        }

    },
        300); //Displays class show with a little delay

});

//Fires after openCard ran; Check data-value-card
// function checkMatch(){
//     if(document.getElementsByClassName("selected").length==2) {
//         var cardVal1 = document.querySelector(".selected img").getAttribute("src"); //data-card-value of first card
//         var cardVal2 = document.querySelector(".selected:nth-child(2) img").getAttribute("src"); //data-card-value of second card
//         console.log(cardVal1, cardVal2);
//          if (cardVal1==cardVal2) {
//              console.log("its a match");
//         } else {
//             console.log("they dont match");
//         }
//     }
// }



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
