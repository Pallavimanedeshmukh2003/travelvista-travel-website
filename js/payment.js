
const pendingBooking = JSON.parse(
    sessionStorage.getItem("travelVistaPendingBooking") || "null"
);

const paymentForm = document.getElementById("paymentForm");

const paymentMessage =
    document.getElementById("paymentMessage");


// Check booking

if (!pendingBooking) {

    paymentForm.innerHTML = `
        <div class="alert alert-danger">
            No pending booking found.
        </div>

        <a href="packages.html"
           class="btn btn-primary w-100">
            Browse Packages
        </a>
    `;

} else {

    // Show booking information

    document.getElementById("bookingId").textContent =
        pendingBooking.id;

    document.getElementById("destination").textContent =
        pendingBooking.destination || "-";

    document.getElementById("place").textContent =
        pendingBooking.place || "-";

    document.getElementById("packageName").textContent =
        pendingBooking.packageName || "-";

    document.getElementById("travelDate").textContent =
        pendingBooking.travelDate || "-";

    document.getElementById("persons").textContent =
        pendingBooking.persons || "1";


    const amount =
        Number(pendingBooking.totalAmount) || 0;


    document.getElementById("totalAmount").textContent =
        "₹" + amount.toLocaleString("en-IN");


    document.getElementById("buttonAmount").textContent =
        amount.toLocaleString("en-IN");
}


// Payment submit

paymentForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (!pendingBooking) {
            return;
        }


        const selectedMethod =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        if (!selectedMethod) {

            showMessage(
                "Please select a payment method.",
                "danger"
            );

            return;
        }


        /*
         * Demo payment only.
         * No real payment gateway is connected.
         */

        const paymentMethod =
            selectedMethod.value;


        // Create final booking

        pendingBooking.paymentMethod =
            paymentMethod;


        if (paymentMethod === "Pay Later") {

            pendingBooking.paymentStatus =
                "Pending";

            pendingBooking.bookingStatus =
                "Confirmed - Payment Pending";

        } else {

            pendingBooking.paymentStatus =
                "Paid";

            pendingBooking.bookingStatus =
                "Confirmed";

            pendingBooking.paidAt =
                new Date().toISOString();

        }


        try {

            const bookings = JSON.parse(
                localStorage.getItem(
                    "travelVistaBookings"
                ) || "[]"
            );


            // Save booking in history

            bookings.push(pendingBooking);


            localStorage.setItem(
                "travelVistaBookings",
                JSON.stringify(bookings)
            );


            // Keep booking temporarily for success page

            sessionStorage.setItem(
                "travelVistaCompletedBooking",
                JSON.stringify(pendingBooking)
            );


            // Remove pending booking

            sessionStorage.removeItem(
                "travelVistaPendingBooking"
            );


            // Go to success page

            window.location.href =
                "payment-success.html?bookingId=" +
                encodeURIComponent(
                    pendingBooking.id
                );

        } catch (error) {

            showMessage(
                "Unable to save payment details. Please try again.",
                "danger"
            );

        }

    }
);


// Message function

function showMessage(message, type) {

    paymentMessage.className =
        "alert alert-" + type;

    paymentMessage.textContent =
        message;
}

