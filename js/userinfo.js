let welcomeMessage = document.getElementById("welcome-message");

//current user-ზე წვდომა token-ის საშალებით
async function getCurrentUser() {
  // token ყოველთვის აქედან ვიღებთ
  const token = JSON.parse(sessionStorage.getItem("token"))?.access_token;

  if (!token) {
    alert("shit aint sweet")
    return;
  }

  const res = await fetch("https://api.everrest.educata.dev/auth", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const user = await res.json();

  welcomeMessage.innerHTML = `
    <p> Welcome, ${user.firstName}!</p>
  `;

  console.log(user);
}
getCurrentUser();
