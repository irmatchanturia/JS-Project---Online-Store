const cartProducts = document.getElementsByClassName("cart-products")[0];
const token = sessionStorage.getItem("token");
const subtotal = document.getElementsByClassName("subtotal")[0];
const discount = document.getElementsByClassName("discount")[0];
const total = document.getElementsByClassName("total")[0];

function calculateSummary(current, beforeDiscount) {
  subtotal.innerHTML = "$" + beforeDiscount;
  discount.innerHTML = "$" + (beforeDiscount - current);
  total.innerHTML = "$" + current;
}

async function getCart() {
  const response = await fetch("https://api.everrest.educata.dev/shop/cart", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    return;
  }
  calculateSummary(data.total.price.current, data.total.price.beforeDiscount);
  fetchProducts(data.products);
}
getCart();

function fetchProducts(products) {
  products.forEach((product) => {
    fetch(
      `https://api.everrest.educata.dev/shop/products/id/${product.productId}`,
    )
      .then((response) => response.json())
      .then((data) => {
        cartProducts.innerHTML += productHtml(data, product);
      });
  });
}

function productHtml(item, cartItem) {
  return `
    <div class="cart-product">

      <div class="cart-left">
        <img referrerpolicy="no-referrer" src="${item.thumbnail}" />
      </div>

      <div class="cart-info">

        <p class="title">${item.title}</p>

        <div class="rating">
          <div class="stars">${getStar(item.rating)}</div>
          ${
            item.stock > 0
              ? `<span class="stock">(${item.stock})</span>`
              : `<span class="out">Not in Stock</span>`
          }
        </div>

        <div class="bottom-row">

          <div class="cart-price">
            <p class="current">$${item.price.current}</p>

            ${
              item.price.current !== item.price.beforeDiscount
                ? `<p class="before">$${item.price.beforeDiscount}</p>`
                : ""
            }

            ${
              item.price.discountPercentage > 0
                ? `<p class="discount">-${item.price.discountPercentage}%</p>`
                : ""
            }
          </div>

          <div class="qty">
            <button onclick="changeQuantity('${cartItem.productId}', '${cartItem.quantity}', false)">-</button>
            <span>${cartItem.quantity}</span>
            <button onclick="changeQuantity('${cartItem.productId}', '${cartItem.quantity}', true)">+</button>
          </div>

        <button class="trash" onclick="removeFromCart('${cartItem.productId}')">
          🗑
        </button>

        </div>
      </div>
    </div>
  `;
}

function getStar(num) {
  let starNumber = num;
  let stars = "";
  for (let i = 0; i < starNumber; i++) {
    stars += `<i class="fa-solid fa-star"></i>`;
  }
  return stars;
}

//კალათიდან წაშლა
async function removeFromCart(id) {
  const response = await fetch(
    "https://api.everrest.educata.dev/shop/cart/product",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return;
  }

  cartProducts.innerHTML = "";
  getCart();
}

//პროდუქტის რაოდენობის ცვლილება
async function changeQuantity(productId, quantity, increase) {
  console.log("product id:" + productId);
  console.log("quantity:" + quantity);
  let newQuantity = 0;
  if (increase) {
    newQuantity = Number(quantity) + 1;
  } else {
    newQuantity = Number(quantity) - 1;
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
        quantity: newQuantity,
      }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return;
  }
  cartProducts.innerHTML = "";
  getCart();
}
