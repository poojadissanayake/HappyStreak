var expect = require("chai").expect;
var request = require("request");

describe("Login", function () {
  var url = "http://localhost:3000/login";

  // test case to Load login form
  it("should load the login form", function (done) {
    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  // test case to check invalid email and password
  it("should return error with message invalid credentials", function (done) {
    var options = {
      url: "http://localhost:3000/login",
      method: "POST",
      json: {
        email: "test@asdf.com",
        password: "asdfasdf",
      },
    };
    request(options, function (error, response, body) {
      expect(body.statusCode).to.equal(401);
      expect(body.message).to.equal("Invalid credentials");
      done();
    });
  });

  // test to check if user enters correct email but wrong password
  it("should return error with message password is incorrect", function (done) {
    var options = {
      url: "http://localhost:3000/login",
      method: "POST",
      json: {
        email: "test@test.com",
        password: "asdfasdf",
      },
    };
    request(options, function (error, response, body) {
      expect(body.statusCode).to.equal(401);
      expect(body.message).to.equal("Password is incorrect");
      done();
    });
  });

  //
  it("should login successfully", function (done) {
    var options = {
      url: "http://localhost:3000/login",
      method: "POST",
      json: {
        email: "test@test.com",
        password: "password",
      },
    };
    request(options, function (error, response, body) {
      expect(body.statusCode).to.equal(200);
      expect(body.message).to.equal("Login successful");
      done();
    });
  });
});
