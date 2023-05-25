const container = document.querySelector(" #login-container ");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
registerLink.addEventListener("click", () => {
  container.classList.add("active");
});
loginLink.addEventListener("click", () => {
  container.classList.remove("active");
});

const loginbtn = document.getElementById("login");

loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("active-popup");
});

const closeIcon = document.querySelector(".close-icon");
closeIcon.addEventListener("click", (e) => {
  container.classList.remove("active-popup");
});
