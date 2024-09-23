const socket = io();

const loginForm = () => {
  let formData = {};
  // get the values from the form
  formData.email = $("#email").val();
  formData.password = $("#password").val();
  // call the postLogin function with the form data
  postLogin(formData);
};

const sendEmail = (userData) => {
  const emailData = {
    to: userData.email,
    subject: "Registration Successful",
    message:
      "Thank you for registering to HappyStreak. We hope you enjoy our services.",
  };
  socket.emit("sendEmail", emailData);
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
        sendEmail(values);
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

  // redirect the user to the profile page if the token is present
  if (window.localStorage.getItem("token")) {
    window.location.href = "/profile";
  }
});
