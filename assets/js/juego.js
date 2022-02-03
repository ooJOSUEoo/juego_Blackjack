const miModulo = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['J', 'Q', 'K', 'A'];

    let puntosJugadores = [];

    //referencia del html
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHtml = document.querySelectorAll('small');

    // inicializar el juego
    const inizializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosHtml.forEach(elem => elem.innerText = 0);

        divCartasJugadores.forEach(elem => elem.innerHTML = '')

        btnPedir.disabled = false;
        btnDetener.disabled = false;
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

    //Turno: 0 = primer jugar y el ultimo la computadora
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] += valorCarta(carta);
        console.log(turno, puntosJugadores[turno]);
        puntosHtml[turno].innerHTML = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () =>{

        const [puntosMinimos,puntosComputadora] = puntosJugadores;

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

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();

            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

            crearCarta(carta, puntosJugadores.length - 1);
            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    //eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

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
        inizializarJuego();
    })

    return{
        nuevoJuego: inizializarJuego
    };
})();