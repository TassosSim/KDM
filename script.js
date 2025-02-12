document.getElementById('survivorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form input
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const causeOfDeath = document.getElementById('causeOfDeath').value;

    // Create survivor in list
    const graveyardList = document.getElementById('graveyard');
    const newSurvivor = document.createElement('li');
    newSurvivor.textContent = `Name: ${name}, Age: ${age}, Gender: ${gender}, Cause of Death: ${causeOfDeath}`;

    graveyardList.appendChild(newSurvivor);

    // Clear
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