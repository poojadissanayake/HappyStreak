// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

function logout() {
  document.querySelector("#logout").addEventListener("click", function () {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  });
}

$(document).ready(function () {
  if (window.localStorage.getItem("token")) {
    document.querySelector("#login").style.display = "none";
    document.querySelector("#logout").style.display = "block";
    document.querySelector("#profileId").style.display = "block";
  } else if (!window.localStorage.getItem("token")) {
    document.querySelector("#login").style.display = "block";
    document.querySelector("#logout").style.display = "none";
    document.querySelector("#profileId").style.display = "none";
  }

  logout();
});
