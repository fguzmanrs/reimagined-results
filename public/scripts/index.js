// const axios = require("axios").default;

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

  $("#loginBtn").on("click", async e => {
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
      alert("Incorrect username or password");
    }
  });

  $("#signupBtn").on("click", async e => {
    console.log("signup clicked");

    location.assign("/signUp.html");
  });
});


// $(document).ready(function(){
   // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  //  $('.modal-trigger').leanModal();
  
// });
