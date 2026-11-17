
// Riverbend Yoga Studio - Touchstone 4

// Yoga class information
const yogaClasses = [
    {
        name: "Gentle Beginner Yoga",
        level: "Beginner",
        style: "Relaxing"
    },
    {
        name: "Restorative Yoga",
        level: "Intermediate",
        style: "Relaxing"
    },
    {
        name: "Advanced Relaxation Yoga",
        level: "Advanced",
        style: "Relaxing"
    },
    {
        name: "Beginner Vinyasa",
        level: "Beginner",
        style: "Strength"
    },
    {
        name: "Power Vinyasa",
        level: "Intermediate",
        style: "Strength"
    },
    {
        name: "Advanced Power Yoga",
        level: "Advanced",
        style: "Strength"
    },
    {
        name: "Beginner Stretching",
        level: "Beginner",
        style: "Flexibility"
    },
    {
        name: "Flexibility Flow",
        level: "Intermediate",
        style: "Flexibility"
    },
    {
        name: "Advanced Mobility",
        level: "Advanced",
        style: "Flexibility"
    }
];

// Store visitor preferences
let userPreferences = {
    level: "Beginner",
    style: "Relaxing"
};

// Find a matching yoga class
function recommendClass() {
    const level = document.getElementById("experience").value;
    const style = document.getElementById("yogaStyle").value;

    const match = yogaClasses.find(function(yogaClass) {
        return yogaClass.level === level &&
               yogaClass.style === style;
    });

    const result = document.getElementById("classResult");

    if (match) {
        result.textContent = "We recommend: " + match.name;

        userPreferences.level = level;
        userPreferences.style = style;

        localStorage.setItem(
            "yogaPreferences",
            JSON.stringify(userPreferences)
        );
    } else {
        result.textContent = "Please choose your preferences.";
    }
}

// Load saved preferences
function loadPreferences() {
    const saved = localStorage.getItem("yogaPreferences");

    if (saved) {
        userPreferences = JSON.parse(saved);

        document.getElementById("experience").value =
            userPreferences.level;

        document.getElementById("yogaStyle").value =
            userPreferences.style;

        recommendClass();
    }
}

// Validate the registration form
function validateRegistration(event) {
    const name = document.getElementById("visitorName");
    const email = document.getElementById("visitorEmail");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");

    nameError.textContent = "";
    emailError.textContent = "";

    let valid = true;

    if (name.value.trim().length < 2) {
        nameError.textContent =
            "Please enter your name (at least 2 characters).";
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent =
            "Please enter a valid email address.";
        valid = false;
    }

    if (!valid) {
        event.preventDefault();
        return;
    }

    localStorage.setItem("visitorName", name.value.trim());
    localStorage.setItem("visitorEmail", email.value.trim());
}

// Load saved form information
function loadRegistration() {
    const name = document.getElementById("visitorName");
    const email = document.getElementById("visitorEmail");

    if (name) {
        name.value = localStorage.getItem("visitorName") || "";
    }

    if (email) {
        email.value = localStorage.getItem("visitorEmail") || "";
    }
}

// Start the website features
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("experience")) {
        loadPreferences();

        document.getElementById("experience")
            .addEventListener("change", recommendClass);

        document.getElementById("yogaStyle")
            .addEventListener("change", recommendClass);
    }

    loadRegistration();

    const form = document.getElementById("registrationForm");

    if (form) {
        form.addEventListener("submit", validateRegistration);
    }
});
