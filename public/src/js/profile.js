const token = sessionStorage.getItem("token");
const email = sessionStorage.getItem("email");
const username = sessionStorage.getItem("username");
if (!token) {
  window.location.href = "/";
}

document.getElementById("name").textContent = username;
document.getElementById("email").textContent = email;

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("user_id");
  sessionStorage.removeItem("registered");
  window.location.href = "/";
});
