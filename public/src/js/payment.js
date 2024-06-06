const token = sessionStorage.getItem("token");
if (!token) {
  window.location.href = "/";
}

const cartText = document.querySelector(".card-text");
const total = sessionStorage.getItem("total");
cartText.textContent = total;

const btnBack = document.querySelector(".btn-back");
btnBack.addEventListener("click", () => {
  sessionStorage.removeItem("total");
});
