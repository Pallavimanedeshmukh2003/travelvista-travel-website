
// ==========================================
// TravelVista - Invoice
// File: js/invoice.js
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const bookingId = params.get("bookingId");

    const invoiceContent = document.getElementById("invoiceContent");
    const invoiceMessage = document.getElementById("invoiceMessage");
    const printButton = document.getElementById("printInvoice");

    // Display values safely
    function showValue(id, value) {
        const element = document.getElementById(id);

        if (!element) return;

        element.textContent =
            value !== undefined && value !== null && value !== ""
                ? value
                : "Not provided";
    }

    // Format Indian currency
    function formatMoney(value) {
        const amount = Number(value);

        if (!Number.isFinite(amount)) return "₹0";

        return amount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        });
    }

    // Format date
    function formatDate(value) {
        if (!value) return "Not provided";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return String(value);
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    // Read saved bookings
    let bookings = [];

    try {
        bookings = JSON.parse(
            localStorage.getItem("travelVistaBookings") || "[]"
        );

        if (!Array.isArray(bookings)) {
            bookings = [];
        }
    } catch (error) {
        console.error("Unable to read bookings:", error);
        bookings = [];
    }

    // Find selected booking
    const booking = bookings.find(function (item) {
        return String(item.id) === String(bookingId);
    });

    // Booking not found
    if (!bookingId || !booking) {

        if (invoiceMessage) {
            invoiceMessage.className = "alert alert-warning";
            invoiceMessage.textContent =
                "Invoice not found. Please open the invoice from My Bookings.";
        }

        if (invoiceContent) {
            invoiceContent.style.display = "none";
        }

        if (printButton) {
            printButton.disabled = true;
        }

        return;
    }

    // ==========================================
    // INVOICE INFORMATION
    // ==========================================

    showValue("invoiceNumber", "TV-" + booking.id);
    showValue("invoiceBookingId", booking.id);
    showValue("invoiceDate", formatDate(booking.bookedAt));

    // ==========================================
    // CUSTOMER INFORMATION
    // ==========================================

    showValue("invoiceCustomerName", booking.name);
    showValue("invoiceEmail", booking.email);
    showValue("invoiceMobile", booking.mobile);

    // ==========================================
    // TRAVEL INFORMATION
    // ==========================================

    const packageName = booking.packageName || "Travel Package";

    const destinationText = [
        booking.destination,
        booking.place
    ].filter(Boolean).join(" - ");

    showValue("invoiceDestination", booking.destination);
    showValue("invoicePlace", booking.place);
    showValue("invoicePackage", packageName);
    showValue("invoiceTravelDate", formatDate(booking.travelDate));
    showValue("invoicePersons", booking.persons);
    showValue("invoiceTransport", booking.transport);

    // Additional fields in the updated invoice.html
    showValue("invoicePackageDescription", packageName);
    showValue(
        "invoiceDestinationDescription",
        destinationText || "Not specified"
    );

    // ==========================================
    // PRICE INFORMATION
    // ==========================================

    const persons = Number(booking.persons) || 1;
    const pricePerPerson = Number(booking.pricePerPerson) || 0;
    const totalAmount = Number(booking.totalAmount) || 0;

    showValue("invoicePricePerPerson", formatMoney(pricePerPerson));
    showValue("invoicePersonsCount", persons);
    showValue("invoiceTotal", formatMoney(totalAmount));

    // Summary section
    showValue("invoiceSummaryPrice", formatMoney(pricePerPerson));
    showValue("invoiceSummaryPersons", persons);
    showValue("invoiceGrandTotal", formatMoney(totalAmount));

    // ==========================================
    // PAYMENT INFORMATION
    // ==========================================

    const paymentStatus = booking.paymentStatus || "Pending";

    showValue(
        "invoicePaymentMethod",
        booking.paymentMethod || "Not provided"
    );

    showValue("invoicePaymentStatus", paymentStatus);
    showValue("invoicePaymentStatusDetails", paymentStatus);
    showValue("invoiceBookingStatus", booking.bookingStatus || "Pending");
    showValue("invoicePaymentBadge", paymentStatus);

    // ==========================================
    // CANCELLATION AND REFUND INFORMATION
    // ==========================================

    const cancelled =
        String(booking.bookingStatus || "").toLowerCase() === "cancelled";

    const cancellationSection =
        document.getElementById("invoiceCancellationSection");

    if (cancellationSection) {
        cancellationSection.style.display = cancelled ? "block" : "none";
    }

    showValue(
        "invoiceCancellationCharge",
        cancelled
            ? formatMoney(booking.cancellationCharge)
            : "Not applicable"
    );

    showValue(
        "invoiceRefundAmount",
        cancelled
            ? formatMoney(booking.refundAmount)
            : "Not applicable"
    );

    showValue(
        "invoiceRefundStatus",
        cancelled
            ? (booking.refundStatus || "Refund status unavailable")
            : "Not applicable"
    );

    // ==========================================
    // SHOW INVOICE
    // ==========================================

    if (invoiceContent) {
        invoiceContent.style.display = "block";
    }

    if (invoiceMessage) {
        invoiceMessage.className = "alert alert-success";
        invoiceMessage.textContent = "Invoice loaded successfully.";
    }

    // ==========================================
    // PRINT / SAVE AS PDF
    // ==========================================

    if (printButton) {
        printButton.addEventListener("click", function () {
            window.print();
        });
    }

});
