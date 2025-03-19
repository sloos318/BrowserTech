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

const inputFields = document.querySelectorAll("input");
 
inputFields.forEach((inputField) => {
    if (localStorage.getItem(inputField.id)) {
        inputField.value = localStorage.getItem(inputField.name);
    }
    inputField.addEventListener("input", () => {
        localStorage.setItem(inputField.name, inputField.value);
    });
});

