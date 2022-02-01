/**
 * 2C = Two of Clubs (treboles)
 * 2D = Two of Diamonds (diamantes)
 * 2H = Two of Hearts (corazones)
 * 2S = Two of Spades (picas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['J', 'Q', 'K', 'A'];

//crear el mazo
const crearDeck = () => {

    for(let i = 2; i <= 10; i++) {
        for(let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for(let tipo of tipos) {
        for(let esp of especiales){
            deck.push(esp + tipo)
        }
    }
    //console.log(deck);

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}
crearDeck();

//pedir carta
const pedirCarta = () => {
    if(deck.length > 0) {
        return deck.pop();
    }else{
        throw new Error('No hay cartas en el mazo');
    }
}
pedirCarta();