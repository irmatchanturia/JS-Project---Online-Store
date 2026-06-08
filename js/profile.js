//მონაცემების დარედაქტირება და ცვლილებების შენახვა
document
  .getElementById("update-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const userData = {
      firstName: document.getElementById("update-firstName").value,
      lastName: document.getElementById("update-lastName").value,
      age: document.getElementById("update-age").value,
      email: document.getElementById("update-email").value,
      phone: document.getElementById("update-phone").value,
      address: document.getElementById("update-address").value,
      zipcode: document.getElementById("update-zipcode").value,
      avatar: document.getElementById("update-avatar").value,
      gender: document.getElementById("update-gender").value,
    };

    fetch("https://api.everrest.educata.dev/auth/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("token"))?.access_token,
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Changes saved successfully!");
        }
      });
  });

//პაროლის ცვლილება
document
  .getElementById("change-password-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const passwordData = {
      oldPassword: document.getElementById("current-password").value,
      newPassword: document.getElementById("new-password").value,
    };

    fetch("https://api.everrest.educata.dev/auth/change_password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("token"))?.access_token,
      },
      body: JSON.stringify(passwordData),
    })
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Password changed successfully!");
        }
      });
  });

//ანგარიშის წაშლა
document.getElementById("delete-form").addEventListener("click", function () {
  fetch("https://api.everrest.educata.dev/auth/delete", {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.getItem("token"))?.access_token,
    },
  })
    .then((res) => {
      console.log(res.status);
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        alert("Your Account is Deleted!");
        window.location.href = "index.html";
      }
    });
});
