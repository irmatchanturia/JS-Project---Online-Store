let productsTag = document.getElementsByClassName("products")[0];
let pagination = document.getElementsByClassName("pagination")[0];
let index = 1;
let selectedCategories = [];
let sideBarBrands = document.getElementsByClassName("side-bar-brands")[0];

let request = {
  category_id: undefined,
  brand: undefined,
  rating: undefined,
  price_min: undefined,
  price_max: undefined,
};

//ვიძახებთ პროდუქტების პირველ გვერდს
getProducts(index);
getBrands();

function getProducts() {
  pagination.innerHTML = ""; //პაგინაციების სექციის დაცარიელება
  productsTag.innerHTML = ""; //პროდუქტების სექციის დაცარიელება

  let url = `https://api.everrest.educata.dev/shop/products/search?page_index=${index}&page_size=6`;
  if (request["category_id"] != undefined) {
    url += "&category_id=" + request.category_id;
  }
  if (request["brand"] != undefined) {
    url += "&brand=" + request.brand;
  }
  if (request["rating"] != undefined) {
    url += "&rating=" + request.rating;
  }
  if (request["price_min"] != undefined && request["price_min"] != 0) {
    url += "&price_min=" + request.price_min;
  }
  if (request["price_max"] != undefined) {
    url += "&price_max=" + request.price_max;
  }
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      handlePagination(data, index);
      data.products.forEach((item) => {
        productsTag.innerHTML += productHtml(item);
      });
    });
}

//პაგინაციის დაჰენდვლა
function handlePagination(data, index) {
  let panelNumber = Math.ceil(data.total / 6);
  for (let i = 1; i <= panelNumber; i++) {
    if (i == index) {
      pagination.innerHTML += `<p class="selected-index index">${i}</p>`;
    } else {
      pagination.innerHTML += `<p class = "index">${i}</p>`;
    }
  }
  addClicksOnIndecies(); //დაკლიკვაზე რეაგირების ფუნქცია
}

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
    <button class="add-to-cart">Add to Cart</button>
</div>
    `;
}

//დაკლიკებაზე რეაგირების ფუნქცია
function addClicksOnIndecies() {
  document.querySelectorAll(".index").forEach((element) => {
    element.addEventListener("click", () => {
      index = element.textContent;
      getProducts();
    });
  });
}

//ვარსკვლავების ფუნქცია, აბრუნებს ვარსკვლავებს რეითინგის მიხედვით
function getStar(num) {
  let starNumber = num;
  let stars = "";
  for (let i = 0; i < starNumber; i++) {
    stars += `<i class="fa-solid fa-star"></i>`;
  }
  return stars;
}

//საიდბარი
const sideBar = document.getElementsByClassName("side-bar-categories")[0];

//ყველა კატეგორია წამოვიღეთ
function getAllCategories() {
  fetch("https://api.everrest.educata.dev/shop/products/categories")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((category) => {
        sideBar.innerHTML += categoryHtml(category);
      });
    });
}
getAllCategories();

function categoryHtml(category) {
  return `
    <div class="category">
    <input type="checkbox" onclick ="onCategoryClicked(${category.id})">
    <img src=${category.image}>
    <p>${capitalizeFirstLetter(category.name)}</p>
    </div>
    `;
}

//კატეგორიის პირველი ასო გავადიდეთ
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//კატეგორიაზე დაკლიკება
function onCategoryClicked(id) {
  if (selectedCategories.includes(id)) {
    selectedCategories = selectedCategories.filter((item) => item !== id);
  } else {
    selectedCategories.push(id);
  }
  if (selectedCategories.length == 1) {
    request.category_id = selectedCategories[0];
  } else {
    request.category_id = undefined;
  }

  index = 1;
  getProducts();
}

let filterButton = document.getElementsByClassName("filter-btn")[0];
filterButton.addEventListener("click", () => {
  request.price_min = min;
  request.price_max = max;
  getProducts();
});

function getBrands() {
  fetch("https://api.everrest.educata.dev/shop/products/brands")
    .then((response) => response.json())
    .then((data) => {
      let brandHtml = `<select class="brand-drop">`;
      data.forEach((brand) => {
        brandHtml += `<option value="${brand}">${brand}</option>`;
      });
      brandHtml += `</select>`;
      sideBarBrands.innerHTML += brandHtml;
      addBrandSelectorListener();
    });
}

function addBrandSelectorListener() {
  let brandDrop = document.getElementsByClassName("brand-drop")[0]
  brandDrop.addEventListener("change", () => {
    request.brand = brandDrop.value;
  });
}
