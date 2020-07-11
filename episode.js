let episode = putStoredEpisode("currentEpisode");
renderEpisodePage(episode);

//it grabs selected object
function putStoredEpisode(string) {
  let result = JSON.parse(sessionStorage.getItem(string));
  sessionStorage.clear();
  return result;
}

//it renders all DOM elements on the page
function renderEpisodePage(episode) {
  document.querySelector("#name").textContent = episode.name;
  document.querySelector("#season").textContent = episode.season;
  document.querySelector("#number").textContent = episode.number;
  document.querySelector("#photo").src = episode.image.original;
  document.querySelector("#summary").innerHTML = episode.summary;
}
