// Survivor Form
document.getElementById('survivorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Check if all required fields are filled out
    if (!validateForm()) {
        displayMessage("Please fill out all required fields.");
        return; // Stop submission if any required field is missing
    }

    // Get form input values
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    let huntxp = Math.abs(document.getElementById('huntxp').value);
    const favoriteWeapon = document.getElementById('favoriteWeapon').value;
    const causeOfDeath = document.getElementById('causeOfDeath').value;

    // Check for additional cause of death input
    const additionalCause = getCauseOfDeath();

    // Get philosophy (default to "None" if Arc Survivor is not checked)
    const philosophy = document.getElementById('arcSurvivor').checked 
        ? document.getElementById('philosophy').value || "None"
        : "None";

    // Create a new survivor object
    const newSurvivor = {
        name,
        huntxp,
        gender,
        favoriteWeapon,
        philosophy,
        causeOfDeath: additionalCause
    };

    // Save survivor to the list and update the cookie
    const survivors = getSurvivorsFromCookie();
    survivors.push(newSurvivor);
    saveSurvivorsToCookie(survivors);

    // Update the graveyard list on the page
    displaySurvivors();

    // Clear form after submitting
    document.getElementById('survivorForm').reset();
    hideCauseOfDeathForms();

    // Reset the Arc Survivor checkbox and philosophy field
    document.getElementById('arcSurvivor').checked = false;
    document.getElementById('philosophyField').style.display = 'none';
    document.getElementById('philosophy').value = 'none';

    // Success message
    displayMessage(`${name} has been added to the Graveyard!`);
});

// Function to get additional cause of death input
function getCauseOfDeath() {
    const causeOfDeath = document.getElementById('causeOfDeath').value;
    if (causeOfDeath === 'Monster') {
        return document.getElementById('monsterName').value;
    } else if (causeOfDeath === 'Nemesis') {
        return document.getElementById('nemesisName').value;
    } else if (causeOfDeath === 'Other') {
        return document.getElementById('otherCause').value;
    }
    return '';
}

// Function to hide additional cause of death forms
function hideCauseOfDeathForms() {
    const forms = ['monsterForm', 'nemesisForm', 'otherForm'];
    forms.forEach(formId => document.getElementById(formId).style.display = 'none');
}

// Function to display success message
function displayMessage(messageText) {
    const message = document.getElementById('message');
    message.textContent = messageText;
    setTimeout(() => message.textContent = '', 5000);
}

// Cause of Death dynamic form handling
document.getElementById('causeOfDeath').addEventListener('change', function() {
    hideCauseOfDeathForms(); 

    // Show relevant form based on selected cause of death
    const selectedValue = this.value;
    if (selectedValue === 'Monster') {
        document.getElementById('monsterForm').style.display = 'block';
        document.getElementById('monsterName').setAttribute('required', 'required');
    } else if (selectedValue === 'Nemesis') {
        document.getElementById('nemesisForm').style.display = 'block';
        document.getElementById('nemesisName').setAttribute('required', 'required');
    } else if (selectedValue === 'Other') {
        document.getElementById('otherForm').style.display = 'block';
        document.getElementById('otherCause').setAttribute('required', 'required');
    }

    // Remove required from hidden fields
    if (selectedValue !== 'Monster') {
        document.getElementById('monsterName').removeAttribute('required');
    }
    if (selectedValue !== 'Nemesis') {
        document.getElementById('nemesisName').removeAttribute('required');
    }
    if (selectedValue !== 'Other') {
        document.getElementById('otherCause').removeAttribute('required');
    }
});

// Arc Survivor checkbox shows Philosophy
document.getElementById('arcSurvivor').addEventListener('change', function() {
    const philosophyField = document.getElementById('philosophyField');
    philosophyField.style.display = this.checked ? 'block' : 'none';
    const philosophySelect = document.getElementById('philosophy');

    // Add/remove required attribute for philosophy
    if (this.checked) {
        philosophySelect.setAttribute('required', 'required');
    } else {
        philosophySelect.removeAttribute('required');
    }
});

// Validate form before submission (ensure all required fields are filled)
function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    for (let field of requiredFields) {
        if (!field.value) {
            return false;
        }
    }
    return true;
}

// Get survivors from cookie
function getSurvivorsFromCookie() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('survivors='));
    if (cookie) {
        const survivors = JSON.parse(cookie.split('=')[1]);
        return survivors;
    }
    return [];
}

// Save survivors to cookie
function saveSurvivorsToCookie(survivors) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `survivors=${JSON.stringify(survivors)}; expires=${expires.toUTCString()}; path=/`;
}

// Display survivors from the cookie on page load
function displaySurvivors() {
    const graveyardList = document.getElementById('graveyard');
    const survivors = getSurvivorsFromCookie();
    graveyardList.innerHTML = '';

    survivors.forEach((survivor, index) => {
        const survivorElement = document.createElement('li');
        survivorElement.textContent =
        `Name: ${survivor.name}, 
        Hunt XP: ${survivor.huntxp}, 
        Gender: ${survivor.gender}, 
        Favorite Weapon: ${survivor.favoriteWeapon}, 
        Philosophy: ${survivor.philosophy}, 
        Cause of Death: ${survivor.causeOfDeath}`;
        
        // Create a delete button for each survivor
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteSurvivor(index));

        // Append the delete button to the list item
        survivorElement.appendChild(deleteButton);

        graveyardList.appendChild(survivorElement);
    });
}

// Delete survivor from list and update the cookie
function deleteSurvivor(index) {
    const survivors = getSurvivorsFromCookie();
    survivors.splice(index, 1);
    saveSurvivorsToCookie(survivors);
    displaySurvivors();
}

// Load survivors from cookie when the page loads
window.addEventListener('load', displaySurvivors);
