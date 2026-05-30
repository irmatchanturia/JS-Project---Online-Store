let productsTag = document.getElementsByClassName("products")[0];
let pagination = document.getElementsByClassName("pagination")[0];
let index = 1;
let selectedCategories = [];

//ვიძახებთ პროდუქტების პირველ გვერდს
getProducts(index);

function getProducts() {
  pagination.innerHTML = ""; //პაგინაციების სექციის დაცარიელება
  productsTag.innerHTML = ""; //პროდუქტების სექციის დაცარიელება

  let url = "";
  //მონაცემების წამოღება დინამიურად, ინდექსით
  if (selectedCategories.length == 1) {
    url = `https://api.everrest.educata.dev/shop/products/category/${selectedCategories[0]}?page_index=${index}&page_size=6`;
  } else {
    url = `https://api.everrest.educata.dev/shop/products/all?page_index=${index}&page_size=6`;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
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
    </div>
    `;
}

//დაკლიკებაზე რეაგირების ფუნქცია
function addClicksOnIndecies() {
  document.querySelectorAll(".index").forEach((element) => {
    element.addEventListener("click", () => {
      index=element.textContent
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
  index=1;
  getProducts();
}