const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");
const input1Error = document.getElementById('input1Error');
const input2Error = document.getElementById('input2Error');
const input3Error = document.getElementById('input3Error');

input1.addEventListener('keyup', validateInput1);
input2.addEventListener('keyup', validateInput2);
input3.addEventListener('keyup', validateInput3);

document.getElementById('itemForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Validate all fields before submission
    validateInput1();
    validateInput2();
    validateInput3();
    if (input1Error.textContent === '' || input2Error.textContent === '' || input3Error.textContent === '') {
        // Your form submission logic here
        processInputs();
    }
});

function processInputs() {
    let _input1 = input1.value;
    let _input2 = input2.value;
    let _input3 = input3.value;

    _input1 = _input1.split('');
    // Check if input2 is present at the start
    if (_input1[0] === _input2) {
        _input1.unshift(_input3); // Add input3 to the beginning
    }
    for (let i = 0; i < _input1.length; i++) {
        if (_input1[i] === _input2) {
            if (_input1[i + 1] === _input2) {
                _input1.splice(i + 1, 0, _input3); // Insert input3 after the current character
                i++; // Increment i to skip the newly added element
            }
        }
    }
    // Check if input2 is present at the end
    if (_input1[_input1.length - 1] === _input2) {
        _input1.push(_input3); // Add input3 to the end
    }
    // Join the array back into a string
    output = _input1.join('');
    emptyInputs();
    document.getElementById("output").innerHTML = output;
}

// Function to validate input1 (not allowing numbers)
function validateInput1() {
    const value = input1.value.trim();
    if (value === '' || /\d/.test(value)) {
        input1Error.textContent = 'This field cannot be empty and should not contain numbers.';
    } else {
        input1Error.textContent = '';
    }
}

// Function to validate input2 (allowing only one special character)
function validateInput2() {
    const value = input2.value.trim();
    if (value === '') {
        input2Error.textContent = 'This field cannot be empty.';
    } else if (value.length !== 1 || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)) {
        input2Error.textContent = 'Enter exactly one special character.';
    } else {
        input2Error.textContent = '';
    }
}

// Function to validate input3 (allowing alphabets only)
function validateInput3() {
    const value = input3.value.trim();
    if (value === '' || !/^[a-zA-Z]+$/.test(value)) {
        input3Error.textContent = 'This field cannot be empty and should contain alphabets only.';
    } else {
        input3Error.textContent = '';
    }
}
//empty inputs 
function emptyInputs() {
    input1.value = "";
    input2.value = '';
    input3.value = '';
}