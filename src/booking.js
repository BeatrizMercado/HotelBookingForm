//Método GET para obtener datos de las reservas desde el servidor
async function getBookings() {
    // Realizar una solicitud GET al servidor en la ruta
    const result = await fetch("http://localhost:3000/bookings")
    // Esperar a que la respuesta de la solicitud sea recibida y convertirla en formato JSON
    const data = await result.json()
    // Esperar a que la respuesta de la solicitud sea recibida y convertirla en formato JSON
    return data
}

let sectionTag = document.getElementById("booking-list")
async function printBookings() {
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

//Método DELETE 
async function cancelBooking(id){
    const result = await fetch(`http://localhost:3000/bookings/${id}`,
    {
        method: "DELETE"
    });
    return result
}

//Método POST 
async function postBooking() {
    const newBooking = {
    }

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
    const formBooking = document.getElementById("booking-form")

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
