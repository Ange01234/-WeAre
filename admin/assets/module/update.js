// Get the update form element
const updateForm = document.getElementById("update");
updateForm.addEventListener("submit", handleFormSubmit);

/**
 * Helper function for processing form data
 *
 * @param {Object} options
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Processed form data as object
 */
async function processFormData({ formData }) {
    // Convert FormData to plain object
    const formDataObject = Object.fromEntries(formData.entries());

    // Add success flag
    formDataObject.success = true;

    return formDataObject;
}

/**
 * Event handler for the form submit event
 *
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    try {
        const form = event.currentTarget;
        const formData = new FormData(form);

        // Process the form data
        const responseData = await processFormData({ formData });

        // If successful, store each form field in localStorage with the field name as key
        if (responseData.success) {
            // Handle standard form fields
            Object.entries(responseData).forEach(([key, value]) => {
                if (key !== 'success' && value) {
                    // Map field names from form to the IDs used in the MediaKit
                    let storageKey = key;

                    // Special handling for phone and email
                    if (key === 'phone') {
                        storageKey = 'phone';
                    } else if (key === 'email') {
                        storageKey = 'email';
                    }

                    // Store in localStorage
                    localStorage.setItem(storageKey, value);
                }
            });

            // Format some values with currency
            // Handle price formatting
            if (responseData['price-1']) {
                localStorage.setItem('price-1', responseData['price-1'] + ' FCFA');
            }
            if (responseData['price-2']) {
                localStorage.setItem('price-2', responseData['price-2'] + ' FCFA');
            }
            if (responseData['price-3']) {
                localStorage.setItem('price-3', responseData['price-3'] + ' FCFA');
            }
            if (responseData['price-4']) {
                localStorage.setItem('price-4', responseData['price-4'] + ' FCFA');
            }

            // Handle percentage formatting
            if (responseData['wpercentage']) {
                localStorage.setItem('wpercentage', responseData['wpercentage'] + '%');
            }
            if (responseData['mpercentage']) {
                localStorage.setItem('mpercentage', responseData['mpercentage'] + '%');
            }

            // Show success message
            alert('Information mise à jour avec succès!');

            // Optional: Redirect to the media kit page
            window.location.href = "../../../mediaKit.html";
        } else {
            // Show error message
            alert('Une erreur s\'est produite lors de la mise à jour.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Une erreur s\'est produite: ' + error.message);
    }
}
