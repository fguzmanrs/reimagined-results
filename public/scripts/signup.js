$(document).ready(() => {
  $("#signupBtn").click(async e => {
    console.log("ddd");
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

    console.log(result);
  });
});
