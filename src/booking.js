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
        <button onclick="cancelBooking('${booking.id}')">Delete</button>
        <button onclick="updateForm('${booking.id}','${booking.name}', '${booking.phone}','${booking.checkin}','${booking.checkout}','${booking.guests}')">Modify</button>`
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

//Método POST para agregar una reserva con datos del formulario
async function addBooking() {
    // Obtenemos el formulario de reserva del DOM
    const formBooking = document.getElementById("booking-form");
    // Creamos un objeto con los datos del formulario para la nueva reserva
    const newBooking = {
        "name": formBooking.elements[0].value, // Obtenemos el valor de cada campo
        "phone": formBooking.elements[1].value, 
        "checkin": formBooking.elements[2].value,
        "checkout": formBooking.elements[3].value,
        "guests": formBooking.elements[4].value,
    };
    // Configuramos las opciones para la solicitud POST
    const result = await fetch(`http://localhost:3000/bookings`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(newBooking),
    } )
}

// Método PUT para actualizar una reserva
async function modifyBooking(id){
    const updatingBooking = document.getElementById("booking-form-update");
    const updateBooking = {
        "name": updatingBooking.elements[0].value, // Obtenemos el valor de cada campo
        "phone": updatingBooking.elements[1].value, 
        "checkin": updatingBooking.elements[2].value,
        "checkout": updatingBooking.elements[3].value,
        "guests": updatingBooking.elements[4].value,
    };
    // Realizamos una solicitud PUT al servidor para modificar la reserva con el ID proporcionado
    const result = await fetch(`http://localhost:3000/bookings/${id}`,
    {
        method: "PUT",
        headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(updateBooking),
    });

    return result
}

function updateForm(id, name, phone, checkin, checkout, guests){
    const formUpdateBooking = document.getElementById("update-form");

    formUpdateBooking.innerHTML = 
    `<form id="booking-form-update" class="form-fields">
    <label for="update-new-name">Name</label><input value="${name}" type="text" id="update-name" class="field" placeholder=>
    <label for="update-new-phone">Phone</label><input value="${phone}" type="tel" id="update-phone" class="field">
    <label for="update-check-in">Check-In date</label><input value="${checkin}" type="date" id="update-check-in" class="field">
    <label for="update-check-out">Check-Out date</label><input value="${checkout}" type="date" id="update-check-out" class="field">
    <label for="update-number-of-guests">Nº Guests</label><input value="${guests}" type="number" id="update-number-of-guests" class="field">
    <button type="submit" class="button-booking" onclick="modifyBooking('${id}')">Modify</button>
</form>`
}