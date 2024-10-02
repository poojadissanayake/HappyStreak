function populateChallengeDetailModal(title, description, steps) {
    document.getElementById('challengeDetailModalLabel').innerText = title;
    document.getElementById('modal-challenge-detail').innerText = description;

    // Clear any existing items from the previous selection
    let modelToDoList = document.getElementById('modal-challenge-list');
    modelToDoList.innerHTML = ''; 

    let stepsList = document.createElement('ul');
    
    steps.forEach(step => {
        let stepItem = document.createElement('li');
        stepItem.innerText = step;
        stepsList.appendChild(stepItem);
    });

    // Append the steps list to the modal body
    modelToDoList.appendChild(stepsList);
}