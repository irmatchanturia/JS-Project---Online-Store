// let accessToken = "";

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
  try {
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

    if (!res.ok) {
      throw new Error(data.errorKeys.join(" "));
    }
    // sessionStorage.setItem("token", JSON.stringify(data._id));
    window.location.href = "login.html";
  } catch (error) {
    alert(`Registration is not Succesfull: ${error.message}`);
  }
}

//ავტორიზაცია
async function signIn(event) {
  event.preventDefault(); // რეფრეშის გაჩერება

  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;
  try {
    const res = await fetch("https://api.everrest.educata.dev/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    // accessToken = data.access_token;

    if (!res.ok) {
      throw new Error(data.errorKeys.join(" "));
    }
    // შენახვა sessionStorage-ში
    sessionStorage.setItem("token", data.access_token);
    window.location.href = "main-page.html";
  } catch (error) {
    alert(`Sign in is not Succesfull: ${error.message}`);
  }
}
