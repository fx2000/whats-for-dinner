function main() {

  // Call the async function and feed the API response to the getJoke function
  getApiAsync(apiUrl, 'food/trivia/random?')
    .then(function (data) {
      getJoke(data);
    });
  
  // Randomize video results
  let offset = Math.floor(Math.random() * 10) + 1;
  // Call the async function and feed the API response to the getVideos function
  getApiAsync(apiUrl, 'food/videos/search?query=dinner&number=4&offset=' + offset)
    .then(function (data) {
      getVideos(data);
    });
};

window.addEventListener('load', main);