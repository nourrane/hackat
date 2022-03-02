// show a message with a type of the input
function showMessage(input, message, type) {
	// get the small element and set the message
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;
	// update the class for the input
	input.className = type ? "success" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, "\n" + message + "\n");
	}
	return showSuccess(input);
}

function validateUsername(input, message, messageLengthError){
	if(input.value.trim() === ""){
		return showError(input, message);
	}else if(input.value.length < 6){
		return showError(input, messageLengthError + "Vous avez " + input.value.length + " caractères.");
	}
	return showMessage(input, "", true);
}

function validateEmail(input, requiredMsg, invalidMsg) {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate email format
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showError(input, invalidMsg);
	}
	return true;
}

function validateDOB(input, requireMsg, invalidMsg){
    if(input.value != ""){
        var date = input.value.split("/");
        let isValidDate = Date.parse(date[1] + "/" + date[0] + "/" + date[2]);
        if(isNaN(isValidDate)){
            return showError(input, invalidMsg);
        }else{
            return true;
        }
    }
}
const form = document.querySelector("#signup");

/* NOM */
const NAME_REQUIRED = "Entrez votre nom.";
const FNAME_REQUIRED = "Entrez votre prénom";

/* MAIL */
const EMAIL_REQUIRED = "Entrez votre email";
const EMAIL_INVALID = "Votre email est incorrecte.";

/* DATE OF BIRTH */
const DOB_REQUIRED = "Entrez votre date de naissance.";
const DOB_INVALID = "Date de naissance invalide.";

/* USER */
const USR_REQUIRED = "Entrez votre nom d'utilisateur.";
const PSW_REQUIRED = "Entrez votre mot de passe.";
const PSW_LENGTH_REQUIRED = "Au moins 6 caractères.";



form.addEventListener("submit", function (event) {
	// stop form submission
	event.preventDefault();

	// validate the form
	let nameValid = hasValue(form.elements["firstname"], NAME_REQUIRED);
    let fnameValid = hasValue(form.elements["lastname"],  FNAME_REQUIRED);
	let emailValid = validateEmail(form.elements["useremail"], EMAIL_REQUIRED, EMAIL_INVALID);
    let DOBValid = validateDOB(form.elements["birthdate"], DOB_REQUIRED, DOB_INVALID);
    let userValid = validateUsername(form.elements["username"], USR_REQUIRED, PSW_LENGTH_REQUIRED);
    let pswValid = hasValue(form.elements["userpwd"], PSW_REQUIRED);
	// if valid, submit the form.
	if (nameValid && emailValid) {
		alert("Entrez vos informations.");
	}
});

function show_value(x)
            {
             document.getElementById('budget').innerHTML=x + "€";
            }
