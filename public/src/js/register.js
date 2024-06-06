const token = sessionStorage.getItem("token");
if (token) {
  window.location.href = "/dashboard";
}

// Constants for Selectors
const registerForm = document.getElementById("registerForm");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const retypePasswordField = document.getElementById("retype-password");
const alertBox = document.getElementById("alert");

// Show Alert Function
function showAlert(message) {
  alertBox.classList.remove("d-none");
  alertBox.textContent = message;
}

// Toggle Password Visibility Function
function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  const icon = field.nextElementSibling;
  const isPassword = field.type === "password";

  field.type = isPassword ? "text" : "password";
  icon.classList.toggle("fa-eye", !isPassword);
  icon.classList.toggle("fa-eye-slash", isPassword);
}

// Validate Form Fields
function validateForm(password, retypePassword) {
  if (password !== retypePassword) {
    showAlert("Passwords do not match!");
    return false;
  }
  return true;
}

// Handle Form Submission
async function handleFormSubmit(e) {
  e.preventDefault();

  const name = nameField.value;
  const email = emailField.value;
  const password = passwordField.value;
  const retypePassword = retypePasswordField.value;

  if (!validateForm(password, retypePassword)) {
    return;
  }

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      sessionStorage.setItem("registered", "true");
      window.location.href = "/";
    } else {
      showAlert(result.message || "Registration failed!");
    }
  } catch (error) {
    console.error("Internal server error!", error);
    showAlert("Internal server error!");
  }
}

// Event Listener for Form Submission
registerForm.addEventListener("submit", handleFormSubmit);
