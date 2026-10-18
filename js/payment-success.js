// Get booking ID from URL
const params = new URLSearchParams(window.location.search);
const bookingId = params.get("bookingId");

// Get booking from localStorage
const bookings = JSON.parse(
    localStorage.getItem("travelVistaBookings") || "[]"
);

// Find the booking
let booking = bookings.find(function (item) {
    return String(item.id) === String(bookingId);
});

// Fallback to sessionStorage
if (!booking) {
    const savedBooking = JSON.parse(
        sessionStorage.getItem("travelVistaCompletedBooking") || "null"
    );

    if (
        savedBooking &&
        String(savedBooking.id) === String(bookingId)
    ) {
        booking = savedBooking;
    }
}

// Display booking details
if (booking) {
    document.getElementById("bookingId").textContent =
        booking.id || "-";

    document.getElementById("customerName").textContent =
        booking.name || "-";

    document.getElementById("destination").textContent =
        booking.destination || "-";

    document.getElementById("place").textContent =
        booking.place || "-";

    document.getElementById("packageName").textContent =
        booking.packageName || "-";

    document.getElementById("travelDate").textContent =
        booking.travelDate || "-";

    document.getElementById("persons").textContent =
        booking.persons ?? "-";

    document.getElementById("transport").textContent =
        booking.transport || "-";

    document.getElementById("paymentMethod").textContent =
        booking.paymentMethod || "-";

    document.getElementById("paymentStatus").textContent =
        booking.paymentStatus || "Pending";

    document.getElementById("totalAmount").textContent =
        "₹" + (Number(booking.totalAmount) || 0)
            .toLocaleString("en-IN");

} else {
    // Show a message if booking is missing
    const successCard = document.querySelector(".success-card");

    if (successCard) {
        successCard.innerHTML = `
            <div class="alert alert-warning">
                <h4>Booking details not found!</h4>
                <p>Please make a new booking from the Packages page.</p>
                <a href="packages.html" class="btn btn-primary">
                    Browse Packages
                </a>
            </div>
        `;
    } else {
        alert("Booking details not found. Please make a new booking.");
    }
}