function setUpHeader() {
  const token = sessionStorage.getItem("token");
  const logOut = document.getElementsByClassName("logout")[0];
  const logIn = document.getElementsByClassName("login")[0];
  const signUp = document.getElementsByClassName("signupsec")[0];
  const myProfile = document.getElementsByClassName("profile")[0];
  const shoppingCart = document.getElementsByClassName("shopping-cart")[0];
  if (token) {
    logOut.style.display = "inline-block";
    myProfile.style.display = "inline-block";
    shoppingCart.style.display = "inline-block";
    logIn.style.display = "none";
    signUp.style.display = "none";
  } else {
    logOut.style.display = "none";
    logIn.style.display = "inline-block";
    signUp.style.display = "inline-block";
    myProfile.style.display = "none";
    shoppingCart.style.display = "none";
  }
}

function logOut() {
  sessionStorage.removeItem("token");
  setUpHeader();
  if (welcomeMessage) {
    welcomeMessage.innerHTML = ``;
  }
  window.location.href = "main-page.html";
}

//ბურგერ მენიუ
const burger = document.getElementById("burger");
const headerSecond = document.querySelector(".header-second-line");

burger.addEventListener("click", () => {
  headerSecond.classList.toggle("active");
});
