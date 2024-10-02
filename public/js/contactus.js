document.getElementById('contactUsForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        const data = await response.text();

        // Show the modal with the response message
        document.getElementById('modalBody').innerText = data;
        const modal = new bootstrap.Modal(document.getElementById('submitModal'));
        modal.show();

        // Reset the form fields after submission
        document.getElementById('contactUsForm').reset();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('modalBody').innerText = 'Error occurred while sending the message.';
        const modal = new bootstrap.Modal(document.getElementById('submitModal'));
        modal.show();
    }
});

// Refresh the page when the modal is closed
document.getElementById('closeModalButton').addEventListener('click', function () {
    location.reload();
});