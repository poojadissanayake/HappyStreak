const loginForm = () => {
  let formData = {};
  formData.email = $("#email").val();
  formData.password = $("#password").val();
  console.log(formData);
  postLogin(formData);
};

function postLogin(values) {
  $.ajax({
    url: "/login",
    type: "POST",
    data: values,
    success: (result) => {
      console.log(result);
      if (result.statusCode === 201) {
        window.location.href = "/profile";
      } else {
        alert("Invalid credentials");
      }
    },
    error: (err) => {
      alert("Invalid credentials");
    },
  });
}

$(document).ready(function () {
  //   alert("Invalid credentials");
  $("#loginForm").click(() => {
    loginForm();
  });
});
