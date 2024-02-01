//Método GET para obtener datos de las reservas desde el servidor
async function getBookings() {
    // Realizar una solicitud GET al servidor en la ruta
    const result = await fetch("http://localhost:3000/bookings")
    // Esperar a que la respuesta de la solicitud sea recibida y convertirla en formato JSON
    const data = await result.json()
    // Devolver los datos obtenidos
    return data
}

// Obtenemos la etiqueta de la sección donde se mostrarán las reservas
let sectionTag = document.getElementById("booking-list")
// Función asíncrona para imprimir las reservas en la página
async function printBookings() {
    // Obtenemos las reservas mediante el método getBookings
    let bookings = await getBookings()
    bookings.map(booking => {
        sectionTag.innerHTML +=
        `<h3>${booking.name}</h3>
        <p>${booking.phone}</p>
        <p>${booking.checkin}</p>
        <p>${booking.checkout}</p>
        <p>${booking.guests}</p>
        <button onclick="cancelBooking('${booking.id}')">Delete</button>`
    })
}

//Método DELETE para cancelar una reserva
async function cancelBooking(id){
    // Realizamos una solicitud DELETE al servidor para cancelar la reserva con el ID proporcionado
    const result = await fetch(`http://localhost:3000/bookings/${id}`,
    {
        method: "DELETE"
    });
    return result
}

//Método POST para agregar una reserva
async function postBooking() {
    // Crear una reserva vacía
    const newBooking = {
    }
    // Configuramos las opciones para la solicitud POST
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
    };

    const result = await fetch(`http://localhost:3000/bookings`, options)
    return result
}

//Método POST 
async function addBooking() {
    const formBooking = document.getElementById("booking-form");

    const newBooking = {
        "name": formBooking.elements[0].value,
        "phone": formBooking.elements[1].value,
        "checkin": formBooking.elements[2].value,
        "checkout": formBooking.elements[3].value,
        "guests": formBooking.elements[4].value,
    };

    const result = await fetch(`http://localhost:3000/bookings`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(newBooking),
    } )
}

// Método PUT para actualizar una reserva

