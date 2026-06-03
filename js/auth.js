let accessToken = "";

//რეგისტრაცია
async function signUp(event) {
  event.preventDefault(); // form refresh-ის შეჩერება

  const userData = {
    firstName: document.getElementById("signup-firstName").value,
    lastName: document.getElementById("signup-lastName").value,
    age: Number(document.getElementById("signup-age").value),
    email: document.getElementById("signup-email").value,
    password: document.getElementById("signup-password").value,
    address: document.getElementById("signup-address").value,
    phone: document.getElementById("signup-phone").value,
    zipcode: document.getElementById("signup-zipcode").value,
    avatar: document.getElementById("signup-avatar").value,
    gender: document.getElementById("signup-gender").value,
  };

  const res = await fetch("https://api.everrest.educata.dev/auth/sign_up", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  console.log("STATUS:", res.status);
  console.log("RESPONSE:", data);

  console.log(data);
  alert("Signed up successfully");
}

//ავტორიზაცია
async function signIn(event) {
  event.preventDefault(); // 🔴 refresh stop

  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  const res = await fetch("https://api.everrest.educata.dev/auth/sign_in", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  accessToken = data.access_token;

  // შენახვა sessionStorage-ში
  sessionStorage.setItem("token", JSON.stringify(data));

  console.log(data);
  alert("Signed in successfully");
}

//current user-ზე წვდომა token-ის საშალებით
async function getCurrentUser() {
  // token ყოველთვის აქედან ვიღებთ
  const token = JSON.parse(sessionStorage.getItem("token"))?.access_token;

  if (!token) {
    alert("ჯერ Sign in გააკეთე");
    return;
  }

  const res = await fetch("https://api.everrest.educata.dev/auth", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const user = await res.json();

  document.getElementById("user-info").innerHTML = `
    <p>Name: ${user.firstName}</p>
    <p>Email: ${user.email}</p>
    <p>Age: ${user.age}</p>
  `;

  console.log(user);
}
