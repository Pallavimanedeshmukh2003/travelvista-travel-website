// =====================================
// SIGNUP
// =====================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const mobile =
            document.getElementById("signupMobile").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Password check

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }


        // User object

        const user = {

            name: name,

            email: email,

            mobile: mobile,

            password: password

        };


        // Save user

        localStorage.setItem(
            "travelVistaUser",
            JSON.stringify(user)
        );


        alert(
            "Account created successfully!"
        );


        // Go to login

        window.location.href = "login.html";

    });

}


// =====================================
// LOGIN
// =====================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        // Get saved user

        const savedUser =
            JSON.parse(
                localStorage.getItem("travelVistaUser")
            );


        if (!savedUser) {

            alert(
                "No account found. Please Sign Up first."
            );

            return;
        }


        // Check login

        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            localStorage.setItem(
                "travelVistaLoggedIn",
                "true"
            );


            localStorage.setItem(
                "travelVistaUserName",
                savedUser.name
            );


            alert(
                "Login successful! Welcome " +
                savedUser.name
            );


            window.location.href =
                "index.html";

        } else {

            alert(
                "Invalid email or password!"
            );

        }

    });

}


// =====================================
// SHOW / HIDE PASSWORD
// =====================================

const showPassword =
    document.getElementById("showPassword");


if (showPassword) {

    showPassword.addEventListener(
        "click",
        function () {

            const password =
                document.getElementById("loginPassword");


            if (password.type === "password") {

                password.type = "text";

                this.innerHTML =
                    '<i class="bi bi-eye-slash"></i>';

            } else {

                password.type = "password";

                this.innerHTML =
                    '<i class="bi bi-eye"></i>';

            }

        }
    );

}