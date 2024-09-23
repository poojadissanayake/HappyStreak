function validateForm() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return false; // Prevent form submission if passwords don't match
  }

  return true; // Allow form submission if validation passes
}

$(document).ready(function () {
  // redirect the user to the profile page if the token is present
  if (window.localStorage.getItem("token")) {
    window.location.href = "/profile";
  }
});
