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


// Select all fieldset elements
const fieldsets = document.querySelectorAll('fieldset');

// Iterate over each fieldset
fieldsets.forEach(fieldset => {
    // Select the radio button with value "ja" within the fieldset
    const jaRadioButton = fieldset.querySelector('input[type="radio"][value="ja"]');
    // Select all input elements within divs with class "open" inside the fieldset
    const inputjes = fieldset.querySelectorAll("div.open input");

    // If the "ja" radio button exists
    if (jaRadioButton) {
        // Add a change event listener to the "ja" radio button
        jaRadioButton.addEventListener('change', function() {
            // If the "ja" radio button is checked
            if (this.checked) {
                // Make the inputs under expandable divs required
                inputjes.forEach(inputje => {
                    // Check if the input is visible
                    if (inputje.offsetParent !== null) {
                        // Set the required attribute to true
                        inputje.setAttribute("required", "true");
                    }
                });
            }
        });
    }
});

// Select the fourth section within the form
const section = document.querySelector('form section:nth-of-type(4)');

// Add an event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Select the form element
    const form = document.querySelector("form");
    // If the form exists
    if (form) {
        // Get the form topic from the data attribute
        const formTopic = form.dataset.formTopic;
        // Retrieve the saved data from localStorage
        const savedData = JSON.parse(localStorage.getItem(formTopic));
        // If there is saved data
        if (savedData) {
            // Create a new div element to display the saved data
            const displaySection = document.createElement('div');
            displaySection.innerHTML = '<h3>What you filled in:</h3>';
            // Iterate over each key-value pair in the saved data
            for (const [key, value] of Object.entries(savedData)) {
                // Create a new paragraph element for each key-value pair
                const p = document.createElement('p');
                p.textContent = `${key}: ${value}`;
                // Append the paragraph to the display section
                displaySection.appendChild(p);
            }
            // Append the display section to the fourth section in the form
            section.appendChild(displaySection);
        }
    }
});



