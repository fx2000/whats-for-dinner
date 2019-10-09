'use strict'

// Define API main parameters
//const apiKey = "3eb90b198ae74fd5b0f56581af7089d3"; //duque@outlook.com
//const apiKey = "a97f4185fc074874a9040bd1b2892e79"; //daniel@compraremesas.com
const apiKey = "c5eb608eb0ec4944950e18db579c17fe"; //fx2000@gmail.com
const apiUrl = "https://api.spoonacular.com/";



// Get data from JSON API using async/await
async function getApiAsync(url, args) {
  let response = await fetch(url + args + '&apiKey=' + apiKey);
  let data = await response.json();
  return data;
}



// Get a random joke from the API
const getJoke = (data) => {
  let factBox = document.querySelector('#random-fact');
  factBox.innerText = data.text;
}



// Get cooking videos from the API
const getVideos = (data) => {

  // Get placeholders from html for Video 1
  let video1 = document.querySelector('#video-1');
  let video1Title = document.querySelector('#video-1-title');
  let video1Views = document.querySelector('#video-1-views');

  // Update Video 1
  video1.innerHTML =
    `<iframe width="350" height="315" src="https://www.youtube.com/embed/${data.videos[0].youTubeId}" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  video1Title.innerText = data.videos[0].shortTitle;
  video1Views.innerText = (data.videos[0].views).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  // Get placeholders from html for Video 2
  let video2 = document.querySelector('#video-2');
  let video2Title = document.querySelector('#video-2-title');
  let video2Views = document.querySelector('#video-2-views');

  // Update Video 2
  video2.innerHTML =
    `<iframe width="350" height="315" src="https://www.youtube.com/embed/${data.videos[1].youTubeId}" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  video2Title.innerText = data.videos[1].shortTitle;
  video2Views.innerText = (data.videos[1].views).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  // Get placeholders from html for Video 3
  let video3 = document.querySelector('#video-3');
  let video3Title = document.querySelector('#video-3-title');
  let video3Views = document.querySelector('#video-3-views');

  // Update Video 3
  video3.innerHTML =
    `<iframe width="350" height="315" src="https://www.youtube.com/embed/${data.videos[2].youTubeId}" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  video3Title.innerText = data.videos[2].shortTitle;
  video3Views.innerText = (data.videos[2].views).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  // Get placeholders from html for Video 4
  let video4 = document.querySelector('#video-4');
  let video4Title = document.querySelector('#video-4-title');
  let video4Views = document.querySelector('#video-4-views');

  // Update Video 4
  video4.innerHTML =
    `<iframe width="350" height="315" src="https://www.youtube.com/embed/${data.videos[3].youTubeId}" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  video4Title.innerText = data.videos[3].shortTitle;
  video4Views.innerText = (data.videos[3].views).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

const postRecipe = (data) => {
  console.log(data);

  // Change title
  let title = document.querySelector('#title');
  title.innerText = "Delicious!";

  // Change text
  let introText = document.querySelector('#intro-text');
  introText.innerText = '';

  // Clear form and add new content
  let mainDiv = document.querySelector('#main-div');
  mainDiv.innerHTML = 
  `
  <!-- Begin recipe -->
    <div class="container mt-3">
      <div class="row" id="main-div">
        <div class="col-12 border rounded">
          <div class="row pt-3">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <img class="card-img-top rounded" src="${data.image}"
                alt="Photo of ${data.title}">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <h5 class="burbank text-md">${data.title}</h5>
              <p class="burbank">Spoonacular Score <span class="text-lettuce text-sm">
                  ${data.spoonacularScore}</span></p>
              <p class="burbank">Preparation: <span class="text-lettuce text-sm">
                  ${data.readyInMinutes}</span> minutes</p>
              <div class="row">
                <div class="col-12" id="badges"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 pt-3">
              <h5 class="burbank text-md">Ingredients</h5>
              <ul id="recipe-ingredients"></ul>
              <h5 class="burbank text-md">How do I make this?</h5>
              <p>${data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End recipe -->
  `;

  // Get ingredients
  let ingredients = [];
  for (let i = 0; i < data.extendedIngredients.length; i++) {
    ingredients.push(data.extendedIngredients[i]);
  }

  const ingredientDiv = document.querySelector('#recipe-ingredients');
  ingredients.forEach(ingredient => {
    ingredientDiv.insertAdjacentHTML('beforeend',
    `<li>${ingredient.originalString}</li>`);
  });

  // Get badges
  const badgesDiv = document.querySelector('#badges');
  if (data.vegetarian) {
    badgesDiv.insertAdjacentHTML('beforeend', `<img class="food-icon" src="assets/img/icons/vegetarian.png">`);
  };
  if (data.gluttenFree) {
    badgesDiv.insertAdjacentHTML('beforeend', `<img class="food-icon" src="assets/img/icons/gluttenFree.png">`);
  };
  if (data.dairyFree) {
    badgesDiv.insertAdjacentHTML('beforeend', `<img class="food-icon" src="assets/img/icons/dairyFree.png">`);
  };
  if (data.ketogenic) {
    badgesDiv.insertAdjacentHTML('beforeend', `<img class="food-icon" src="assets/img/icons/keto.png">`);
  };

}

const getRecipeId = (event) => {
  event.preventDefault()

  // Call the async function and feed the API response to the postRecipe function
  getApiAsync(apiUrl, 'recipes/' + event.srcElement.form.elements[0].value + '/information?includeNutrition=false')
    .then(function (data) {
      postRecipe(data);
    });
}


// Get recipes from the API with queried ingredients and add them to the DOM
const getRecipes = (data) => {

  // Change title
  let title = document.querySelector('#title');
  title.innerText = "Horay!";

  // Change text
  let introText = document.querySelector('#intro-text');
  introText.innerText = "These are the best recipes we could find using the ingredients you told us about. Enjoy!";

  // Clear form and add new content
  let mainDiv = document.querySelector('#main-div');
  mainDiv.innerHTML = '';

  let usedIngredients = [];
  let missedIngredients = [];

  // Sort through all results
  for (let i = 0; i < data.length; i++) {

    // Sort through used ingredients
    usedIngredients.length = 0;
    for (let j = 0; j < data[i].usedIngredients.length; j++) {
      usedIngredients.push(data[i].usedIngredients[j].name);
    }

    // Sort through unused ingredients
    missedIngredients.length = 0;
    for (let j = 0; j < data[i].missedIngredients.length; j++) {
      missedIngredients.push(data[i].missedIngredients[j].name);
    }

    mainDiv.insertAdjacentHTML('beforeend',
    `
    <div class="card m-1" style="width: 18rem;">
      <img src="${data[i].image}" class="card-img-top" alt="Photo of ${data[i].title}">
      <div class="card-body">
        <h5 class="card-title burbank text-md">${data[i].title}</h5>
        <p class="burbank"><span class="text-lettuce text-sm">
              ${(data[i].likes).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</span> people have liked this recipe</p>
          <address><span class="burbank">Things you have:</span> ${usedIngredients.join(', ')}<br/>
          <span class="burbank">Things you need:</span> ${missedIngredients.join(', ')}</address>
      </div>
      <form>
        <input type="number" value="${data[i].id}" class="invisible"></input>
        <div class="card-footer text-center"><button type="submit" class="btn bg-lettuce burbank text-white" onclick="getRecipeId(event)">Looks yummy!</button><div>
      </form>
    </div>
    `
    );
  }
}



// Capture ingredients in myKitchen form
const myKitchen = (event) => {
  event.preventDefault()
  let ingredientsList = [];
  for (let i = 0; i < event.srcElement.form.elements.length; i++) {
    if (event.srcElement.form.elements[i].checked === true) {
      ingredientsList.push(event.srcElement.form.elements[i].value);
    }
  }
  let ingredients = ingredientsList.join();
  // Call the async function and feed the API response to the getRecipes function
  getApiAsync(apiUrl, 'recipes/findByIngredients?ranking=2&ingredients=' + ingredients + '&number=6')
    .then(function (data) {
      getRecipes(data);
    });
}
