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
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>

          <button class="trash">
            🗑
          </button>

        </div>

        ${
          item.stock > 0
            ? `<button class="add-btn" onclick="addProductToCart('${item._id}')">
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
