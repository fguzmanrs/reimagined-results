$(document).ready(() => {
  // turns on/off pw visibility (PJS)
  const visibilityToggle = document.querySelector(".visibility");
  const input = document.querySelector(".pass");
  let pwVisible = false;

  visibilityToggle.addEventListener("click", function() {
    if (pwVisible === false) {
      input.setAttribute("type", "text");
      pwVisible = true;
    } else {
      input.setAttribute("type", "password");
      pwVisible = false;
    }
  });

  $("#signupBtn").click(async e => {
    try {
      const firstName = $("#firstName").val();
      const lastName = $("#lastName").val();
      const username = $("#username").val();
      const password = $("#password").val();

      console.log("data: ", firstName, lastName, username, password);

      const result = await axios.post("/api/users/signup", {
        firstName,
        lastName,
        username,
        password
      });

      if (result.status === 200) {
        alert(result.data.message);
        location.assign("/overview.html");
      }
    } catch (err) {
      $("#alert")
        .text(err.response.data.message)
        .css("color", "red");
    }
  });
});
