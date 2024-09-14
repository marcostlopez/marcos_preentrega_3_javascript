// canchas
const canchas = [
    { id: 1, nombre: "Cancha 1", superficie: "sintetico", horario: "20:00" },
    { id: 2, nombre: "Cancha 2", superficie: "madera", horario: "21:00" },
    { id: 3, nombre: "Cancha 3", superficie: "cemento", horario: "22:00" }
];


function renderizarCanchas() {
    const canchasList = document.getElementById('canchas-list');
    canchasList.innerHTML = '';

    canchas.forEach(cancha => {
        const canchaElement = document.createElement('li');
        canchaElement.className = 'cancha';
        canchaElement.innerHTML = `
            <h2>${cancha.nombre}</h2>
            <p>${cancha.superficie}</p>
            <p>Horario: ${cancha.horario}</p>
            <button class="botonReservar" data-id="${cancha.id}">Reservar</button>
        `;
        canchasList.appendChild(canchaElement);
    });
}

//datos para reserva
function renderizarReservas() {
    const reservasList = document.getElementById('reservas-list');
    reservasList.innerHTML = '';

    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.forEach(cancha => {
        const reservaElement = document.createElement('li');
        reservaElement.className = 'cancha';
        reservaElement.innerHTML = `
            <h2>${cancha.nombre}</h2>
            <p>superficie: ${cancha.superficie}</p>
            <p>Horario: ${cancha.horario}</p>
            <button class="botonCancelar" data-id="${cancha.id}">Cancelar Reserva</button>
        `;
        reservasList.appendChild(reservaElement);
    });
}

// hacer reserva
function hacerReserva(event) {
    if (event.target.classList.contains('botonReservar')) {
        const idCancha = event.target.getAttribute('data-id');
        const canchaReservada = canchas.find(cancha => cancha.id == idCancha);
        
        if (canchaReservada) {
            const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            reservas.push(canchaReservada);
            localStorage.setItem('reservas', JSON.stringify(reservas));
            alert(`¡Cancha ${canchaReservada.nombre} reservada exitosamente!`);
            renderizarReservas();
        }
    }
}

// quitar reserva
function cancelarReserva(event) {
    if (event.target.classList.contains('botonCancelar')) {
        const idCancha = event.target.getAttribute('data-id');
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        
        reservas = reservas.filter(cancha => cancha.id != idCancha);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        alert(`¡Reserva de cancha ${idCancha} cancelada exitosamente!`);
        renderizarReservas();
    }
}

function init() {
    renderizarCanchas();
    renderizarReservas();
    document.getElementById('canchas-list').addEventListener('click', hacerReserva);
    document.getElementById('reservas-list').addEventListener('click', cancelarReserva);
}

window.onload = init;
