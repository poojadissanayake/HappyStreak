//$(document).ready(function () {
  // redirect page to login if token is not present
  //if (!window.localStorage.getItem("token")) {
    //window.location.href = "/login";
  //}
//});

// Progress bar 
document.addEventListener("DOMContentLoaded", function () {
  const progressBars = document.querySelectorAll('.progress-bar');
    
  progressBars.forEach(bar => {
      let progress = bar.getAttribute('data-progress');
      if (!isNaN(progress)) {
          progress = progress.replace('%', '');
          bar.style.width = `${progress}%`;    
      }
  });
});

function saveProgress(challengeId, userId) {
    const checkboxes = document.querySelectorAll(`#stepsForm${challengeId} .form-check-input`);
    let checkedSteps = []; // Declare the array to store checked steps
    let progress = 0;

    // Count the number of checked steps to update progress
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedSteps.push(checkbox.value); // Push only checked steps
        }
  });

    // Progress will be the number of checked checkboxes
    progress = checkedSteps.length;
    console.log('Checked Steps for Challenge ID', challengeId, ':', checkedSteps, 'Progress:', progress);

    // Send progress data to the server
    fetch(`/profile/${userId}/update-progress/${challengeId}`, {
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

// Delete user's specific challenge 
function deleteChallenge(userId, challengeId) {
  console.log('Deleting Challenge:', { userId, challengeId });
  fetch(`/profile/${userId}/delete-challenge/${challengeId}`, {
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