const cartProducts = document.getElementsByClassName("cart-products")[0];

const token = sessionStorage.getItem("token");
async function getCart() {
  const response = await fetch("https://api.everrest.educata.dev/shop/cart", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    console.log("Error:", data);
    return;
  }
  console.log("Added to cart:", data);
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
        cartProducts.innerHTML += productHtml(data);
        console.log(data);
      });
  });
}

function productHtml(item) {
  return `
    <div class="cart-product">
      <img referrerpolicy="no-referrer" src="${item.thumbnail}" />

      <div class="cart-info">
        <p class="title">${item.title}</p>

        <div class="rating">
          <p>${getStar(item.rating)}</p>
          ${
            item.stock > 0
              ? `<p>(${item.stock})</p>`
              : `<p id="not-in-stock">Not in Stock</p>`
          }
        </div>

        <div class="cart-price">
          <p class="price cart-current-price">${item.price.current}$</p>

          ${
            item.price.current !== item.price.beforeDiscount
              ? `<p class="price cart-before-discount">${item.price.beforeDiscount}$</p>`
              : ""
          }

          ${
            item.price.discountPercentage > 0
              ? `<p class="price" id="cart-discount-percentage">${item.price.discountPercentage}%</p>`
              : ""
          }
        </div>

        ${
          item.stock > 0
            ? `<button class="cart-add-to-cart" onclick="addProductToCart('${item._id}')">
                Add to Cart
               </button>`
            : ""
        }
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
