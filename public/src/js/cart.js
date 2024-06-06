const token = sessionStorage.getItem("token");
if (!token) {
  window.location.href = "/";
}

const userId = sessionStorage.getItem("user_id");
let total = 0;

document.querySelector("#payBtn").addEventListener("click", payBill);

async function addToCart(product_id) {
  try {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        product_id: product_id.toString(),
      }),
    });

    if (response.ok) {
      fetchCartItems();
    } else {
      console.error(await response.json());
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
}

async function fetchCartItems() {
  try {
    const cartResponse = await fetch(`/api/cart/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const cartItems = await cartResponse.json();
    const productDetails = await Promise.all(
      cartItems.data.map((item) => fetchProductDetails(item.product_id))
    );

    const combinedCartItems = combineCartItems(cartItems.data);
    displayCartItems(combinedCartItems, productDetails);
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
}

async function fetchProductDetails(productId) {
  try {
    const productResponse = await fetch(`/product/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await productResponse.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

function combineCartItems(cartItems) {
  return Object.values(
    cartItems.reduce((acc, item) => {
      acc[item.product_id] = acc[item.product_id] || { ...item, quantity: 0 };
      acc[item.product_id].quantity += item.quantity;
      return acc;
    }, {})
  );
}

function displayCartItems(cartItems, productDetails) {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const product = productDetails.find(
      (product) => product.data.id === item.product_id
    );
    const subTotal = product.data.price * item.quantity;
    total += subTotal;

    const cartRow = document.createElement("tr");
    cartRow.innerHTML = `
      <td>
        <div class="d-flex align-items-center">
          <img src="/image/product/${product.data.image}" alt="${product.data.name}" class="table-img me-3" style="width: 100px; height: 100px; object-fit: cover;">
          <div>
            <div>${product.data.name}</div>
            <div>Rp. ${product.data.price}</div>
          </div>
        </div>
      </td>
      <td>
        <div class="d-flex align-items-center">
          <button class="btn btn-outline-secondary qty-btn" onclick="removeItem(${item.id})">-</button>
          <span class="mx-3">${item.quantity}</span>
          <button class="btn btn-outline-secondary qty-btn" onclick="addToCart(${product.data.id})">+</button>
        </div>
      </td>
      <td>Rp. ${subTotal}</td>
      <td><button class="remove-btn btn btn-danger" onclick="removeItem(${item.id})">Remove Item</button></td>
    `;
    cartContainer.appendChild(cartRow);
  });

  updateTotal(cartItems, productDetails);
}

function updateTotal(cartItems, productDetails) {
  let total = 0;
  cartItems.forEach((item) => {
    const product = productDetails.find(
      (product) => product.data.id === item.product_id
    );
    total += product.data.price * item.quantity;
  });

  const totalRow = document.createElement("tr");
  totalRow.classList.add("total-row");
  totalRow.innerHTML = `
    <td colspan="2" class="text-end">Total</td>
    <td id="sub-total">Rp. ${total}</td>
    <td></td>
  `;
  document.getElementById("cart-items").appendChild(totalRow);
}

async function removeItem(itemId) {
  try {
    const response = await fetch(`/cart/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      fetchCartItems();
    }
  } catch (error) {
    console.error("Error removing item:", error);
  }
}

async function payBill() {
  try {
    const cartResponse = await fetch(`/api/cart/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const cartItems = await cartResponse.json();
    if (cartItems.data.length !== 0) {
      console.log(cartItems.data);
      await Promise.all(cartItems.data.map((item) => payCartItem(item.id)));

      const subTotalElement = document.querySelector("#sub-total");
      const subTotalText = subTotalElement.textContent;
      sessionStorage.setItem("total", subTotalText);
      window.location.href = "/payment";
    }
  } catch (error) {
    console.error("Error paying bill:", error);
  }
}

async function payCartItem(cartId) {
  try {
    const response = await fetch(`/api/cart/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Payment failed.");
    }
  } catch (error) {
    console.error("Error paying cart item:", error);
  }
}

// Fetch cart items on page load
fetchCartItems();
