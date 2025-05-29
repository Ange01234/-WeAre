
let endPoint;

const login_form = document.getElementById("formAuthentication");
var login_input = document.getElementById("login");
login_form.addEventListener("submit", handleFormSubmit);


/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */
async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    if(plainFormData["password"] === "P@55w0rd" && plainFormData["email-username"] === "Chl2ee")
    {

        plainFormData["connection"] =1;// Simulate a successful login response
        plainFormData["error"] =false;
        response = plainFormData;
        return response;
    }
    else
    {
        plainFormData["error"] =true;
        response = plainFormData;
        return response;
    }
}

/**
 * Event handler for a form submit event.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
 *
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
        const formData = new FormData(form);
        url = "test";
        const responseData = await postFormDataAsJson({ url, formData });
        console.log( responseData );
        // Removing early return to allow authentication logic to complete
        if(responseData.error===true)
        {
            Swal.fire({
            title: 'Erreur!',
            text: 'Le nom ou le mot de passe ne correspondent pas ! ',
            icon: 'error',
            customClass: {
                confirmButton: 'btn btn-primary btn-lg',
            },
            buttonsStyling: false
            });
        }
        if(responseData.error===false)
        {
            // Store each form field in localStorage with the field name as key
            localStorage.setItem("connection",1);
            localStorage.setItem('connectedUserInfo', JSON.stringify(responseData));
            window.open("home.html","_self");
        }
    } catch (error) {
        console.error(error);
    }

}
