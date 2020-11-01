const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formConteol = input.parentElement;
  formConteol.className = "form-control error";
  const small = formConteol.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formConteol = input.parentElement;
  formConteol.className = "form-control success";
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkPasswordsMatch(input1, input2){
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputs) {
  inputs.forEach((element) => {
    // trim() - eliminates surrounding whitespaces
    if (element.value.trim() === "") {
      showError(element, `${getFieldName(element)} is required`);
    } else {
      if (element.id === "email") {
        if (!isValidEmail(element.id.value)) {
          showError(element, "Email needs to be valid");
        } else {
          showSuccess(element);
        }
      }
      showSuccess(element);
    }
  });
}
  
  function checkLength(input, minLength, maxLength){
    if (input.value.length < minLength) {
      showError(input, `${getFieldName(input)} must be at least ${minLength} characters`);
    } else if (input.value.length > maxLength) {
      showError(input, `${getFieldName(input)} must be less than ${maxLength} characters`);
    } else {
      showSuccess(input);
    }
  }

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired(document.querySelectorAll("input"));
  checkLength(username, 3, 15);
  checkLength(password, 8, 20);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});


/**
 * Additions that can be made:
 *      Passwords have ato have certain characters 
 *      Dark Mode
 */
