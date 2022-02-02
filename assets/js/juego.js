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

const divCartasJuagdor = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
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

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do{
        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta);
        puntosHtml[1].innerHTML = puntosComputadora;

        //<img class="carta" src="assets/cartas/2H.png" alt="">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if(puntosJugador > 21){
            break;
        }
    }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
}

//eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntosHtml[0].innerHTML = puntosJugador;
    console.log(puntosJugador);

    //<img class="carta" src="assets/cartas/2H.png" alt="">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    divCartasJuagdor.append(imgCarta);

    if(puntosJugador > 21){
        console.log('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if (puntosJugador == 21){
        console.log('Ganaste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})