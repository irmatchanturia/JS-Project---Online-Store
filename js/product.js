const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
let cartButton = document.getElementsByClassName("cart-btn")[0];

async function getProduct() {
  try {
    const response = await fetch(
      `https://api.everrest.educata.dev/shop/products/id/${productId}`,
    );

    const product = await response.json();

    renderProduct(product);
  } catch (error) {
    console.log(error);
  }
}

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function renderProduct(product) {
  document.querySelector(".product-image").src = product.thumbnail;
  document.querySelector(".product-image").alt = product.title;

  document.querySelector(".title").textContent = product.title;

  document.querySelector(".price").textContent = `${product.price.current}$`;

  document.querySelector(".brand").textContent =
    `Brand: ${capitalize(product.brand)}`;

  document.querySelector(".category").textContent =
    `Category: ${capitalize(product.category.name)}`;

  document.querySelector(".rating").textContent = `⭐ ${product.rating}`;

  document.querySelector(".stock").textContent =
    product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock";

  document.querySelector(".description").textContent = product.description;

  if (product.stock <= 0) {
    cartButton.style.display = "none";
  }
}

getProduct();

//პროდუქტის დამატება კალათაში
async function addProductToCart() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    showPopup("Please Confirm Authorization.");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2500);
    return;
  }

  const response = await fetch(
    "https://api.everrest.educata.dev/shop/cart/product",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: productId,
        quantity: 1,
      }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return;
  }
  showPopup("✅Product successfully added to cart 🛒");
}

function showPopup(message) {
  const popup = document.getElementById("popup");
  const text = document.getElementById("popup-text");

  text.innerText = message;
  popup.classList.remove("hidden");

  // auto close
  setTimeout(() => {
    popup.classList.add("hidden");
  }, 2500);
}
