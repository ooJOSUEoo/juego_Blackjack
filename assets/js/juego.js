/**
 * 2C = Two of Clubs (treboles)
 * 2D = Two of Diamonds (diamantes)
 * 2H = Two of Hearts (corazones)
 * 2S = Two of Spades (picas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['J', 'Q', 'K', 'A'];

let puntosJugador = 0,
    puntosComputadora = 0;

//referencia del html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const puntosHtml = document.querySelectorAll('small');

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
//pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
            (valor == 'A') ? 11 : 10 
            : valor*1;
    // console.log(valor);
    // if(isNaN(valor)){
    //     puntos = (valor === 'J' || valor === 'Q' || valor === 'K') ? 10 : 11;
    // } else{
    //     console.log('es numero');
    //     puntos = parseInt(valor);
    // }
}

//eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntosHtml[0].innerHTML = puntosJugador;
    console.log(puntosJugador);
})