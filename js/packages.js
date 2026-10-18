// =======================================
// TravelVista - packages.js
// =======================================

// Package data for all destinations
const packageData = [
    {
        id: 1,
        destination: "Goa",
        name: "Goa Beach Holiday",
        duration: "5 Days / 4 Nights",
        price: 15000,
        rating: 4.8,
        description: "Enjoy beautiful beaches, sunset views and exciting water activities.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 2,
        destination: "Manali",
        name: "Manali Mountain Escape",
        duration: "5 Days / 4 Nights",
        price: 15000,
        rating: 4.7,
        description: "Explore mountain valleys, scenic views and adventure activities.",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 3,
        destination: "Kerala",
        name: "Kerala Nature Retreat",
        duration: "5 Days / 4 Nights",
        price: 15000,
        rating: 4.8,
        description: "Discover green landscapes, tea gardens and peaceful backwaters.",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 4,
        destination: "Kashmir",
        name: "Kashmir Valley Tour",
        duration: "5 Days / 4 Nights",
        price: 15000,
        rating: 4.9,
        description: "Enjoy beautiful lakes, mountain scenery and green valleys.",
        image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 5,
        destination: "Jaipur",
        name: "Royal Jaipur Heritage Tour",
        duration: "5 Days / 4 Nights",
        price: 15000,
        rating: 4.6,
        description: "Explore royal palaces, historic forts and colourful markets.",
        image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 6,
        destination: "Mumbai",
        name: "Mumbai City Experience",
        duration: "5 Days / 4 Nights",
        price: 15000,
        rating: 4.5,
        description: "Visit famous landmarks, beaches and popular city attractions.",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 7,
        destination: "Bali",
        name: "Bali Island Adventure",
        duration: "5 Days / 4 Nights",
        price: 15000,
        rating: 4.9,
        description: "Discover tropical beaches, temples and scenic rice terraces.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 8,
        destination: "Dubai",
        name: "Dubai Luxury Explorer",
        duration: "5 Days / 4 Nights",
        price: 15000,
        rating: 4.7,
        description: "Experience modern landmarks, shopping and desert adventures.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 9,
        destination: "Switzerland",
        name: "Switzerland Alpine Holiday",
        duration: "5 Days / 4 Nights",
        price: 15000,
        rating: 4.9,
        description: "Enjoy alpine villages, beautiful lakes and mountain views.",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 10,
        destination: "Ranthambore",
        name: "Ranthambore Wildlife Tour",
        duration: "5 Days / 4 Nights",
        price: 15000,
        rating: 4.6,
        description: "Explore forest landscapes, wildlife and historic ruins.",
        image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80"
    }
];

// Read selected destination and place from URL
const urlParams = new URLSearchParams(window.location.search);

const selectedDestination = urlParams.get("destination") || "";
const selectedPlace = urlParams.get("place") || "";

// HTML elements
const packageGrid = document.getElementById("packageGrid");
const packageSearch = document.getElementById("packageSearch");
const packageDestination = document.getElementById("packageDestination");
const packageSort = document.getElementById("packageSort");
const packageCount = document.getElementById("packageCount");
const packageNoResults = document.getElementById("packageNoResults");
const packageSubtitle = document.getElementById("packageSubtitle");
const resetPackages = document.getElementById("resetPackages");

// Create place-specific packages from the selected destination
function getPackagesForSelectedPlace() {
    if (!selectedDestination || !selectedPlace) {
        return [...packageData];
    }

    const basePackage = packageData.find(
        (item) =>
            item.destination.toLowerCase() ===
            selectedDestination.toLowerCase()
    );

    if (!basePackage) {
        return [];
    }

    // These are example package options for the selected place.
    return [
        {
            ...basePackage,
            id: `${basePackage.id}-place-standard`,
            name: `${selectedPlace} Explorer`,
            place: selectedPlace,
            price: basePackage.price,
            duration: "5 Days / 4 Nights",
            description: `Explore ${selectedPlace} and enjoy a memorable travel experience.`
        },
        {
            ...basePackage,
            id: `${basePackage.id}-place-premium`,
            name: `${selectedPlace} Premium Holiday`,
            place: selectedPlace,
            price: basePackage.price + 5000,
            duration: "6 Days / 5 Nights",
            description: `Enjoy a premium holiday with more time to explore ${selectedPlace}.`
        }
    ];
}

// Packages to display
let packages = getPackagesForSelectedPlace();

// Set page heading
function updatePackageHeading() {
    if (!packageSubtitle) return;

    if (selectedPlace && selectedDestination) {
        packageSubtitle.textContent =
            `Explore travel packages for ${selectedPlace}, ${selectedDestination}.`;
    } else if (selectedDestination) {
        packageSubtitle.textContent =
            `Explore our available ${selectedDestination} travel packages.`;
    } else {
        packageSubtitle.textContent =
            "Discover your next unforgettable travel experience.";
    }
}

// Render package cards
function displayPackages(list) {
    if (!packageGrid) {
        console.error("Package grid not found. Check packages.html ID.");
        return;
    }

    packageGrid.innerHTML = "";

    if (list.length === 0) {
        if (packageNoResults) {
            packageNoResults.style.display = "block";
        }

        if (packageCount) {
            packageCount.textContent = "0 packages found";
        }

        return;
    }

    if (packageNoResults) {
        packageNoResults.style.display = "none";
    }

    list.forEach((item) => {
        const card = document.createElement("div");
        card.className = "col-lg-4 col-md-6 mb-4";

        const placeText = item.place
            ? `<p class="small text-muted mb-2">
                   <i class="bi bi-geo-alt-fill"></i>
                   ${item.place}
               </p>`
            : "";

        const bookingUrl =
            `booking.html?destination=${encodeURIComponent(item.destination)}` +
            `&place=${encodeURIComponent(item.place || selectedPlace)}` +
            `&package=${encodeURIComponent(item.name)}` +
            `&price=${encodeURIComponent(item.price)}`;

        card.innerHTML = `
            <div class="card package-card h-100 shadow-sm border-0">

                <img
                    src="${item.image}"
                    class="card-img-top"
                    alt="${item.name}"
                    loading="lazy"
                    style="height:240px; object-fit:cover;"
                    onerror="this.onerror=null;this.src='https://placehold.co/900x600?text=TravelVista';"
                >

                <div class="card-body d-flex flex-column">

                    <span class="badge bg-primary align-self-start mb-2">
                        ${item.destination}
                    </span>

                    <h5 class="card-title">${item.name}</h5>

                    ${placeText}

                    <p class="text-warning mb-2">
                        <i class="bi bi-star-fill"></i>
                        ${item.rating}/5
                    </p>

                    <p class="text-muted">
                        <i class="bi bi-calendar3"></i>
                        ${item.duration}
                    </p>

                    <p class="card-text">
                        ${item.description}
                    </p>

                    <div class="mt-auto">
                        <h4 class="text-primary">
                            ₹${Number(item.price).toLocaleString("en-IN")}
                            <small class="text-muted fs-6">/ person</small>
                        </h4>

                        <a
                            href="${bookingUrl}"
                            class="btn btn-primary rounded-pill w-100 mt-2"
                        >
                            Book Now
                            <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>

                </div>
            </div>
        `;

        packageGrid.appendChild(card);
    });

    if (packageCount) {
        packageCount.textContent = `${list.length} packages found`;
    }
}

// Search, destination filter and sorting
function filterPackages() {
    const searchText = packageSearch
        ? packageSearch.value.trim().toLowerCase()
        : "";

    const destination = packageDestination
        ? packageDestination.value
        : "all";

    const sortValue = packageSort
        ? packageSort.value
        : "default";

    let filtered = packages.filter((item) => {
        const searchableText =
            `${item.name} ${item.destination} ${item.place || ""} ${item.description}`
                .toLowerCase();

        const matchesSearch = searchableText.includes(searchText);

        const matchesDestination =
            destination === "all" ||
            item.destination.toLowerCase() === destination.toLowerCase();

        return matchesSearch && matchesDestination;
    });

    if (sortValue === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    displayPackages(filtered);
}

// Select destination from the URL
function loadDestinationFromURL() {
    if (!packageDestination || !selectedDestination) return;

    const matchingOption = Array.from(packageDestination.options).find(
        (option) =>
            option.value.toLowerCase() === selectedDestination.toLowerCase()
    );

    if (matchingOption) {
        packageDestination.value = matchingOption.value;
    }
}

// Reset search and sorting
function resetAllPackages() {
    if (packageSearch) {
        packageSearch.value = "";
    }

    if (packageSort) {
        packageSort.value = "default";
    }

    if (packageDestination) {
        packageDestination.value = "all";
    }

    // Reset to all packages and clear URL parameters.
    window.location.href = window.location.pathname;
}

// Event listeners
if (packageSearch) {
    packageSearch.addEventListener("input", filterPackages);
}

if (packageDestination) {
    packageDestination.addEventListener("change", filterPackages);
}

if (packageSort) {
    packageSort.addEventListener("change", filterPackages);
}

if (resetPackages) {
    resetPackages.addEventListener("click", resetAllPackages);
}

// Initialize page
loadDestinationFromURL();
updatePackageHeading();
displayPackages(packages);