// const axios = require("axios").default;

// turns on/off pw visibility (PJS)
$(document).ready(() => {
  const visibilityToggle = document.querySelector(".visibility");

  const input = document.querySelector(".pass");

  var pwVisible = false;

  visibilityToggle.addEventListener("click", function() {
    if (pwVisible === false) {
      input.setAttribute("type", "text");
      pwVisible = true;
    } else {
      input.setAttribute("type", "password");
      pwVisible = false;
    }
  });

  $("#loginBtn").on("click", async e => {
    console.log("clicked");
    const username = $("#username").val();
    const password = $("#password").val();

    console.log("input: ", username, password);
    const result = await axios.post("/api/users/login", {
      username,
      password
    });

    console.log(result);
    if (result.status === 200) {
      location.assign("/overview.html");
      console.log("login succeded!");
    } else {
      alert("fail");
      console.log("login failed!");
    }
  });

  $("#signupBtn").on("click", async e => {
    console.log("signup clicked");

    location.assign("/signUp.html");
  });
});
