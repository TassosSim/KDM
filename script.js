// Survivor Form
document.getElementById('survivorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form input values
    const name = document.getElementById('name').value;
    let huntxp = document.getElementById('huntxp').value;
    const gender = document.getElementById('gender').value;
    const causeOfDeath = document.getElementById('causeOfDeath').value;

    // Sanitize Hunt XP
    huntxp = Math.abs(huntxp);

    // Create survivor in list
    const graveyardList = document.getElementById('graveyard');
    const newSurvivor = document.createElement('li');
    newSurvivor.textContent = `Name: ${name}, Hunt XP: ${huntxp}, Gender: ${gender}, Cause of Death: ${causeOfDeath}`;

    graveyardList.appendChild(newSurvivor);

    // Clear form
    document.getElementById('survivorForm').reset();

    // Success message
    const message = document.getElementById('message');
    message.textContent = `${name} has been added to the Graveyard!`;
    message.style.color = 'green';

    // Message time
    setTimeout(() => {
        message.textContent = '';
    }, 3000);
});
