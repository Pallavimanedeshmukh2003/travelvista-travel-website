
document.addEventListener("DOMContentLoaded", function () {

    const hotels = [
        {
            id: 1,
            name: "Ocean Pearl Resort",
            location: "Goa",
            price: 4500,
            rating: 4.8,
            type: "Beach Resort",
            image: "photo-1571896349842-33c89424de2d"
        },
        {
            id: 2,
            name: "Mountain Escape",
            location: "Manali",
            price: 3200,
            rating: 4.7,
            type: "Mountain View",
            image: "photo-1518732714860-b62714ce0c59"
        },
        {
            id: 3,
            name: "Green Valley Retreat",
            location: "Kerala",
            price: 3800,
            rating: 4.6,
            type: "Nature Resort",
            image: "photo-1445019980597-93fa8acb246c"
        },
        {
            id: 4,
            name: "City Lights Hotel",
            location: "Mumbai",
            price: 2800,
            rating: 4.4,
            type: "City Hotel",
            image: "photo-1566073771259-6a8506099945"
        },
        {
            id: 5,
            name: "Royal Heritage Palace",
            location: "Jaipur",
            price: 5200,
            rating: 4.9,
            type: "Heritage Stay",
            image: "photo-1542314831-068cd1dbfeeb"
        },
        {
            id: 6,
            name: "Lakeview Resort",
            location: "Udaipur",
            price: 4100,
            rating: 4.7,
            type: "Lake View",
            image: "photo-1582719508461-905c673771fd"
        },
        {
            id: 7,
            name: "Hilltop Holiday Inn",
            location: "Lonavala",
            price: 2500,
            rating: 4.3,
            type: "Hill Resort",
            image: "photo-1564013799919-ab600027ffc6"
        },
        {
            id: 8,
            name: "Snow Peak Residency",
            location: "Shimla",
            price: 3000,
            rating: 4.5,
            type: "Mountain Stay",
            image: "photo-1510798831971-661eb04b3739"
        },
        {
            id: 9,
            name: "Riverfront Retreat",
            location: "Rishikesh",
            price: 2200,
            rating: 4.4,
            type: "Riverside Stay",
            image: "photo-1449158743715-0a90ebb6d2d8"
        },
        {
            id: 10,
            name: "Blue Hills Resort",
            location: "Ooty",
            price: 2700,
            rating: 4.6,
            type: "Garden Resort",
            image: "photo-1449158743715-0a90ebb6d2d8"
        }
    ];

    const hotelGrid = document.getElementById("hotelGrid");
    const hotelSearch = document.getElementById("hotelSearch");
    const locationFilter = document.getElementById("locationFilter");
    const priceSort = document.getElementById("priceSort");
    const hotelCount = document.getElementById("hotelCount");
    const noHotels = document.getElementById("noHotels");

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, function (char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];
        });
    }

    function formatPrice(price) {
        return Number(price).toLocaleString("en-IN");
    }

    function renderHotels() {
        if (!hotelGrid) return;

        const searchText = hotelSearch
            ? hotelSearch.value.trim().toLowerCase()
            : "";

        const selectedLocation = locationFilter
            ? locationFilter.value
            : "all";

        const sortValue = priceSort ? priceSort.value : "default";

        let filteredHotels = hotels.filter(function (hotel) {
            const searchData = (
                hotel.name + " " +
                hotel.location + " " +
                hotel.type
            ).toLowerCase();

            return searchData.includes(searchText) &&
                (selectedLocation === "all" ||
                 hotel.location === selectedLocation);
        });

        if (sortValue === "low") {
            filteredHotels.sort((a, b) => a.price - b.price);
        } else if (sortValue === "high") {
            filteredHotels.sort((a, b) => b.price - a.price);
        }

        if (hotelCount) {
            hotelCount.textContent = filteredHotels.length + " Hotels";
        }

        if (filteredHotels.length === 0) {
            hotelGrid.innerHTML = "";
            if (noHotels) noHotels.style.display = "block";
            return;
        }

        if (noHotels) noHotels.style.display = "none";

        hotelGrid.innerHTML = filteredHotels.map(function (hotel) {
            const imageURL =
                "https://images.unsplash.com/" +
                hotel.image +
                "?auto=format&fit=crop&w=900&q=80";

            return `
                <div class="col-sm-6 col-lg-4">
                    <article class="hotel-card">
                        <img
                            src="${imageURL}"
                            class="hotel-image"
                            alt="${escapeHTML(hotel.name)}"
                            loading="lazy"
                            onerror="this.onerror=null;this.src='https://placehold.co/900x600?text=Hotel';"
                        >

                        <div class="hotel-content">
                            <div class="d-flex justify-content-between
                                        align-items-center mb-2">
                                <span class="hotel-tag">
                                    ${escapeHTML(hotel.type)}
                                </span>
                                <span class="hotel-rating">
                                    &#9733; ${hotel.rating}
                                </span>
                            </div>

                            <h5 class="fw-bold">
                                ${escapeHTML(hotel.name)}
                            </h5>

                            <p class="hotel-location">
                                &#128205; ${escapeHTML(hotel.location)}, India
                            </p>

                            <div class="d-flex justify-content-between
                                        align-items-center gap-2">
                                <div>
                                    <div class="hotel-price">
                                        &#8377;${formatPrice(hotel.price)}
                                    </div>
                                    <small class="text-secondary">
                                        per night (demo price)
                                    </small>
                                </div>

                                <button type="button"
                                        class="btn btn-primary book-hotel"
                                        data-id="${hotel.id}">
                                    Book Hotel
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            `;
        }).join("");
    }

    if (hotelSearch) {
        hotelSearch.addEventListener("input", renderHotels);
    }

    if (locationFilter) {
        locationFilter.addEventListener("change", renderHotels);
    }

    if (priceSort) {
        priceSort.addEventListener("change", renderHotels);
    }

    if (hotelGrid) {
        hotelGrid.addEventListener("click", function (event) {
            const button = event.target.closest(".book-hotel");
            if (!button) return;

            const hotel = hotels.find(function (item) {
                return item.id === Number(button.dataset.id);
            });

            if (!hotel) return;

            const params = new URLSearchParams({
                hotelId: hotel.id,
                hotel: hotel.name,
                destination: hotel.location,
                price: hotel.price
            });

            window.location.href = "booking.html?" + params.toString();
        });
    }

    renderHotels();
});
