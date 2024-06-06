const token = sessionStorage.getItem("token");
if (!token) {
  window.location.href = "/";
}
document
  .getElementById("addCategoryForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const name = document.getElementById("name").value;

      const response = await fetch("/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();
      const { message, data } = result;
      if (response.ok) {
        showAlert(message, "success");
      } else {
        const { message } = errors[0];
        showAlert(message, "danger");
      }
    } catch (error) {
      console.error("Internal server error!", error);
    }
  });

function showAlert(message, type) {
  const alert = document.getElementById("alert");
  alert.classList.remove("d-none", "alert-success", "alert-danger");
  alert.classList.add("alert-" + type);
  alert.textContent = message;
}
