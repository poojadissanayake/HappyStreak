const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const challenge = require('../models/userChallengeModel');

// Register chai-http synchronously
chai.use(chaiHttp);

const baseUrl = "http://localhost:3000";
const challengeUrl = "/challenges";
const userChallengeUrl = "/userChallenges/joinChallenge";

// Mock user and challenge data
const mockUserId = "mockUserId4";
const mockChallenge = {
    _id: "mockChallengeId4",
    steps: [{ stepNumber: 1, completed: false }]
};

describe("Challenges", function () {

    it("renders challenges view correctly", async function () {
        const response = await chai.request(baseUrl).get(challengeUrl);
        expect(response).to.have.status(200);
        expect(response.text).to.include("Challenges");
    });

    it("contains at least one challenge card", async function () {
        const response = await chai.request(baseUrl).get(challengeUrl);
        expect(response.text).to.include('<div class="card challenge-card">');
    });

    it("sets selectedCategory to 'Academic' when the Academic category is selected", async function () {
        const response = await chai.request(baseUrl).get("/challenges?category=Academic");
        expect(response).to.have.status(200);
        expect(response.text).to.include('class="btn custom-btn active"');
        expect(response.text).to.include('Academic');
    });

    it("sets selectedCategory to 'Physical' when the Physical category is selected", async function () {
        const response = await chai.request(baseUrl).get("/challenges?category=Physical");
        expect(response).to.have.status(200);
        expect(response.text).to.include('class="btn custom-btn active"');
        expect(response.text).to.include('Physical');
    });

    it("sets selectedCategory to 'Mindfulness' when the Mindfulness category is selected", async function () {
        const response = await chai.request(baseUrl).get("/challenges?category=Mindfulness");
        expect(response).to.have.status(200);
        expect(response.text).to.include('class="btn custom-btn active"');
        expect(response.text).to.include('Mindfulness');
    });

    it("sets selectedCategory to 'all' when the all category is selected", async function () {
        const response = await chai.request(baseUrl).get("/challenges?category=all");
        expect(response).to.have.status(200);
        expect(response.text).to.include('class="btn btn-default active"');
    });


    // Test case for successfully adding a challenge when the user is not already participating
    it("should add a challenge successfully when not already participating", async function () {
        // Mock the function to simulate no user challenges are found
        const mockFindUserChallenges = async (userId, challengeId) => {
            // Simulate no challenges for this user
            return [];  
        };

        // Backup the original function
        const originalFindUserChallenges = challenge.findUserChallenges;

        try {
            // Replace with the mock function
            userChallengeModel.findUserChallenges = mockFindUserChallenges;

            // Send the POST request to add the challenge
            const res = await chai.request(baseUrl)
                .post(userChallengeUrl)
                .send({
                    userId: mockUserId,
                    challengeId: mockChallenge._id,
                    steps: mockChallenge.steps
                });

            // Assert that the challenge was added successfully
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message").that.equals("Challenge added successfully");
        } finally {
            // Restore the original function
            userChallengeModel.findUserChallenges = originalFindUserChallenges;
        }
    });

    // Test case for when the user is already participating in the challenge
    it("should return a message when the user already participates in the challenge", async function () {
        const mockFindUserChallenges = async (userId, challengeId) => {
            return [{ challengeId: mockChallenge._id }];
        };

        const originalFindUserChallenges = challenge.findUserChallenges;

        try {
            userChallengeModel.findUserChallenges = mockFindUserChallenges;

            const res = await chai.request(baseUrl)
                .post(userChallengeUrl)
                .send({
                    userId: mockUserId,
                    challengeId: mockChallenge._id,
                    steps: mockChallenge.steps
                });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message").that.equals("Wow! You already participate in this Challenge.");
        } finally {
            userChallengeModel.findUserChallenges = originalFindUserChallenges;
        }
    });
});
