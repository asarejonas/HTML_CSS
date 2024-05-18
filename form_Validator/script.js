const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message

const showError = (input, msg) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  formControl.classList.add("error");
  small.innerText = msg;
};

// Show input succes message
const showSuccess = (input) => {
  const formControl = input.parentElement;
  // formControl.classList.add("success");
  console.log(formControl.classList);
};

// Change first letter to UpperCase
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Check valid email
const validEmail = (input) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

// Check required  fields
const checkRequired = (...input) => {
  input.forEach((el) => {
    if (el.value === "") showError(input, `${getFieldName(input)} is required`);
    else {
      showSuccess(input);
    }
  });
};

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("submit");

  checkRequired(username, email, password, password2);
});
