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
  console.log("challengeuserid", userId);
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

    const result = await response.json();

    if (response.ok) {
      showAlert(result.message || 'Challenge successfully added!');
    } else {
      alert(result.message || 'An error occurred');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error adding challenge');
  }
}

function showAlert(message) {
  const alertHtml = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
  `;
  const alertContainer = document.getElementById('alertContainer');
  alertContainer.innerHTML = alertHtml;
}
