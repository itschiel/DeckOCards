const soorten = ["Spades", "Hearts", "Clubs", "Diamonds"];
const waarden = [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"];

class Deck {
    constructor(){
        this.Deck = [];
    }

    fill(){
        this.clear();

        soorten.forEach(soort => {
            waarden.forEach(waarde => {
                this.Deck.push(new Card(soort, waarde));
            });
        });
    }

    clear(){
        this.Deck = [];
    }

    add(card){
        if(!(card instanceof Card)){return;}
        this.Deck.push(card);
    }

    draw(otherDeck){
        otherDeck.add(this.Deck.pop());
    }

    shuffle(){
        var m = this.Deck.length, t, i;

        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = this.Deck[m];
            this.Deck[m] = this.Deck[i];
            this.Deck[i] = t;
        }
    }
}

class Card {
    constructor(soort, waarde){
        this.soort = soort;
        this.waarde = waarde;
    }

    isHigher(card){
        var thisIndex = waarden.indexOf(this.waarde);
        var thatIndex = waarden.indexOf(card.waarde);

        if (thatIndex > thisIndex || thatIndex == thisIndex){
            return true;
        }

        return false;
    }

    isLower(card){
        var thisIndex = waarden.indexOf(this.waarde);
        var thatIndex = waarden.indexOf(card.waarde);

        if (thatIndex < thisIndex || thatIndex == thisIndex){
            return true;
        }

        return false;
    }
}


// variables

let deck1 = new Deck();
let deck2 = new Deck();
let mainDeck = document.getElementsByClassName("deck")[0];
let seccondDeck = document.getElementsByClassName("deck")[1];
let counter = document.querySelector(".counter");
let faceUp = false;

// fucntions

function update(deck, div){
    if (!deck.Deck.length){
        div.style.backgroundImage = "";
        return;
    }

    var card = deck.Deck[deck.Deck.length - 1].waarde + deck.Deck[deck.Deck.length - 1].soort[0];
    div.style.backgroundImage = "url('cardFaces/" + card + ".svg')";
    counter.innerHTML = deck1.Deck.length;

    if (!faceUp){
        mainDeck.style.backgroundImage = "url('cardFaces/2B.svg')";
    }
}

function setupGame(){
    deck1.fill();
    update(deck1, mainDeck);
}

function resetGame(){
    deck1.clear();
    deck2.clear();
    
    deck1.fill();

    update(deck1, mainDeck);
    update(deck2, seccondDeck);
}


// gameManager

setupGame();




// listeners

document.querySelector("#pick").addEventListener("click", () => {
    deck1.draw(deck2)
    update(deck1, mainDeck);
    update(deck2, seccondDeck);
});

document.querySelector("#put").addEventListener("click", () => {
    let card = deck2.Deck.pop();
    deck1.add(card);
    update(deck1, mainDeck);
    update(deck2, seccondDeck);
});

document.querySelector("#reset").addEventListener("click", resetGame);

document.querySelector("#shuffle").addEventListener("click", () => {
    deck1.shuffle();
    update(deck1, mainDeck);
});

document.querySelector("#switch").addEventListener("click", () => {
    faceUp = !faceUp;
    console.log(faceUp);
    update(deck1, mainDeck);
});

document.querySelector("#higher").addEventListener("click", () => {
    deck1.draw(deck2)
    
    layingCard = deck2.Deck[deck2.Deck.length - 2];
    newCard = deck2.Deck[deck2.Deck.length - 1];
    var playField = document.querySelector(".playField");

    if(layingCard.isHigher(newCard)){
        playField.style.backgroundColor = "green";
    }

    if(!(layingCard.isHigher(newCard))){
        playField.style.backgroundColor = "red";
    }


    update(deck1, mainDeck);
    update(deck2, seccondDeck);
});

document.querySelector("#lower").addEventListener("click", () => {
    deck1.draw(deck2)
    
    layingCard = deck2.Deck[deck2.Deck.length - 2];
    newCard = deck2.Deck[deck2.Deck.length - 1];
    var playField = document.querySelector(".playField");

    if(layingCard.isLower(newCard)){
        playField.style.backgroundColor = "green";
    }

    if(!(layingCard.isLower(newCard))){
        playField.style.backgroundColor = "red";
    }

    update(deck1, mainDeck);
    update(deck2, seccondDeck);
});