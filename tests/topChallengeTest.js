var expect = require('chai').expect;
var request = require('request');
let { getDB } = require('../dbConnection');
const { fetchTopChallenge } = require('../models/topChallengeModel');

describe('Get Top Challenge', function () {
  var url = 'http://localhost:3000/challenges';

  it('should fetch the top challenge successfully', function (done) {
    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should throw an error when database connection is not established', async function () {
    getDB = () => undefined;

    try {
      await fetchTopChallenge();
      expect.fail('Expected error not thrown');
    } catch (error) {
      expect(error.message).to.include('Cannot read properties of undefined');
    }
  });
});
