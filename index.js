const button = document.getElementById("submit");
const firstNameInput = document.getElementById("form-firstname");
const lastNameInput = document.getElementById("form-lastname");
const addressInput = document.getElementById("form-address");
const date = document.getElementById("form-date");
const note = document.getElementById("form-note");

let pattern = new RegExp("/^(?=.*?[1-9])[0-9()-]+$/");

const validationFunctions = {
    firstNameValidation: function(firstName) {
        if (firstName.length === 0 || pattern.test(firstName)) {
            document.getElementById("name-err").classList.add("error");
            return false;
        } else {
            document.getElementById("name-err").classList.remove("error");
            return true;
        }
    },
    lastNameValidation: function(lastName) {
        if (lastName.length === 0 || pattern.test(lastName)) {
            document.getElementById("lastname-err").classList.add("error");
            return false;
        } else {
            document.getElementById("lastname-err").classList.remove("error");
            return true;
        }
    },
    addressValidation: function(address) {
        if (address.length === 0 || address.length > 35) {
            document.getElementById("address-err").classList.add("error");
            return false;
        } else {
            document.getElementById("address-err").classList.remove("error");
            return true;
        }
    },
};


const clickHandler = () => {
    //first name validation
    if (firstNameInput != null) {
        let name = firstNameInput.value;
        var nameIsValid = validationFunctions.firstNameValidation(name);
    }

    //last name validation
    if (lastNameInput != null) {
        let lastName = lastNameInput.value;
        var lastNameIsValid = validationFunctions.lastNameValidation(lastName);
    }

    //address validation
    if (addressInput != null) {
        let address = addressInput.value;
        var addressIsValid = validationFunctions.addressValidation(address);
    }

    if (nameIsValid && lastNameIsValid && addressIsValid) {
        console.log('ეგარი');
    }
}

button.addEventListener("click", clickHandler);