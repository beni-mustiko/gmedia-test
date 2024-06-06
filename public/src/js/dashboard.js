const token = sessionStorage.getItem("token");
if (!token) {
  window.location.href = "/";
}
const userId = sessionStorage.getItem("user_id");

document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
});

async function fetchCategories() {
  try {
    const response = await fetchWithAuth("/category");
    const categories = await response.json();
    renderCategories(categories.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

function renderCategories(categories) {
  const categoryContainer = document.getElementById("category");
  categoryContainer.innerHTML = "";

  categories.forEach((category, index) => {
    const categoryButton = createCategoryButton(category, index);
    categoryContainer.appendChild(categoryButton);
  });
}

function createCategoryButton(category, index) {
  const categoryButton = document.createElement("button");
  categoryButton.classList.add("btn", "btn-outline-primary", "category-btn");
  categoryButton.textContent = category.name;
  categoryButton.dataset.categoryId = category.id;

  if (index === 0) {
    categoryButton.classList.add("active");
    fetchProducts(category.id);
  }

  categoryButton.addEventListener("click", () => {
    document
      .querySelectorAll(".category-btn")
      .forEach((btn) => btn.classList.remove("active"));
    categoryButton.classList.add("active");
    fetchProducts(category.id);
  });

  return categoryButton;
}

async function fetchProducts(categoryId) {
  try {
    const response = await fetchWithAuth(`/product/category/${categoryId}`);
    const products = await response.json();
    renderProducts(products.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function renderProducts(products) {
  const productContainer = document.getElementById("product");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = createProductCard(product);
    productContainer.appendChild(productCard);
  });

  addEventListenersToProductButtons();
  fetchCartItems();
}

function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("col");
  productCard.dataset.productId = product.id;

  productCard.innerHTML = `
    <div class="card">
      <div class="d-none product-id">${product.id}</div>
      <img src="/image/product/${product.image}" class="card-img-top" alt="Product Image">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <h5 class="card-title">${product.name}</h5>
          </div>
          <div class="col">
            <button class="btn btn-danger btn-sm mb-2 btn-delete-product">Delete</button>
          </div>
        </div>
        <p class="card-text">Rp. ${product.price}</p>
        <button class="btn btn-primary btn-custom btn-add-to-cart">+ Add to Cart</button>
      </div>
    </div>`;

  return productCard;
}

function addEventListenersToProductButtons() {
  const btnAddToCarts = document.querySelectorAll(".btn-add-to-cart");
  const btnDeleteProduct = document.querySelectorAll(".btn-delete-product");
  const productIds = document.querySelectorAll(".product-id");

  btnAddToCarts.forEach((btnAddToCart, index) => {
    btnAddToCart.addEventListener("click", async () => {
      const productId = productIds[index].textContent;
      try {
        await addToCart(userId, productId);
        fetchCartItems();
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    });
  });

  btnDeleteProduct.forEach((btn, index) => {
    btn.addEventListener("click", async (event) => {
      const productId = productIds[index].textContent;
      try {
        await deleteProduct(productId);
        const productCard = event.target.closest(".card");
        productCard.remove();
        fetchCartItems();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    });
  });
}

async function fetchCartItems() {
  try {
    const response = await fetchWithAuth(`/api/cart/${userId}`);
    const cartItems = await response.json();
    const productDetails = await fetchProductDetails(
      cartItems.data.map((item) => item.product_id)
    );
    updateTotal(cartItems.data, productDetails);
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}

async function fetchProductDetails(productIds) {
  try {
    const productDetails = await Promise.all(
      productIds.map((id) =>
        fetchWithAuth(`/product/${id}`).then((response) => response.json())
      )
    );
    return productDetails;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

function combineCartItem(cartItems) {
  const combinedItems = {};

  cartItems.forEach((item) => {
    if (combinedItems[item.product_id]) {
      combinedItems[item.product_id].quantity += item.quantity;
    } else {
      combinedItems[item.product_id] = { ...item };
    }
  });

  return Object.values(combinedItems);
}

function updateTotal(cartItems, productDetails) {
  const combinedCartItems = combineCartItem(cartItems);
  let total = 0;

  combinedCartItems.forEach((item) => {
    const product = productDetails.find(
      (product) => product.data.id === item.product_id
    );
    total += product.data.price * item.quantity;
  });

  document.querySelector(".subtotal").textContent = `Total bill: Rp. ${total}`;
}

async function fetchWithAuth(url, options = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
}

async function addToCart(userId, productId) {
  const response = await fetchWithAuth("/api/cart", {
    method: "POST",
    body: JSON.stringify({ user_id: userId, product_id: productId }),
  });
  return response.json();
}

async function deleteProduct(productId) {
  const response = await fetchWithAuth(`/product/${productId}`, {
    method: "DELETE",
  });
  return response.json();
}
