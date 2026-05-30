let products = document.getElementsByClassName("products")[0];

function getAllProducts() {
  fetch(
    "https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=6",
  )
    .then((response) => response.json())
    .then((data) => {
      data.products.forEach((item) => {
        products.innerHTML += productHtml(item);
      });
    });
}
getAllProducts();

function productHtml(item) {
  return `
       <div class="product">
      <img referrerpolicy="no-referrer" src="${item.thumbnail}" />
      <div class="info">
      <p class="title">${item.title}</p>
      <div class="rating">
        <p>${getStar(item.rating)}</p>
        <p>(${item.stock})</p>
      </div>
      <div class="price">
        <p class="price current-price">${item.price.current}$</p>
        <p class="price before-discount">${item.price.beforeDiscount}$</p>
        <p class="price discount-persentage">${item.price.discountPercentage}%</p>
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


const sideBar= document.getElementsByClassName("side-bar")[0]
function getAllCategories(){
    fetch("https://api.everrest.educata.dev/shop/products/categories")
    .then((response)=>response.json())
    .then((data)=>{
        data.forEach((category)=>{
            sideBar.innerHTML+=categoryHtml(category)
        });
    });
};
getAllCategories()

function categoryHtml(category){
    return `
    <div class="category">
    <input type="checkbox">
    <img src=${category.image}>
    <p>${category.name}</p>
    </div>
    `
}
