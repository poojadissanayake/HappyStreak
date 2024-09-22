document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile();
});

// Fetch user profile data along with challenges
async function fetchUserProfile() {
    try {
        const response = await fetch('/api/profile'); 
        if (response.ok) {
            const data = await response.json();

            // Update user name dynamically
            document.getElementById('name').textContent = data.profile.name; 

            // Update user description dynamically
            document.getElementById('user-description').textContent = `${data.profile.name}, please update your profile to tell us and your friends more about yourself today!`; 
            
            // Update total challenges count
            const totalChallenges = data.challenges.count || 0; // Default to 0 if undefined
            document.getElementById('total-challenges').textContent = totalChallenges; 

            // Show or hide no challenges message based on count
            const noChallengesMessage = document.getElementById('no-challenges-message');
            if (totalChallenges === 0) {
                noChallengesMessage.style.display = 'block'; // Show message if no challenges
            } else {
                noChallengesMessage.style.display = 'none'; // Hide message if there are challenges
            }

            // Populate challenge details
            const challengesListContainer = document.getElementById('challenges-list');
            challengesListContainer.innerHTML = ''; // Clear existing content

            // Check if there are any challenges to display
            if (data.challenges.challenges.length > 0) {
                data.challenges.challenges.forEach(challenge => {
                    const challengeItem = document.createElement('div');
                    challengeItem.className = 'challenge-item mb-3';
                    challengeItem.innerHTML = `
                        <h4>${challenge.title}</h4>
                        <p>${challenge.description}</p>
                        <div class="progress mb-2">
                            <div class="progress-bar" role="progressbar" style="width: ${challenge.progress}%;" aria-valuenow="${challenge.progress}" aria-valuemin="0" aria-valuemax="100">${challenge.progress}%</div>
                        </div>`;
                    challengesListContainer.appendChild(challengeItem);
                });
            } else {
                // If there are no challenges, display a default message
                challengesListContainer.innerHTML = '<p>No challenges available.</p>';
            }
        } else {
            console.error('Failed to fetch user profile:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}