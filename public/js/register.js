function validateForm() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return false; // Prevent form submission if passwords don't match
  }

  return true; // Allow form submission if validation passes
}

const registerForm = () => {
  if (
    $("#name").val() == "" ||
    $("#email").val() == "" ||
    $("#dob").val() == "" ||
    $("#password").val() == "" ||
    $("#confirmPassword").val() == ""
  ) {
    alert("Please fill in all fields");
    return;
  }

  let formData = {};
  // get the values from the form
  formData.name = $("#name").val();
  formData.email = $("#email").val();
  formData.dob = $("#dob").val();
  formData.password = $("#password").val();
  formData.confirmPassword = $("#confirmPassword").val();

  // call the postLogin function with the form data
  registerPost(formData);
};

function registerPost(values) {
  // POST request to login using fetch with error handling
  $.ajax({
    url: "/register",
    type: "POST",
    data: values,
    success: (result) => {
      if (result.statusCode === 201) {
        // set token in local storage
        // window.localStorage.setItem("token", result.data.id);
        alert("User registered successfully!");
        // once the login is successful, redirect to profile page
        window.location.href = "/login";
        // sendEmail(values);
      } else {
        alert(result.message);
      }
    },
    error: (err) => {
      // show alert if login is unsuccessful
      alert(err);
    },
  });
}

$(document).ready(function () {
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    if (validateForm()) {
      registerForm();
    }
  });
  // redirect the user to the profile page if the token is present
  if (window.localStorage.getItem("token")) {
    window.location.href = "/profile";
  }
});
