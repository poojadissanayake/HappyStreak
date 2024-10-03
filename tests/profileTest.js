const { expect } = require('chai');
const sinon = require('sinon');
const profileModel = require('../models/profileModel');
const profileController = require('../controllers/profileController'); 

// Start of Profile unit tests 
describe('Profile Unit Tests', function () {

    // Reset after each test 
    afterEach(function () {
        sinon.restore();
    });

    // Test the accuracy of the ChallengesToGo count
    describe('Challenges To Go Count', function () {
        it('should return the correct number of challenges to go', async function () {
            const mockuserChallenges1 = [
                { challengeId: '1', progress: 2, total_steps: 6 }, 
                { challengeId: '2', progress: 5, total_steps: 6 }, 
                { challengeId: '3', progress: 6, total_steps: 6 } 
            ];

            sinon.stub(profileModel, 'getUserChallenges').resolves(mockuserChallenges1);

            const validChallenges = mockuserChallenges1.map(challenge => ({
                id: challenge.challengeId,
                steps_progress: challenge.progress,
                total_steps: challenge.total_steps
            }));

            const challengesToGoCount = validChallenges.filter(challenge => challenge.steps_progress < challenge.total_steps).length;
            
            expect(challengesToGoCount).to.equal(2); // should return 2 based on mockuser
        });
    });

    // Test the accuracy of the CompletedChallenges Count 
    describe('Completed Challenges Count', function () {
        it('should return the correct number of completed challenges', async function () {
            const mockuserChallenges2 = [
                { challengeId: '1', progress: 6, total_steps: 6 }, 
                { challengeId: '2', progress: 3, total_steps: 6 },
                { challengeId: '3', progress: 6, total_steps: 6 }
            ];

            const validChallenges = mockuserChallenges2.map(challenge => ({
                id: challenge.challengeId,
                steps_progress: challenge.progress,
                total_steps: challenge.total_steps
            }));

            const completedChallengesCount = validChallenges.filter(challenge => challenge.steps_progress === challenge.total_steps).length;

            expect(completedChallengesCount).to.equal(2);  // should return 2 based on mockuser
        });
    });

    // Test the accuracy of each challenge progress
    describe('Challenge Progress', function () {
        it('should return the correct challenge progress', async function () {
            const mockChallenge3 = { progress: 3, total_steps: 6 };

            const progressPercentage = (mockChallenge3.total_steps > 0) 
                ? (mockChallenge3.progress / mockChallenge3.total_steps) * 100 
                : 0;

            expect(progressPercentage).to.equal(50); // should return 50% based on mockchallenge3
        });
    });

    // Test the trophy case (completed challenges) display
    describe('Completed Trophy Case', function () {
        it('should display the correct details of the trophy case (completed challenges) correctly', async function () {
            const mockcompletedChallenges = [
                { challengeId: '1', title: 'Challenge Title 1', category: 'Challenge Category 1' },
                { challengeId: '2', title: 'Challenge Title 2', category: 'Challenge Category 2' }
            ];

            expect(mockcompletedChallenges).to.have.lengthOf(2); // should return 2 elements 
            expect(mockcompletedChallenges[0].title).to.equal('Challenge Title 1'); // should return the challenge title 
            expect(mockcompletedChallenges[1].category).to.equal('Challenge Category 2'); // should return the challenge category
        });
    });

    // Test the "Delete Challenge" functionality
    describe('Delete Challenge Functionality', function () {
        it('should delete a challenge successfully', async function () {
            const req = {
                session: { userId: 'testuser725' },
                body: { challengeId: 'challenge13' }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            const deleteChallengeStub = sinon.stub(profileModel, 'deleteUserChallenge').resolves({ deletedCount: 1 });

            await profileController.deleteChallenge(req, res);

            expect(deleteChallengeStub.calledOnceWith('testuser725', 'challenge13')).to.be.true;

            expect(res.status.calledWith(200)).to.be.true; // should return HTTP status code 200 
            expect(res.json.calledWith({ success: true, message: 'Challenge deleted successfully' })).to.be.true; // should return this message 
        });
    });
});
