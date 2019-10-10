'use strict'

// Place error or success messages in the DOM
const handleMessages = (user) => {
  const statusErrorContainer = document.querySelector('#status-error');
  statusErrorContainer.innerHTML = '';
  const statusSuccessContainer = document.querySelector('#signin-form');
  const titleDiv = document.querySelector('#title');

  if (user) {
    titleDiv.innerText = `It Worked!`;
    statusSuccessContainer.innerHTML = `
      <div class="col-12 text-center pt-5">
        <a href="mykitchen.html"  class="p5"><img src="assets/img/chef.png" alt="Thumbs-up chef icon" href="index.html"></a>
        <p class="burbank text-lg pt-1">Welcome back, ${user.firstName}</p>
      </div>
    `;
  } else {
    statusErrorContainer.innerHTML = `
      <p class="burbank bg-danger text-white p-3 rounded">Email or password incorrect</p>
    `;
  }
}

// Check localStorage for user
const signin = (event) => {
  event.preventDefault();
  const userStorage = JSON.parse(localStorage.getItem('users'));
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');

  const user = userStorage.find(element => element.email === emailInput.value && element.password === passwordInput.value);

  handleMessages(user);
}