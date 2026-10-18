// =======================================
// TravelVista - destinations.js
// =======================================

// All destination data
const destinationData = {
    Goa: [
        "Baga Beach",
        "Calangute Beach",
        "Anjuna Beach",
        "Palolem Beach",
        "Candolim Beach",
        "Fort Aguada",
        "Dudhsagar Falls",
        "Basilica of Bom Jesus",
        "Vagator Beach",
        "Fontainhas"
    ],

    Manali: [
        "Solang Valley",
        "Rohtang Pass",
        "Hadimba Temple",
        "Old Manali",
        "Jogini Waterfall",
        "Vashisht Temple",
        "Beas River",
        "Gulaba",
        "Naggar Castle",
        "Hampta Pass"
    ],

    Kerala: [
        "Munnar Tea Gardens",
        "Alleppey Backwaters",
        "Varkala Beach",
        "Kovalam Beach",
        "Wayanad",
        "Thekkady",
        "Athirappilly Falls",
        "Fort Kochi",
        "Kumarakom",
        "Kozhikode Beach"
    ],

    Kashmir: [
        "Dal Lake",
        "Gulmarg",
        "Pahalgam",
        "Sonamarg",
        "Betaab Valley",
        "Aru Valley",
        "Mughal Gardens Srinagar",
        "Shankaracharya Temple",
        "Doodhpathri",
        "Yusmarg"
    ],

    Jaipur: [
        "Hawa Mahal",
        "Amber Fort",
        "City Palace Jaipur",
        "Jantar Mantar Jaipur",
        "Nahargarh Fort",
        "Jal Mahal",
        "Albert Hall Museum",
        "Patrika Gate",
        "Birla Mandir Jaipur",
        "Johari Bazaar"
    ],

    Mumbai: [
        "Gateway of India",
        "Marine Drive",
        "Juhu Beach",
        "Elephanta Caves",
        "Bandra Fort",
        "Sanjay Gandhi National Park",
        "Colaba Causeway",
        "Bandra Worli Sea Link",
        "Haji Ali Dargah",
        "Chhatrapati Shivaji Maharaj Terminus"
    ],

    Bali: [
        "Kuta Beach",
        "Uluwatu Temple",
        "Ubud Rice Terraces",
        "Tanah Lot",
        "Nusa Penida",
        "Mount Batur",
        "Seminyak",
        "Tegallalang Rice Terraces",
        "Besakih Temple",
        "Sekumpul Waterfall"
    ],

    Dubai: [
        "Burj Khalifa",
        "Dubai Marina",
        "Palm Jumeirah",
        "Dubai Mall",
        "Dubai Desert Safari",
        "Dubai Frame",
        "Jumeirah Beach",
        "Al Fahidi Historical Neighbourhood",
        "Dubai Miracle Garden",
        "Museum of the Future"
    ],

    Switzerland: [
        "Zermatt",
        "Lucerne",
        "Interlaken",
        "Jungfraujoch",
        "Lake Geneva",
        "Lauterbrunnen",
        "Grindelwald",
        "Bern Old Town",
        "Montreux",
        "Rhine Falls"
    ],

    Ranthambore: [
        "Ranthambore National Park",
        "Ranthambore Fort",
        "Padam Talao",
        "Raj Bagh Ruins",
        "Malik Talao",
        "Surwal Lake",
        "Kachida Valley",
        "Jogi Mahal",
        "Rajiv Gandhi Regional Museum",
        "Ranthambore Safari"
    ]
};

// Destination images
const destinationImages = {
    Goa: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    Manali: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
    Kerala: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    Kashmir: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80",
    Jaipur: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=80",
    Mumbai: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=80",
    Bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    Dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    Switzerland: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80",
    Ranthambore: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80"
};

// Destination descriptions
const destinationDescriptions = {
    Goa: "Enjoy golden beaches, water sports, sunsets and vibrant coastal life.",
    Manali: "Explore beautiful mountains, snow views, valleys and adventure activities.",
    Kerala: "Discover peaceful backwaters, green tea gardens and beautiful beaches.",
    Kashmir: "Experience lakes, valleys, mountain views and unforgettable scenery.",
    Jaipur: "Explore royal palaces, historic forts, colourful markets and local culture.",
    Mumbai: "Discover famous landmarks, city views, beaches and local street food.",
    Bali: "Enjoy tropical beaches, temples, rice terraces and island adventures.",
    Dubai: "Experience modern architecture, shopping, desert safaris and luxury views.",
    Switzerland: "Explore alpine villages, beautiful lakes, mountains and waterfalls.",
    Ranthambore: "Discover wildlife, forest landscapes, lakes and historic ruins."
};

// Convert destination data into cards
let destinations = [];

Object.entries(destinationData).forEach(([destination, places]) => {
    places.forEach((place, index) => {
        destinations.push({
            id: `${destination}-${index + 1}`,
            name: place,
            destination: destination,
            description: destinationDescriptions[destination],
            image: destinationImages[destination],
            rating: (4.3 + (index % 6) * 0.1).toFixed(1)
        });
    });
});

// DOM elements
const destinationGrid =
    document.getElementById("destinationsGrid") ||
    document.getElementById("destinationGrid");

const destinationSearch = document.getElementById("destinationSearch");
const destinationFilter = document.getElementById("destinationFilter");
const destinationSort = document.getElementById("destinationSort");
const destinationCount = document.getElementById("destinationCount");
const destinationNoResults = document.getElementById("destinationNoResults");
const resetDestinations = document.getElementById("resetDestinations");

// Render destination cards
function displayDestinations(list) {
    if (!destinationGrid) {
        console.error("Destination grid not found. Check destinations.html grid ID.");
        return;
    }

    destinationGrid.innerHTML = "";

    if (list.length === 0) {
        if (destinationNoResults) {
            destinationNoResults.style.display = "block";
        }

        if (destinationCount) {
            destinationCount.textContent = "0 destinations found";
        }

        return;
    }

    if (destinationNoResults) {
        destinationNoResults.style.display = "none";
    }

    list.forEach((place) => {
        const card = document.createElement("div");
        card.className = "col-lg-4 col-md-6 mb-4";

        card.innerHTML = `
            <div class="card destination-card h-100 shadow-sm border-0">
                <img
                    src="${place.image}"
                    class="card-img-top"
                    alt="${place.name}"
                    loading="lazy"
                    style="height:240px; object-fit:cover;"
                    onerror="this.onerror=null;this.src='https://placehold.co/900x600?text=TravelVista';"
                >

                <div class="card-body d-flex flex-column">
                    <span class="badge bg-info text-dark align-self-start mb-2">
                        ${place.destination}
                    </span>

                    <h5 class="card-title">${place.name}</h5>

                    <p class="text-warning mb-2">
                        <i class="bi bi-star-fill"></i>
                        ${place.rating}/5
                    </p>

                    <p class="card-text text-muted">
                        ${place.description}
                    </p>

                    <a
                        class="btn btn-primary rounded-pill mt-auto"
                        href="packages.html?destination=${encodeURIComponent(place.destination)}&place=${encodeURIComponent(place.name)}"
                    >
                        Explore Packages
                        <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;

        destinationGrid.appendChild(card);
    });

    if (destinationCount) {
        destinationCount.textContent = `${list.length} destinations found`;
    }
}

// Search, filter and sort
function filterDestinations() {
    const searchText = destinationSearch
        ? destinationSearch.value.trim().toLowerCase()
        : "";

    const selectedDestination = destinationFilter
        ? destinationFilter.value
        : "all";

    const sortValue = destinationSort
        ? destinationSort.value
        : "name-asc";

    let filtered = destinations.filter((place) => {
        const matchesSearch =
            place.name.toLowerCase().includes(searchText) ||
            place.destination.toLowerCase().includes(searchText);

        const matchesDestination =
            selectedDestination === "all" ||
            place.destination.toLowerCase() === selectedDestination.toLowerCase();

        return matchesSearch && matchesDestination;
    });

    if (sortValue === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "name-desc") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortValue === "rating-desc") {
        filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    displayDestinations(filtered);
}

// Reset all filters
function resetAllDestinations() {
    if (destinationSearch) destinationSearch.value = "";
    if (destinationFilter) destinationFilter.value = "all";
    if (destinationSort) destinationSort.value = "name-asc";

    displayDestinations(destinations);
}

// Event listeners
if (destinationSearch) {
    destinationSearch.addEventListener("input", filterDestinations);
}

if (destinationFilter) {
    destinationFilter.addEventListener("change", filterDestinations);
}

if (destinationSort) {
    destinationSort.addEventListener("change", filterDestinations);
}

if (resetDestinations) {
    resetDestinations.addEventListener("click", resetAllDestinations);
}

// Initial page load
displayDestinations(destinations);