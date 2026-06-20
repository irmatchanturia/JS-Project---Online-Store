let productsTag = document.getElementsByClassName("products")[0]; //პროდუქტების სექციასთან წვდომა
let pagination = document.getElementsByClassName("pagination")[0]; //პაგინაციის ადგილთან წვდომა
let index = 1; //ინდექსის განსაზღვრა იმისთვის რომ თავიდან პირველი გვერდი ჩაიტვირთოს და მერე შეიცვალოს პაგინაციის მიხედვით
let selectedCategories = []; //არჩეული კატეგორიები ერეიში რომ მოექცეს
let sideBarBrands = document.getElementsByClassName("side-bar-brands")[0]; //ბრენდების ჩამონათვალთან წვდომა
let allProducts = "";
//ამ ობიექტით იქმნება ყოველ ჯერზე უნიკალური ლინკი, იმის მიხედვით რა მონაცემები შეგვყავს
let request = {
  category_id: undefined,
  brand: undefined,
  rating: undefined,
  price_min: undefined,
  price_max: undefined,
  keywords: undefined,
};

//ვიძახებთ პროდუქტების პირველ გვერდს
getProducts(index);
//გამოგვაქვს ბრენდების სახელები
getBrands();

//ეს არის ფუნქცია, რომლითაც ბექიდან მოგვაქვს პროდუქტები და რომელშიც ასევე გაწერილია ლინკების თავისებურებები
//და რომელიც პროდუქტების სექციაში ათავსებს ბექიდან წამოღებულ პროდუქტებს
function getProducts() {
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
  if (request["keywords"] != undefined && request["keywords"] != "") {
    url += "&keywords=" + request.keywords;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      pagination.innerHTML = ""; //პაგინაციების სექციის დაცარიელება
      productsTag.innerHTML = ""; //პროდუქტების სექციის დაცარიელება
      handlePagination(data, index);
      allProducts = data.products;
      data.products.forEach((item) => {
        productsTag.innerHTML += productHtml(item);
      });
    });
}

//პაგინაციის დაჰენდვლა - ამ ფუნქციაში განსაზღვრული გვაქვს ცვლადი, რომელიც პროდუქტების მთელ რაოდენობას
//ყოფს თითო გვერდზე რამდენი პროდუქტიც მინდა მაგაზე. შედეგად ვიღებთ შვიდ გვერდს, თითოეულზე 6 პროდუქტით.
//
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
      <a href="./product.html?id=${item._id}" class = "product-photo">
        <img referrerpolicy="no-referrer" src="${item.thumbnail}" />
      </a>
      <div class="info">
      <a href="./product.html?id=${item._id}" class="product-link">
        <p class="title">${item.title}</p>
      </a>
        <div class="rating">
          <p>${getStar(item.rating)}</p>
          ${item.stock > 0 ? `<p>(${item.stock})</p>` : ``}
        </div>

        <div class="price">
          <p class="price current-price">${item.price.current}$</p>

          ${
            item.price.current !== item.price.beforeDiscount
              ? `<p class="price before-discount">${item.price.beforeDiscount}$</p>`
              : ""
          }

          ${
            item.price.discountPercentage > 0
              ? `<p class="price" id="discount-percentage">${item.price.discountPercentage}%</p>`
              : ""
          }
        </div>

       ${
         item.stock > 0
           ? `<button class="add-to-cart" onclick="addProductToCart('${item._id}')">
               Add to Cart
              </button>`
           : `<button class="add-to-cart" disabled>
                Out of Stock
              </button>`
       }
      </div>
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
  for (let i = 1; i < starNumber; i++) {
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
    selectedCategories = selectedCategories.filter((item) => item !== id);//ამოაგდე ეს კონკრეტული კატეგორია selected category-იდან
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
  const selectedRating = document.querySelector('input[name="rating"]:checked');
  if (selectedRating.value != "All") {
    request.rating = Number(selectedRating.value);
  } else {
    request.rating = undefined;
  }
  getProducts();
});

function capitalizeBrandName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//ბრენდების წამოღება
function getBrands() {
  fetch("https://api.everrest.educata.dev/shop/products/brands")
    .then((response) => response.json())
    .then((data) => {
      let brandHtml = `<select class="brand-drop">`;
      brandHtml += `<option value="" selected disabled hidden>Choose Brand</option>`;
      data.forEach((brand) => {
        brandHtml += `<option value="${brand}"> ${capitalizeBrandName(brand)}</option>`;
      });
      brandHtml += `</select>`;
      sideBarBrands.innerHTML += brandHtml;
      addBrandSelectorListener();
    });
}

function addBrandSelectorListener() {
  let brandDrop = document.getElementsByClassName("brand-drop")[0];
  brandDrop.addEventListener("change", () => {
    request.brand = brandDrop.value;
  });
}

//სერჩის ამუშავების მცდელობა

function Search() {
  const searchBar = document.querySelector(".search-bar");
  pagination.innerHTML = ""; //პაგინაციების სექციის დაცარიელება
  if (!searchBar) return;
  searchBar.addEventListener("input", () => {
    request.keywords = searchBar.value;
    index = 1;
    getProducts();
  });
}

//pop up
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


//კალათა
//თუ ტოკენი არ აქვს, აღარ გააგრძელებს.
async function addProductToCart(id) {
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
        id: id,
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

