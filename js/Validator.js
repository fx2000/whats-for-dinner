'use strict'

class Validator {
  constructor() {
    this.invalidEmailError = `<p class="burbank bg-danger text-white p-3 rounded">That email address is not valid</p>`;
    this.duplicateEmailError = `<p class="burbank bg-danger text-white p-3 rounded">That email address is already registered</p>`;
    this.passwordError = `<p class="burbank bg-danger text-white p-3 rounded">Your password should be 8 characters, including letters and numbers, lowercase and uppercase</p>`;
    this.passwordConfirmError = `<p class="burbank bg-danger text-white p-3 rounded">Your passwords don't match</p>`;

    // Fill errors object with all possible errors by default
    this.errors = {
      invalidEmailError: this.invalidEmailError,
      duplicateEmailError: this.duplicateEmailError,
      passwordError: this.passwordError,
      passwordConfirmError: this.passwordConfirmError
    }
  }

  // Validate email address using regex
  validateEmailValid = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Remove error mesasage if validation passed
    (emailRegEx.test(email)) ? delete this.errors.invalidEmailError : this.errors.invalidEmailError = this.invalidEmailError;
    return this.errors;
  }

  // Check database for existing email address
  validateUniqueEmail = (email) => {
    const userStorage = JSON.parse(localStorage.getItem('users'));

    // If no users doesn't exist, delete error message and return
    if (!userStorage) {
      delete this.errors.duplicateEmailError;
      return this.errors;
    }

    // If users exist, check them all for the new user's email
    let emailUnique = true;
    userStorage.forEach(user => {
      if (user.email === email) emailUnique = false;
    });

    (emailUnique) ? delete this.errors.duplicateEmailError : this.errors.duplicateEmailError = this.duplicateEmailError;
    return this.errors;
  }

  // Validate password using regex
  validatePassword = (password) => {
    const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    (passwordRegEx.test(password)) ? delete this.errors.passwordError : this.errors.passwordError = this.passwordError;
    return this.errors;
  }

  // Validate that password has been confirmed correctly
  validatePasswordConfirm = (password, passwordConfirm) => {
    (password === passwordConfirm) ? delete this.errors.passwordConfirmError : this.errors.passwordConfirmError = this.passwordConfirmError;
    return this.errors;
  }

  // Check for errors on submit
  checkErrors = (isSubmitted) => {
    if (isSubmitted) {
      this.errors = {
        invalidEmailError: this.invalidEmailError,
        duplicateEmailError: this.duplicateEmailError,
        passwordError: this.passwordError,
        passwordConfirmError: this.passwordConfirmError
      }
    }
    return this.errors
  }
}

const validator = new Validator;