var expect = require('chai').expect;
var request = require('request');

describe('Contact Form', function () {
  var url = 'http://localhost:3000/contact';

  // Test to load the contact form page
  it('should load the contact form', function (done) {
    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  // Test case for missing fields (e.g., no message)
  it('should return error when fields are missing', function (done) {
    var options = {
      url: url,
      method: 'POST',
      json: {
        name: 'John Doe',
        email: 'john@example.com',
        // Missing message field
      },
    };
    request(options, function (error, response, body) {
      expect(response.statusCode).to.equal(400);
      expect(body).to.equal('All fields are required.');
      done();
    });
  });

  // Test case for successful form submission
  it('should submit the contact form successfully', function (done) {
    var options = {
      url: url,
      method: 'POST',
      json: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, this is a test message!',
      },
    };
    request(options, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Message sent!');
      done();
    });
  });
});
