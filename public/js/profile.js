//$(document).ready(function () {
  // redirect page to login if token is not present
  //if (!window.localStorage.getItem("token")) {
    //window.location.href = "/login";
  //}
//});

// Update progress
function saveProgress(challengeId, userId) {
  const checkboxes = document.querySelectorAll(`#stepsForm${challengeId} .form-check-input`);
  let checkedSteps = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
  let progress = checkedSteps;

  fetch(`/profile/update-progress?userId=${userId}&challengeId=${challengeId}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ progress })
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
  fetch(`/profile/delete-challenge?userId=${userId}&challengeId=${challengeId}`, {
      method: 'DELETE',
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

