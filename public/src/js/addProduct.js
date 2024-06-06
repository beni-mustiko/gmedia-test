const token = sessionStorage.getItem("token");
if (!token) {
  window.location.href = "/";
}

async function fetchCategories() {
  try {
    const response = await fetch("/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await response.json();

    if (!data || data.length === 0) {
      showAlert("Category is empty, please add category first", "danger");
      return;
    }

    const productCategory = document.getElementById("productCategory");
    productCategory.innerHTML = "";

    data.forEach((category) => {
      const categoryOption = document.createElement("option");
      categoryOption.value = category.id;
      categoryOption.textContent = category.name;
      productCategory.appendChild(categoryOption);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    showAlert("Error fetching categories: " + error.message, "danger");
  }
}

function handleImagePreview() {
  const label = document.querySelector(".upload-placeholder label");
  const imgPreview = document.getElementById("productImagePreview");
  const fileInput = document.getElementById("productImage");

  if (fileInput.files && fileInput.files.length > 0) {
    label.textContent = fileInput.files[0].name;
    const reader = new FileReader();
    reader.onload = function (e) {
      imgPreview.src = e.target.result;
      imgPreview.style.display = "block";
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    label.textContent = "Upload Image";
    imgPreview.style.display = "none";
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = document.getElementById("addProductForm");
  const formData = new FormData(form);
  const productImage = document.getElementById("productImage").files[0];

  if (!productImage) {
    showAlert("Please upload an image", "danger");
    return;
  }

  try {
    const response = await fetch("/product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      showAlert("Product added successfully!", "success");
    } else {
      const result = await response.json();
      const errorMessage =
        result.errors && result.errors.length > 0
          ? result.errors[0].message
          : "Error adding product";
      showAlert(errorMessage, "danger");
    }
  } catch (error) {
    showAlert("Error adding product: " + error.message, "danger");
  }
}

function showAlert(message, type) {
  const alert = document.getElementById("alert");
  alert.classList.remove("d-none", "alert-success", "alert-danger");
  alert.classList.add("alert-" + type);
  alert.textContent = message;
}

document
  .getElementById("productImage")
  .addEventListener("change", handleImagePreview);
document
  .getElementById("addProductForm")
  .addEventListener("submit", handleFormSubmit);

fetchCategories();
