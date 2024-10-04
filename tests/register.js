var expect = require("chai").expect;
var request = require("request");

describe("User Registration", function () {
  var url = "http://localhost:3000/register";

  // Test case to load registration form
  it("should load the registration form", function (done) {
    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  // Test case for missing fields
  it("should return error for missing fields", function (done) {
    var options = {
      url: url,
      method: "POST",
      json: {
        name: "Test User",
        email: "", // Missing email
        dob: "2000-01-01",
        password: "password",
        confirmPassword: "password",
      },
    };
    request(options, function (error, response, body) {
      expect(body.statusCode).to.equal(422);
      expect(body.message).to.equal("Email is required"); 
      done();
    });
  });

  // Test case if email is already registered
  it("should return error if email is already registered", function (done) {
    var options = {
      url: url,
      method: "POST",
      json: {
        name: "Test User",
        email: "existingemail@example.com", 
        dob: "2000-01-01",
        password: "password",
        confirmPassword: "password",
      },
    };
    request(options, function (error, response, body) {
      expect(body.statusCode).to.equal(422);
      expect(body.message).to.equal("Email already in use");
      done();
    });
  });

  // Test case to register a user successfully
  it("should register a user successfully", function (done) {
    const uniqueEmail = `newuser_${Date.now()}@example.com`; 
    var options = {
      url: url,
      method: "POST",
      json: {
        name: "New User",
        email: uniqueEmail, 
        dob: "2000-01-01",
        password: "password",
        confirmPassword: "password",
      },
    };
    request(options, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body.message).to.equal("Registered Successfully!");
      done();
    });
  });
});