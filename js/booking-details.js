
// ==========================================
// TravelVista - Booking Details
// File: js/booking-details.js
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const bookingId = params.get("bookingId");

    const message = document.getElementById("message");
    const bookingContent = document.getElementById("bookingContent");

    // Display values safely
    function showValue(id, value) {

        const element = document.getElementById(id);

        if (!element) {
            return;
        }

        if (value !== undefined && value !== null && value !== "") {
            element.textContent = value;
        } else {
            element.textContent = "Not provided";
        }
    }

    // Format currency
    function formatMoney(value) {

        const amount = Number(value);

        if (!Number.isFinite(amount)) {
            return "₹0";
        }

        return amount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        });
    }

    // Format date
    function formatDate(value) {

        if (!value) {
            return "Not provided";
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return String(value);
        }

        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    // Load bookings
    let bookings = [];

    try {

        bookings = JSON.parse(
            localStorage.getItem("travelVistaBookings") || "[]"
        );

        if (!Array.isArray(bookings)) {
            bookings = [];
        }

    } catch (error) {

        console.error("Unable to load bookings:", error);
        bookings = [];
    }

    // Find selected booking
    const booking = bookings.find(function (item) {
        return String(item.id) === String(bookingId);
    });

    // Booking not found
    if (!bookingId || !booking) {

        if (message) {
            message.className = "alert alert-warning";
            message.textContent =
                "Booking not found. Please open this page from My Bookings.";
        }

        if (bookingContent) {
            bookingContent.style.display = "none";
        }

        return;
    }

    // ==========================================
    // CUSTOMER INFORMATION
    // ==========================================

    showValue("detailId", booking.id);
    showValue("detailName", booking.name);
    showValue("detailEmail", booking.email);
    showValue("detailMobile", booking.mobile);

    // ==========================================
    // TRIP INFORMATION
    // ==========================================

    showValue("detailPersons", booking.persons);
    showValue("detailDestination", booking.destination);
    showValue("detailPlace", booking.place);
    showValue("detailPackage", booking.packageName);
    showValue("detailDate", formatDate(booking.travelDate));
    showValue("detailTransport", booking.transport);
    showValue("detailRequest", booking.specialRequest);

    // ==========================================
    // PRICE INFORMATION
    // ==========================================

    showValue(
        "detailPrice",
        formatMoney(booking.pricePerPerson)
    );

    showValue(
        "detailTotal",
        formatMoney(booking.totalAmount)
    );

    // ==========================================
    // PAYMENT INFORMATION
    // ==========================================

    showValue(
        "detailMethod",
        booking.paymentMethod || "Not provided"
    );

    showValue(
        "detailPaymentStatus",
        booking.paymentStatus || "Pending"
    );

    showValue(
        "detailBookingStatus",
        booking.bookingStatus || "Pending"
    );

    showValue(
        "detailBookedAt",
        formatDate(booking.bookedAt)
    );

    // ==========================================
    // CANCELLATION AND REFUND INFORMATION
    // ==========================================

    const wasCancelled =
        String(booking.bookingStatus || "").toLowerCase() === "cancelled";

    showValue(
        "detailCancellationCharge",
        wasCancelled
            ? formatMoney(booking.cancellationCharge)
            : "Not cancelled"
    );

    showValue(
        "detailRefundAmount",
        wasCancelled
            ? formatMoney(booking.refundAmount)
            : "Not applicable"
    );

    showValue(
        "detailRefundStatus",
        wasCancelled
            ? (booking.refundStatus || "Refund status unavailable")
            : "Not applicable"
    );

    showValue(
        "detailCancelledAt",
        wasCancelled
            ? formatDate(booking.cancelledAt)
            : "Not cancelled"
    );

    // ==========================================
    // SHOW BOOKING DETAILS
    // ==========================================

    if (message) {
        message.className = "alert alert-success";
        message.textContent = "Booking details loaded successfully.";
    }

    if (bookingContent) {
        bookingContent.style.display = "block";
    }

});
