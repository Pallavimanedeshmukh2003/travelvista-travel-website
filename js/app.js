
document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // 1. SHOW CURRENT YEAR IN FOOTER
    // ==============================
    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    document.querySelectorAll(".current-year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // ==============================
    // 2. SET MINIMUM TRAVEL DATE
    // ==============================
    const travelDateInput = document.getElementById("travelDate");

    if (travelDateInput) {
        const today = new Date();

        const localDate =
            today.getFullYear() + "-" +
            String(today.getMonth() + 1).padStart(2, "0") + "-" +
            String(today.getDate()).padStart(2, "0");

        travelDateInput.min = localDate;
    }

    // ==============================
    // 3. DESTINATION SEARCH FORM
    // ==============================
    const searchForm = document.getElementById("destinationSearch");

    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const destinationInput = document.getElementById("destination");
            const dateInput = document.getElementById("travelDate");
            const travellersInput = document.getElementById("travellers");

            const destination = destinationInput
                ? destinationInput.value.trim()
                : "";

            const travelDate = dateInput ? dateInput.value : "";

            const travellers = travellersInput
                ? travellersInput.value
                : "1";

            if (!destination || !travelDate) {
                alert("Please enter destination and travel date.");
                return;
            }

            if (travelDateInput && travelDate < travelDateInput.min) {
                alert("Please select today or a future travel date.");
                return;
            }

            const params = new URLSearchParams({
                place: destination,
                date: travelDate,
                travellers: travellers
            });

            window.location.href =
                "destinations.html?" + params.toString();
        });
    }

    // ==============================
    // 4. GET LOGGED-IN USER
    // ==============================
    function getLoggedInUser() {
        try {
            return JSON.parse(
                localStorage.getItem("travelVistaUser") || "null"
            );
        } catch (error) {
            console.error("Unable to read user data:", error);
            return null;
        }
    }

    // ==============================
    // 5. UPDATE NAVBAR
    // ==============================
    function updateNavbar() {
        const user = getLoggedInUser();

        document.querySelectorAll(".login-link").forEach(function (link) {
            link.style.display = user ? "none" : "";
        });

        document.querySelectorAll(".signup-link").forEach(function (link) {
            link.style.display = user ? "none" : "";
        });

        document.querySelectorAll(".logout-btn").forEach(function (button) {
            button.style.display = user ? "" : "none";
        });

        document.querySelectorAll(".user-name").forEach(function (element) {
            element.textContent = user
                ? "Welcome, " + (user.name || "Traveler")
                : "";
        });
    }

    // ==============================
    // 6. LOGOUT
    // ==============================
    document.querySelectorAll(".logout-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            const confirmed = confirm("Do you want to logout?");

            if (confirmed) {
                localStorage.removeItem("travelVistaUser");

                alert("You have logged out.");

                window.location.href = "login.html";
            }
        });
    });

    // ==============================
    // 7. INITIALIZE NAVBAR
    // ==============================
    updateNavbar();

});
