// Survivor Form
document.getElementById('survivorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Check if all required fields are filled out
    if (!validateForm()) {
        displayMessage("Please fill out all required fields.", "#d14941");
        return;
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
    document.getElementById('philosophy').value = 'None';

    // Success message with light green color
    displayMessage(`${name} has been added to the Graveyard!`, "lightgreen");
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

// Function to display success or error message with specific color
function displayMessage(messageText, color) {
    const message = document.getElementById('message');
    message.textContent = messageText;
    message.style.color = color;
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
        survivorElement.innerHTML =
        `Name: <span class="value">${survivor.name}</span><br>
        Hunt XP: <span class="value">${survivor.huntxp}</span><br>
        Gender: <span class="value">${survivor.gender}</span><br>
        Favorite Weapon: <span class="value">${survivor.favoriteWeapon}</span><br>
        Philosophy: <span class="value">${survivor.philosophy}</span><br>
        Cause of Death: <span class="value">${survivor.causeOfDeath}</span><br>`;

        // Create a delete button for each survivor in the list
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#10006;';

        // Add event listener for the delete action with confirmation
        deleteButton.addEventListener('click', () => {
            const isConfirmed = confirm(`Are you sure you want to delete ${survivor.name}?`);

            if (isConfirmed) {
                deleteSurvivor(index, survivor.name);
            }
        });

        deleteButton.classList.add('delete-btn');
        survivorElement.appendChild(deleteButton);
        graveyardList.appendChild(survivorElement);
    });
}

// Delete survivor from list and update the cookie
function deleteSurvivor(index, survivorName) {
    const survivors = getSurvivorsFromCookie();
    survivors.splice(index, 1);
    saveSurvivorsToCookie(survivors);
    displaySurvivors();

    // Display the message that the survivor has been removed
    displayMessage(`${survivorName} has been removed from the Graveyard`, "#d14941");
}

// Load survivors from cookie when the page loads
window.addEventListener('load', displaySurvivors);
