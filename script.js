//You can edit ALL of the code here
function setup() {
  fetchShow();
}

//it fetches show list
function fetchShow() {
  fetch("https://api.tvmaze.com/shows")
    .then(function (result) {
      return result.json();
    })
    .then(function (showList) {
      renderShowSelect(showList);
    });
}

//it renders select of Show
function renderShowSelect(show) {
  show.forEach((show) => {
    let selectElement = document.createElement("option");
    document.querySelector("#choose_show").appendChild(selectElement);
    selectElement.value = show.id;
    selectElement.textContent = show.name;
  });
  fetchEpisodes(document.querySelector("#choose_show").value);
  //////////////////////////////////////////////////////////////////////////////////////////////////
  document.querySelector("#choose_show").addEventListener("change", () => {
    console.log(document.querySelector("#choose_show").value);
    fetchEpisodes(document.querySelector("#choose_show").value);
  });
}

//it fetches episode list
function fetchEpisodes(showID) {
  fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
    .then(function (result) {
      return result.json();
    })
    .then(function (show) {
      renderEpisodes(show);
      /////////////////////////////////////////////////////////////////////////////////////
      // document.querySelector("#choose_show").addEventListener("change", () => {
      //  console.log(document.querySelector("#choose_show").value);
      //  fetchEpisodes(document.querySelector("#choose_show").value);
      // });
      ////////////////////////////////////////////////////////////////////////////////////////////
    });
}

//it renders episode elements on the page
function renderEpisodes(episodeList) {
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////
  makePageForEpisodes(episodeList);
  searchResultRender(episodeList);
  selectEpisode(episodeList);
}

//it renders page with episodes
function makePageForEpisodes(episodeList) {
  document.querySelector("#root").innerHTML = "";
  episodeList.forEach(renderEpisode);
}

// it renders searched episodes and counter of episodes
function searchResultRender(episodeList) {
  let counterEpisodes = document.querySelector("#counter");
  counterEpisodes.textContent = `Displaying
  ${episodeList.length}/${episodeList.length} episodes`;
  document.querySelector("#search").addEventListener("input", () => {
    let stringSearch = document.querySelector("#search").value;
    document.querySelector("#search + label").textContent = `Displaying ${
      searchEpisodes(episodeList, stringSearch).length
    }/${episodeList.length} episodes`;
    makePageForEpisodes(searchEpisodes(episodeList, stringSearch));
  });
}

//it searches episodes by word
function searchEpisodes(episodeList, stringForSearch) {
  let searchingResult = episodeList.filter((episode) => {
    return (
      episode.name.toUpperCase().includes(stringForSearch.toUpperCase()) ||
      episode.summary.toUpperCase().includes(stringForSearch.toUpperCase())
    );
  });
  return searchingResult;
}

//it renders a container for episode's info
function renderEpisode(episode) {
  //nested container for each episode in root div
  let divContainer = document.createElement("div");
  document.querySelector("#root").append(divContainer);
  divContainer.className = "episode";

  //nested div for title of each episode
  let divTitle = document.createElement("div");
  divContainer.append(divTitle);

  //nested name of episode
  let pName = document.createElement("p");
  divTitle.append(pName);
  pName.textContent = episode.name;

  //nested code of episode
  let pCode = document.createElement("p");
  divTitle.append(pCode);
  pCode.textContent =
    "S".concat(String(episode.season).padStart(2, 0)) +
    "E".concat(String(episode.number).padStart(2, 0));

  //nested img of each episode
  let imgMedium = document.createElement("img");
  imgMedium.src = episode.image.medium;
  divContainer.append(imgMedium);

  //nested summary paragraph for each episode
  let divSummary = document.createElement("div");

  divSummary.innerHTML = episode.summary;
  divContainer.append(divSummary);
}

//it renders select element on the page
function selectEpisode(episodeList) {
  document.querySelector("#choose_episode").innerHTML = ""; //////////////////////////////////////////////////////////////
  episodeList.forEach((episode) => {
    let selectElement = document.createElement("option");

    document.querySelector("#choose_episode").appendChild(selectElement);
    selectElement.value = `${episode.id}`;
    selectElement.textContent = `${
      "S".concat(String(episode.season).padStart(2, 0)) +
      "E".concat(String(episode.number).padStart(2, 0))
    } - ${episode.name}`;
  });

  document.querySelector("#choose_episode").addEventListener("change", () => {
    searchedEpisode(
      episodeList,
      document.querySelector("#choose_episode").value
    );
  });
}

//it generates a page for episode
function searchedEpisode(episodeList, code) {
  let currentEpisode = episodeList.find((element) => {
    return element.id == code;
  });
  console.log(currentEpisode);
  //////////////////////////////////////////////
  //localStorage.setItem("currentEpisode", JSON.stringify(currentEpisode));
  sessionStorage.setItem("currentEpisode", JSON.stringify(currentEpisode));
  document.location.href = "episode.html";
}

window.onload = setup;
