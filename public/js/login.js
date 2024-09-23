const loginForm = () => {
  let formData = {};
  // get the values from the form
  formData.email = $("#email").val();
  formData.password = $("#password").val();
  // call the postLogin function with the form data
  postLogin(formData);
};

function postLogin(values) {
  // POST request to login using fetch with error handling
  $.ajax({
    url: "/login",
    type: "POST",
    data: values,
    success: (result) => {
      if (result.statusCode === 201) {
        // set token in local storage
        window.localStorage.setItem("token", result.data.id);
        // once the login is successful, redirect to profile page
        window.location.href = "/profile";
      } else {
        // show alert if login is unsuccessful
        alert("Invalid credentials");
      }
    },
    error: (err) => {
      // show alert if login is unsuccessful
      alert("Invalid credentials");
    },
  });
}

$(document).ready(function () {
  // add click event to the login button
  $("#loginForm").click(() => {
    loginForm();
  });
});
