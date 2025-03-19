// With the help of Jeremy Keith, I was able to create a fully scalable code sample that you can copy-paste into your project.
// It will save the user input value on blur, this includes radio buttons, checkboxes and date inputs besides regular text/number inputs.
// The only condition is that you give the form element on your page a data-attribute of data-form-topic="foo".
// This code snippet saves the data-attribute as the key to the localStorage, and the value of it will be an object with key/value pairs of the respective inputs name and value.
// Please refer to this gist somewhere in your code if you use it :)
// Happy coding!

// VARIABLE DECLARATIONS
// objects
let savedData = {}; // Object to store form data
let autocompletedData; // Object to store data retrieved from localStorage

// HTML elements
const inputs = document.getElementsByTagName("input"); // Get all input elements

// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form"); // Get the form element

    if (window.localStorage) { // Check if localStorage is available
        if (!form) { // If no form is found, exit
            return;
        }

        if (!form.dataset.formTopic) { // If form does not have data-form-topic attribute, exit
            return;
        }

        let getFormTopic = localStorage.getItem(form.dataset.formTopic); // Get saved data from localStorage
        if (!getFormTopic) { // If no data is found, exit
            return;
        }
        autocompletedData = JSON.parse(getFormTopic); // Parse the retrieved data

        var formTopic = form.dataset.formTopic; // Get the form topic
        console.log(formTopic);

        // Function to populate form fields with saved data
        function getKeyValue() {
            for (const dataKey in autocompletedData) {
                let value = autocompletedData[dataKey];

                let formField = document.querySelector(
                    "[name = " + dataKey + "]"
                );

                switch (formField.type) {
                    case "radio":
                        formField = document.querySelector(
                            `input[name = '${dataKey}'][value = '${value}']`
                        );
                        formField.setAttribute("checked", "checked");
                        break;
                    case "checkbox":
                        formField.setAttribute("checked", "checked");
                        break;
                    case "file":
                        break;
                    default:
                        formField.value = value;
                }
            }
        }

        getKeyValue(); // Populate form fields with saved data
    }
});

if (window.localStorage) {
    // Function to save form data to localStorage
    function saveFormDataToLocalStorage(e) {
        const form = e.target.closest("form"); // Get the closest form element
        let submitData = new FormData(form); // Create a FormData object

        for (let [dataKey, value] of submitData.entries()) {
            savedData[dataKey] = value; // Save each form field's name and value to savedData object
            console.log(dataKey, value);
        }

        // Save the form data to localStorage
        window.localStorage.setItem(
            form.dataset.formTopic,
            JSON.stringify(savedData)
        );
    }

    // Add blur event listener to each input element
    Array.prototype.forEach.call(inputs, function (input) {
        switch (input.type) {
            // Add cases if needed for specific input types
        }

        input.addEventListener("blur", function (e) {
            e.preventDefault();

            saveFormDataToLocalStorage(e); // Save form data to localStorage on blur event
        });
    });
};


// Add event listeners to elements with class 'skip' inside articles
document.querySelectorAll('fieldset .skip').forEach(skip => {
    skip.addEventListener('input', () => {
        let article = skip.closest('fieldset');
        let otherSkips = article.querySelectorAll('.skip:not(:focus)'); // Exclude the focused input

        otherSkips.forEach(other => {
            let isEmpty = skip.value.trim() === "";
            other.toggleAttribute('disabled', !isEmpty);
            other.toggleAttribute('required', isEmpty);
        });
    });
});


const fieldsets = document.querySelectorAll('fieldset');

fieldsets.forEach(fieldset => {
    const jaRadioButton = fieldset.querySelector('input[type="radio"][value="ja"]');
    const inputjes = fieldset.querySelectorAll("div.open input");

    if (jaRadioButton) {
        jaRadioButton.addEventListener('change', function() {
            if (this.checked) {
                // Als 'Ja' is geselecteerd, maak de inputs onder expandable verplicht
                inputjes.forEach(inputje => {
                    if (inputje.offsetParent !== null) { // Check if the input is visible
                        inputje.setAttribute("required", "true");
                    }
                });
                    }
                });
            }
        });


const section = document.querySelector('form section:nth-of-type(4)');

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) {
        const formTopic = form.dataset.formTopic;
        const savedData = JSON.parse(localStorage.getItem(formTopic));
        if (savedData) {
            const displaySection = document.createElement('div');
            displaySection.innerHTML = '<h3>What you filled in:</h3>';
            for (const [key, value] of Object.entries(savedData)) {
                const p = document.createElement('p');
                p.textContent = `${key}: ${value}`;
                displaySection.appendChild(p);
            }
            section.appendChild(displaySection);
        }
    }
});



