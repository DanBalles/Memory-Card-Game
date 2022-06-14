const cards = document.querySelectorAll('.card');

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;// prevent user from clicking on other cards before first two cards unflip

const flipCard = (e) => {
    let clickedCard = e.target; // getting user clicked card
    if(clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add('flip');
        if(!cardOne) {
            // return the cardOne to clikedCard
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector('img').src;
        let cardTwoImg = cardTwo.querySelector('img').src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

const matchCards = (img1, img2) => {
    if(img1 === img2) {//if two cards img matched
        matchedCard++;//increment matched value by 1
        // if matched value is 8 game is over
        if(matchedCard == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);// calling suffleCard func after 1s
        }
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';//setting card value to blank
        return disableDeck = false;
    }
    // if two card not matched
    setTimeout(() => {
        // adding shake class to both after 400ms
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
    }, 400);

    setTimeout(() => {
        // removing both shake & flip classes from both card after 1200ms
        cardOne.classList.remove('shake', 'flip');
        cardTwo.classList.remove('shake', 'flip');
        cardOne = cardTwo = '';//setting card value to blank
        disableDeck = false;
    }, 1200);
}

const shuffleCard = () => {
    matchedCard = 0;
    cardOne = cardTwo = '';
    disableDeck = false;
    //creating an array of 16 items where each intem is repeated one
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1: -1);//sorting arr randomly

    //removing flip class from all cards and passing random image to each card
    cards.forEach((card, index)=> {
        card.classList.remove('flip');
        let imgTag = card.querySelector('img');
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener('click', flipCard)
    })
}

shuffleCard();

cards.forEach(card => {// adding click event to all cards
    card.addEventListener('click', flipCard)
})

