//პაროლის აღდგენა/დარესეტება მეილზე ახალი პაროლის გაგზავნით

let emailField = document.getElementById("recovery-email");

async function recovery(event) {
  event.preventDefault();

  try {
    let request = {
      email: emailField.value,
    };
    const res = await fetch("https://api.everrest.educata.dev/auth/recovery", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(request),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("Recovery email sent!");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (error) {
    console.error(error);
    alert("Network error");
  }
}
