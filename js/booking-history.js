
document.addEventListener("DOMContentLoaded", function () {
    const bookingGrid = document.getElementById("bookingGrid");
    const bookingCount = document.getElementById("bookingCount");
    const noBookings = document.getElementById("noBookings");
    const noBookingsMessage = document.getElementById("noBookingsMessage");

    const searchInput = document.getElementById("bookingSearch");
    const statusFilter = document.getElementById("bookingStatusFilter");
    const sortSelect = document.getElementById("bookingSort");
    const resetButton = document.getElementById("resetBookings");

    function getBookings() {
        try {
            const bookings = JSON.parse(
                localStorage.getItem("travelVistaBookings") || "[]"
            );
            return Array.isArray(bookings) ? bookings : [];
        } catch (error) {
            console.error("Unable to read bookings:", error);
            return [];
        }
    }

    function saveBookings(bookings) {
        localStorage.setItem("travelVistaBookings", JSON.stringify(bookings));
    }

    function money(value) {
        return Number(value || 0).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        });
    }

    function formatDate(value) {
        if (!value) return "Not provided";

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    function safe(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];
        });
    }

    function getStatusClass(status) {
        const value = String(status || "Pending").toLowerCase();

        if (value === "confirmed") return "bg-success";
        if (value === "cancelled") return "bg-danger";
        if (value === "completed") return "bg-primary";

        return "bg-warning text-dark";
    }

    function showEmptyMessage(message) {
        if (noBookings) noBookings.style.display = "block";

        if (noBookingsMessage) {
            noBookingsMessage.textContent = message;
        } else if (noBookings) {
            noBookings.textContent = message;
        }
    }

    function renderBookings() {
        if (!bookingGrid) return;

        const allBookings = getBookings();
        const searchText = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedStatus = statusFilter
            ? statusFilter.value.toLowerCase()
            : "all";

        const sortValue = sortSelect ? sortSelect.value : "newest";

        let filteredBookings = allBookings.filter(function (booking) {
            const searchableText = [
                booking.id,
                booking.name,
                booking.destination,
                booking.place,
                booking.packageName,
                booking.email
            ].join(" ").toLowerCase();

            const matchesSearch = searchableText.includes(searchText);

            const bookingStatus = String(
                booking.bookingStatus || "Pending"
            ).toLowerCase();

            const matchesStatus =
                selectedStatus === "all" ||
                bookingStatus === selectedStatus;

            return matchesSearch && matchesStatus;
        });

        filteredBookings.sort(function (a, b) {
            if (sortValue === "oldest") {
                return new Date(a.bookedAt || 0) -
                    new Date(b.bookedAt || 0);
            }

            if (sortValue === "price-high") {
                return Number(b.totalAmount || 0) -
                    Number(a.totalAmount || 0);
            }

            if (sortValue === "price-low") {
                return Number(a.totalAmount || 0) -
                    Number(b.totalAmount || 0);
            }

            return new Date(b.bookedAt || 0) -
                new Date(a.bookedAt || 0);
        });

        if (bookingCount) {
            bookingCount.textContent = filteredBookings.length;
        }

        if (filteredBookings.length === 0) {
            bookingGrid.innerHTML = "";

            showEmptyMessage(
                allBookings.length === 0
                    ? "No bookings found. Please book a travel package first."
                    : "No bookings match your search or status filter."
            );
            return;
        }

        if (noBookings) noBookings.style.display = "none";

        bookingGrid.innerHTML = filteredBookings.map(function (booking) {
            const id = encodeURIComponent(String(booking.id ?? ""));
            const status = booking.bookingStatus || "Pending";
            const paymentStatus = booking.paymentStatus || "Pending";

            return `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="card-body">
                            <div class="d-flex justify-content-between
                                        align-items-start gap-2 mb-3">
                                <h5 class="card-title mb-0">
                                    ${safe(booking.destination || "Travel Booking")}
                                </h5>
                                <span class="badge ${getStatusClass(status)}">
                                    ${safe(status)}
                                </span>
                            </div>

                            <p class="mb-2">
                                <strong>Booking ID:</strong>
                                ${safe(booking.id)}
                            </p>

                            <p class="mb-2">
                                <strong>Place:</strong>
                                ${safe(booking.place || "Not provided")}
                            </p>

                            <p class="mb-2">
                                <strong>Package:</strong>
                                ${safe(booking.packageName || "Not provided")}
                            </p>

                            <p class="mb-2">
                                <strong>Travel Date:</strong>
                                ${safe(formatDate(booking.travelDate))}
                            </p>

                            <p class="mb-2">
                                <strong>Persons:</strong>
                                ${safe(booking.persons || 1)}
                            </p>

                            <p class="mb-2">
                                <strong>Transport:</strong>
                                ${safe(booking.transport || "Not provided")}
                            </p>

                            <p class="mb-2">
                                <strong>Payment:</strong>
                                ${safe(paymentStatus)}
                            </p>

                            <h5 class="text-primary mt-3">
                                ${safe(money(booking.totalAmount))}
                            </h5>

                            <div class="d-grid gap-2 mt-3">
                                <a class="btn btn-primary"
                                   href="booking-details.html?bookingId=${id}">
                                    View Details
                                </a>

                                <a class="btn btn-outline-primary"
                                   href="invoice.html?bookingId=${id}">
                                    View Invoice
                                </a>

                                ${
                                    String(status).toLowerCase() !== "cancelled"
                                    ? `<button type="button"
                                        class="btn btn-outline-danger cancel-booking"
                                        data-id="${safe(booking.id)}">
                                        Cancel Booking
                                       </button>`
                                    : `<button type="button"
                                        class="btn btn-secondary" disabled>
                                        Booking Cancelled
                                       </button>`
                                }
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    function cancelBooking(bookingId) {
        const bookings = getBookings();

        const booking = bookings.find(function (item) {
            return String(item.id) === String(bookingId);
        });

        if (!booking) {
            alert("Booking not found.");
            return;
        }

        if (
            String(booking.bookingStatus || "").toLowerCase() === "cancelled"
        ) {
            alert("This booking is already cancelled.");
            return;
        }

        const confirmed = confirm(
            "Are you sure you want to cancel this booking? " +
            "A demo cancellation charge of ₹500 will apply."
        );

        if (!confirmed) return;

        const totalAmount = Math.max(Number(booking.totalAmount) || 0, 0);
        const cancellationCharge = Math.min(500, totalAmount);
        const refundAmount = Math.max(totalAmount - cancellationCharge, 0);

        const paymentStatus = String(
            booking.paymentStatus || ""
        ).toLowerCase();

        const paymentCompleted = [
            "paid",
            "completed",
            "success",
            "successful"
        ].includes(paymentStatus);

        booking.bookingStatus = "Cancelled";
        booking.cancellationCharge = cancellationCharge;
        booking.refundAmount = paymentCompleted ? refundAmount : 0;
        booking.refundStatus = paymentCompleted
            ? "Refund Pending (Demo)"
            : "No refund initiated - payment not completed";
        booking.cancelledAt = new Date().toISOString();

        saveBookings(bookings);

        alert(
            "Booking cancelled.\n" +
            "Cancellation charge: " + money(cancellationCharge) + "\n" +
            "Demo refund amount: " +
            money(booking.refundAmount) + "\n\n" +
            "This is a frontend demo. No real payment or refund was processed."
        );

        renderBookings();
    }

    if (searchInput) {
        searchInput.addEventListener("input", renderBookings);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", renderBookings);
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", renderBookings);
    }

    if (resetButton) {
        resetButton.addEventListener("click", function () {
            if (searchInput) searchInput.value = "";
            if (statusFilter) statusFilter.value = "all";
            if (sortSelect) sortSelect.value = "newest";

            renderBookings();
        });
    }

    if (bookingGrid) {
        bookingGrid.addEventListener("click", function (event) {
            const button = event.target.closest(".cancel-booking");

            if (button) {
                cancelBooking(button.dataset.id);
            }
        });
    }

    renderBookings();
});
