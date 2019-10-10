'use strict'

class Register {
  constructor() {
    this.firstNameInput = document.querySelector('#first-name');
    this.lastNameInput = document.querySelector('#last-name');
    this.emailInput = document.querySelector('#email');
    this.countryInput = document.querySelector('#country');
    this.passwordInput = document.querySelector('#password');
    this.confirmpasswordInput = document.querySelector('#confirm-password');
    this.buttonInput = document.querySelector('#register-button');

    this.statusErrorContainer = document.querySelector('#status-error');
    this.registrationForm = document.querySelector('#registration-form');
    this.titleDiv = document.querySelector('#title');
  }

  saveData = (event) => {
    // Keep the page from refreshing
    event.preventDefault();

    // Get input values
    const firstName = this.firstNameInput.value;
    const lastName = this.lastNameInput.value;
    const email = this.emailInput.value;
    const country = this.countryInput.value;
    const password = this.passwordInput.value;

    // Create a new instance of User
    const newUser = new User(firstName, lastName, email, country, password);

    // Save to localStorage
    let userStorage = JSON.parse(localStorage.getItem('users'));

    // Check if localStorage is empty
    (userStorage) ? userStorage.push(newUser) : userStorage = [newUser];
    localStorage.setItem('users', JSON.stringify(userStorage));

    // Empty form
    this.titleDiv.innerText = "Mamma mia!"
    this.registrationForm.innerHTML = `
      <div class="col-12 text-center pt-5">
        <a href="index.html"  class="p5"><img src="assets/img/chef.png" alt="Thumbs-up chef icon" href="index.html"></a>
        <p class="burbank text-lg pt-1">Welcome to our kitchen</p>
      </div>
    `;

    validator.checkErrors(true);   
  }

  // Validate inputs
  handleInputValues = () => {

    // Check email input
    this.emailInput.addEventListener('input', (event) => {
      const errors = validator.validateEmailValid(event.target.value)
      if (!('invalidEmail' in errors)) validator.validateUniqueEmail(event.target.value);
      this.handleErrorMessages();
      this.handleIsValid();
    });

    // Check password input
    this.passwordInput.addEventListener('input', (event) => {
      validator.validatePassword(event.target.value);
      this.handleErrorMessages();
      this.handleIsValid();
    });

    // Check password confirmation
    this.confirmpasswordInput.addEventListener('input', (event) => {
      validator.validatePasswordConfirm(event.target.value, this.passwordInput.value);
      this.handleErrorMessages();
      this.handleIsValid();
    });
  }

  // Handle error messages
  handleErrorMessages = () => {
    this.statusErrorContainer.innerHTML = '';

    // Check for error messages and display them
    const errors = validator.checkErrors();
    for (const element in errors) {
      const error = document.createElement('div');
      error.innerHTML = errors[element];
      this.statusErrorContainer.appendChild(error);
    }
  }

  // Enable or disable the register button after validation
  handleIsValid = () => {
    const errors = validator.checkErrors();
    (Object.keys(errors).length <= 0) ? this.buttonInput.removeAttribute("disabled") : this.buttonInput.setAttribute('disabled', '');
  }
}

const register = new Register();
window.addEventListener('load', register.handleInputValues);