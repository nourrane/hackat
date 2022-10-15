const form = document.querySelector("#signup");

/* NOM */
const NAME_REQUIRED = "Entrez votre nom.";
const NAME_INVALID = "Nom invalide.";

const DATE = new Date(Date.now());

console.log("test")

/* Show a message */
function showMessage(input, message, type) {
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;

	input.className = type ? "success" : "error";
	return type;
}

/* Show a error message */
function showError(input, message) {
	return showMessage(input, message, false);
}

/* Show a success message (the field is correct) */
function showSuccess(input) {
	return showMessage(input, "", true);
}

/* Return an error if a field is empty */
function hasValue(input, message) {
	console.log(input.value)
	if (input.value.trim() === "") {
		return showError(input, message + "\n");
	}
	return showSuccess(input);
}

/* Name validator */
function validateName(input, requiredMsg, messageError){
	const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
	if(!hasValue(input, requiredMsg)){
		return false;
	}else if(input.value.match(nameRegex)){
		return true;
	}
	return showError(input, messageError);
}
console.log("test")
/* Username validator */
function validateUsername(input, message, messageLengthError){
	const userRegex= /^[A-Za-z][A-Za-z0-9_]{0,29}$/;

	if(input.value.trim() === ""){
		return showError(input, message);
	}else if(input.value.length < 6){
		return showError(input, messageLengthError + "Vous avez " + input.value.length + " caractères.");
	}
	if(input.value.match(userRegex)){ return showMessage(input, "", true) };
}

/* Email validator */
function validateEmail(input, requiredMsg, invalidMsg) {
	// Check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// Validate email format (Regex)
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showError(input, invalidMsg);
	}
	return true;
}


/* Date of birth (DOB) validator */
function validateDOB(input, requiredMsg, invalidMsg){
    if(input.value != ""){
        var date = input.value.split("/");
		if(DATE.getDate() == parseInt(date[0]) && (DATE.getMonth() + 1) == parseInt(date[1]) && DATE.getFullYear() == parseInt(date[2])){
			return showMessage(input, "Date d'aujourd'hui. Spécifiez une autre date.", false);
		}
		
        let isValidDate = Date.parse(date[1] + "/" + date[0] + "/" + date[2]);
        if(isNaN(isValidDate) || parseInt(date[2])>= DATE.getFullYear() || date[0].length != 2 || date[1].length != 2 || date[2].length != 4){
			return showMessage(input, invalidMsg, false);
		}
        return showMessage(input, "", true);
    }
	return true;
}

/* Password validator */
function validatePSW(input, requiredMsg, invalidMsg){
	const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/

	if(!hasValue(input, requiredMsg)){
		return false;
	}else if(input.value.match(pwdRegex)){
		return true;
	}
	return showError(input, invalidMsg);
	
}

form.addEventListener("submit", function (event) {
	event.preventDefault();

	// Validate the different fields of forms (firstname, lastname, email, date of birth, username, password)
	let basketnameValid  = validateName(form.elements["basketname"], NAME_REQUIRED, NAME_INVALID);
    

	// If all the field (except maybe DOB (facultative)) are valid then submit

	/*AJAX*/
	if(basketnameValid){ // DOBValid is true if DOB is empty OR correct / DOBValid is false if DOB is not correct
		if (/*emailValid && nameValid && fnameValid && userValid && pswValid*/ 1==1) {
			var xhr; 
			try {  xhr = new XMLHttpRequest();   }
			catch (e) 
			{
				try {   xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
				catch (e2) 
				{
				try {  xhr = new ActiveXObject('Msxml2.XMLHTTP');  }
				catch (e3) {  xhr = false;   }
				}
			}

			var formData = new FormData(form);
			console.log(form)
			xhr.open('POST', 'htbin/paniersend.py');
			xhr.send(formData);
			
			/*xhr.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					showResponse(this.response);
				}
			}*/
		}
	}
});

/*showResponse = data => {
    var text = data;
    document.getElementById("signup").innerHTML = "Merci de votre inscription ! Bienvenue sur Ecoeats.";
};*/
console.log("test")