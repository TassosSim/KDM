// Survivor Form

document.getElementById('survivorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form input values
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    let huntxp = document.getElementById('huntxp').value;
    const favoriteWeapon = document.getElementById('favoriteWeapon').value;
    const causeOfDeath = document.getElementById('causeOfDeath').value;
    const monsterForm = document.getElementById('monsterForm');
    const nemesisForm = document.getElementById('nemesisForm');
    const otherForm = document.getElementById('otherForm');
    
    // Check for additional cause of death input
    let additionalCause = '';

    // Check which cause of death was selected
    if (causeOfDeath === 'Monster') {
        additionalCause = document.getElementById('monsterName').value;
    } else if (causeOfDeath === 'Nemesis') {
        additionalCause = document.getElementById('nemesisName').value;
    } else if (causeOfDeath === 'Other') {
        additionalCause = document.getElementById('otherCause').value;
    }

    // Sanitize Hunt XP
    huntxp = Math.abs(huntxp);

    // Create survivor in list
    const graveyardList = document.getElementById('graveyard');
    const newSurvivor = document.createElement('li');
    newSurvivor.textContent = `Name: ${name}, Hunt XP: ${huntxp}, Gender: ${gender}, Favorite Weapon: ${favoriteWeapon}, Cause of Death: ${additionalCause}`;

    graveyardList.appendChild(newSurvivor);

    // Clear form after submitting
    document.getElementById('survivorForm').reset();

    // Hide additional forms
    document.getElementById('monsterForm').style.display = 'none';
    document.getElementById('nemesisForm').style.display = 'none';
    document.getElementById('otherForm').style.display = 'none';

    // Success message
    const message = document.getElementById('message');
    message.textContent = `${name} has been added to the Graveyard!`;

    // Message time
    setTimeout(() => {
        message.textContent = '';
    }, 5000);
});



// Cause of Death dynamic form handling
const causeOfDeathSelect = document.getElementById('causeOfDeath');

// Checks for changes in cause of death form
causeOfDeathSelect.addEventListener('change', function () {

// Hide Monster, Nemesis and Other forms by default
monsterForm.style.display = 'none';
nemesisForm.style.display = 'none';
otherForm.style.display = 'none';

// When you select cause of death show "Monster, Nemesis and Other" divs
if (causeOfDeathSelect.value === 'Monster') {
    monsterForm.style.display = 'block';
} else if (causeOfDeathSelect.value === 'Nemesis') {
    nemesisForm.style.display = 'block';
} else if (causeOfDeathSelect.value === 'Other') {
    otherForm.style.display = 'block';
}
});
