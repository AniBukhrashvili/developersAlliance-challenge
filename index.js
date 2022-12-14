const button = document.getElementById("submit");
const firstNameInput = document.getElementById("form-firstname");
const lastNameInput = document.getElementById("form-lastname");
const addressInput = document.getElementById("form-address");
const date = document.getElementById("form-date");
const selectGender = document.querySelector('.form-select');
const note = document.getElementById("form-note");
const items = document.getElementById("items");

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
        submitForm();
    }
}


const submitForm = e => {
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let id = formData.length || 0;

    formData.push({
        id: id,
        fname: document.getElementById('form-firstname').value,
        lname: document.getElementById('form-lastname').value,
        address: document.getElementById('form-address').value,
        date: document.getElementById('form-date').value,
        gender: selectGender.options[selectGender.selectedIndex].value,
        note: document.getElementById('form-note').value
    });
    localStorage.setItem('formData', JSON.stringify(formData));
    disDate();
    document.querySelector('form').reset();
    document.getElementById('form-firstname').focus();
    e.preventDefault();
}

function disDate() {
    if (localStorage.getItem('formData')) {
        var output = document.querySelector('.data-table');
        output.innerHTML = "";
        JSON.parse(localStorage.getItem('formData')).forEach(data => {
            output.innerHTML += `
                <tr>
                    <td id = "delete" style="cursor: pointer;">${data.id+1}</td>
                    <td>${data.fname}</td>
                    <td>${data.lname}</td>
                    <td>${data.address}</td>
                    <td>${data.date}</td>
                    <td>${data.gender ? data.gender: "Not defined"}</td>
                    <td id = "note" style="color: blue; cursor: pointer;">Show Note</td>
                </tr>
            `

            document.getElementById('delete').addEventListener("click", () => {
                localStorage.removeItem(data.id);
                items.removeChild(items.firstChild);
            })

            document.getElementById('note').addEventListener("click", () => {
                window.alert(`note : ${data.note}`)
            })
        })
    }
}

button.addEventListener("click", clickHandler);