// const axios = require("axios").default;

$(document).ready(function() {
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

  $("#loginBtn:last").on("click", async e => {
    try {
      const username = $("#username").val();
      const password = $("#password").val();

      console.log("input: ", username, password);
      const result = await axios.post("/api/users/login", {
        username,
        password
      });

      console.log(result);

      location.assign("/overview.html");
      console.log("login succeded!");
    } catch (err) {
      $("#alert")
        .text(err.response.data.message)
        .css("color", "red");
    }
  });

  $("#signupBtn").on("click", async e => {
    console.log("signup clicked");

    location.assign("/signUp.html");
  });

  // Modal for error message
  // M.AutoInit();
  // const instance = M.Modal.getInstance($(".modal"));

  // instance.open();
});
