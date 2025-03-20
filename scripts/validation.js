// const volgendeLinks = document.querySelectorAll('a[id^=volgende]');
// const sections = document.querySelectorAll('[id^=sec]');

// volgendeLinks.forEach(link => {
//     link.addEventListener('click', function(event) {
//         const section = this.closest('[id^=sec]');
//         const inputs = section.querySelectorAll('input[required]');
//         let allFilled = true;

//         inputs.forEach(input => {
//             if (!input.checkValidity()) {
//                 allFilled = false;
//             }
//         });

//         if (!allFilled) {
//             event.preventDefault();
//             alert('Please fill all the required input fields in the section.');
//         }
//     });
// });

// Select all input elements on the page
const inputFields = document.querySelectorAll("input");

// Iterate over each input element
inputFields.forEach((inputField) => {
    // Check if there is a stored value in localStorage for the input field's id
    if (localStorage.getItem(inputField.id)) {
        // If a stored value exists, set the input field's value to the stored value
        inputField.value = localStorage.getItem(inputField.name);
    }
    // Add an event listener to the input field to listen for input events
    inputField.addEventListener("input", () => {
        // Store the current value of the input field in localStorage with the input field's name as the key
        localStorage.setItem(inputField.name, inputField.value);
    });
});

