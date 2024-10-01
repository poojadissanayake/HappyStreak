async function getUserId() {
    try {
      const response = await fetch('/getUserId');
      if (response.ok) {
        const data = await response.json();
        return data.userId;
      } else {
        console.error('Error fetching userId..');
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

async function addChallenge(challenge) {
    console.log(challenge);
    const userId = await getUserId();
    console.log("challengeuserid",userId);
    const challengeId = challenge._id;
    const steps = challenge.steps;
    console.log(challengeId);
    try {
        const response = await fetch('/userChallenges/joinChallenge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                challengeId: challengeId,
                steps: steps
            })
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'Challenge successfully added!');
        } else {
            const errorResult = await response.json();
            alert(`Error: ${errorResult.message || 'An error occurred'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding challenge');
    }
}
