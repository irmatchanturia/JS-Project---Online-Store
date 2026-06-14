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
