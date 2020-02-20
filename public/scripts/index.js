const visibilityToggle = document.querySelector(".visibility");

const input = document.querySelector(".pass");

var pwVisible = false;

visibilityToggle.addEventListener("click", function() {
  if (pwVisible === false) {
    input.setAttribute("type", "text");
    pwVisible = true
  } else {
    input.setAttribute("type", "password");
    pwVisible = false }
});

function logIn() {
  document.getElementById('form1').submit();
  }