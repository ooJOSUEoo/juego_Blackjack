(() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['J', 'Q', 'K', 'A'];

    let puntosJugadores = [0, 0];

    //referencia del html
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJuagdor = document.querySelector('#jugador-cartas'),
        divCartasComputadora = document.querySelector('#computadora-cartas'),
        puntosHtml = document.querySelectorAll('small');

    // inicializar el juego
    const inizializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
    }

    //crear el mazo
    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        }
        return _.shuffle(deck);
    }

    //pedir carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw new Error('No hay cartas en el mazo');
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1;
    }

    const acumularPuntos = () => {



    }

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora += valorCarta(carta);
            puntosHtml[1].innerHTML = puntosComputadora;

            //<img class="carta" src="assets/cartas/2H.png" alt="">
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);
            if (puntosJugador > 21) {
                break;
            }
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana')
            }
        }, 10)
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

        if (puntosJugador > 21) {
            console.log('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador == 21) {
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

    btnNuevo.addEventListener('click', () => {
        console.clear();
        // deck = [];
        // deck = crearDeck();
        inizializarJuego();
        divCartasJuagdor.innerHTML = '';
        divCartasComputadora.innerHTML = '';
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHtml[0].innerHTML = puntosJugador;
        puntosHtml[1].innerHTML = puntosComputadora;
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    })

})();