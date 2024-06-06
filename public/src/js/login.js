document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("token");
  const registered = sessionStorage.getItem("registered");

  if (registered === "true") {
    showAlert("Successfully registered", "success");
    sessionStorage.removeItem("registered");
  }

  if (token) {
    window.location.href = "/dashboard";
  }

  document.getElementById("loginForm").addEventListener("submit", handleLogin);

  document.querySelectorAll(".toggle-password").forEach((icon) => {
    icon.addEventListener("click", () =>
      togglePassword(icon.previousElementSibling.id)
    );
  });
});

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      handleSuccessfulLogin(result.data);
    } else {
      showAlert(result.message, "danger");
    }
  } catch (error) {
    console.error("Internal server error!", error);
  }
}

function handleSuccessfulLogin(data) {
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("username", data.name);
  sessionStorage.setItem("email", data.email);
  sessionStorage.setItem("user_id", data.id);
  window.location.href = "/dashboard";
}

function showAlert(message, type) {
  const alert = document.getElementById("alert");
  alert.classList.remove("d-none");
  alert.classList.add(`alert-${type}`);
  alert.textContent = message;
}

function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  const icon = field.nextElementSibling;

  field.type = field.type === "password" ? "text" : "password";
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
}
