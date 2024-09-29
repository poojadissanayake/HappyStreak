$(document).ready(function () {
  // redirect page to login if token is not present
  if (!window.localStorage.getItem("token")) {
    window.location.href = "/login";
  }
});
