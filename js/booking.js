
const urlParams = new URLSearchParams(window.location.search);

const destination = urlParams.get("destination") || "";
const place = urlParams.get("place") || "";
const packageName = urlParams.get("package") || "Travel Package";

const price = Number(urlParams.get("price")) || 15000;


// Elements

const bookingForm = document.getElementById("bookingForm");

const customerName = document.getElementById("customerName");
const customerEmail = document.getElementById("customerEmail");
const customerMobile = document.getElementById("customerMobile");

const travelDate = document.getElementById("travelDate");
const persons = document.getElementById("persons");
const transport = document.getElementById("transport");
const specialRequest = document.getElementById("specialRequest");

const summaryDestination =
    document.getElementById("summaryDestination");

const summaryPlace =
    document.getElementById("summaryPlace");

const summaryPackage =
    document.getElementById("summaryPackage");

const pricePerPerson =
    document.getElementById("pricePerPerson");

const summaryPersons =
    document.getElementById("summaryPersons");

const totalPrice =
    document.getElementById("totalPrice");


// Show package information

summaryDestination.textContent =
    destination || "Not selected";

summaryPlace.textContent =
    place || "Not selected";

summaryPackage.textContent =
    packageName;

pricePerPerson.textContent =
    "₹" + price.toLocaleString("en-IN");


// Set minimum travel date

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1)
    .padStart(2, "0");

const day = String(today.getDate())
    .padStart(2, "0");

travelDate.min =
    `${year}-${month}-${day}`;


// Calculate total

function updateTotal() {

    const numberOfPersons =
        Number(persons.value) || 1;

    summaryPersons.textContent =
        numberOfPersons;

    const total =
        price * numberOfPersons;

    totalPrice.textContent =
        "₹" + total.toLocaleString("en-IN");
}

persons.addEventListener(
    "change",
    updateTotal
);

updateTotal();


// Submit booking

bookingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const numberOfPersons =
            Number(persons.value);

        const totalAmount =
            price * numberOfPersons;


        // Create booking object

        const booking = {

            id:
                "TV" +
                Date.now(),

            name:
                customerName.value.trim(),

            email:
                customerEmail.value.trim(),

            mobile:
                customerMobile.value.trim(),

            destination:
                destination,

            place:
                place,

            packageName:
                packageName,

            travelDate:
                travelDate.value,

            persons:
                numberOfPersons,

            transport:
                transport.value,

            specialRequest:
                specialRequest.value.trim(),

            pricePerPerson:
                price,

            totalAmount:
                totalAmount,

            bookingStatus:
                "Pending Payment",

            paymentStatus:
                "Pending",

            bookedAt:
                new Date().toISOString()

        };


        // Save temporary booking

        sessionStorage.setItem(
            "travelVistaPendingBooking",
            JSON.stringify(booking)
        );


        // Go to payment page

        window.location.href =
            "payment.html";

    }
);
