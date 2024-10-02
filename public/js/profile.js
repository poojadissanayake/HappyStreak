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

  // Update Progress of Challenge
  async function saveProgress(challengeId) {
    const userId = await getUserId(); 
    console.log("getUser: " + userId);
    
    const checkboxes = document.querySelectorAll(`#stepsForm${challengeId} .form-check-input`);
    let checkedSteps = Array.from(checkboxes).filter(checkbox => checkbox.checked).length; 
    let progress = checkedSteps; 

    fetch(`/profile/update-progress`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, challengeId, progress }) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Progress saved successfully!');
            location.reload(); 
        } else {
            alert('Failed to save progress.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving progress.');
    });
}

// Delete challenge
function deleteChallenge(userId, challengeId) {
  fetch(`/profile/delete-challenge`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, challengeId }) 
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Challenge deleted successfully!');
          location.reload();
      } else {
          alert('Failed to delete challenge.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while deleting the challenge.');
  });
}