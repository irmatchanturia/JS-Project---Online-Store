let welcomeMessage = document.getElementById("welcome-message");

async function getCurrentUser() {
  const token = JSON.parse(sessionStorage.getItem("token"))?.access_token;

  if (!token) {
    return;
  }

  const res = await fetch("https://api.everrest.educata.dev/auth", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const user = await res.json();

  if (welcomeMessage) {
    welcomeMessage.innerHTML = `<p>Welcome, ${user.firstName}!</p>`;
  }

  if (document.getElementById("update-firstName")) {
    document.getElementById("update-firstName").value = user.firstName;
    document.getElementById("update-lastName").value = user.lastName;
    document.getElementById("update-email").value = user.email;
    document.getElementById("update-age").value = user.age;
    document.getElementById("update-address").value = user.address;
    document.getElementById("update-phone").value = user.phone;
    document.getElementById("update-zipcode").value = user.zipcode;
    document.getElementById("update-avatar").value = user.avatar;
    document.getElementById("update-gender").value = user.gender;
  }

  console.log(user);
}

getCurrentUser();