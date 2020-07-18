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
      //it sorts array showList alphabetically
      showList = showList.sort(function (a, b) {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        return 0;
      });

      ///////////////////////////////////////////////////////
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
    });
}

//it renders episode elements on the page
function renderEpisodes(episodeList) {
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
    document.querySelector("#counter").textContent = `Displaying ${
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
  pName.className = "name";
  //nested code of episode
  let pCode = document.createElement("p");
  divTitle.append(pCode);
  pCode.className = "code";
  pCode.textContent =
    "S".concat(String(episode.season).padStart(2, 0)) +
    "E".concat(String(episode.number).padStart(2, 0));

  //nested img of each episode
  let imgMedium = document.createElement("img");
  imgMedium.src = episode.image.medium;
  imgMedium.className = "image";
  divContainer.append(imgMedium);

  //nested summary paragraph for each episode
  let divSummary = document.createElement("div");
  divSummary.className = "summary";
  divSummary.innerHTML = episode.summary;
  divContainer.append(divSummary);
}

//it renders select element on the page
function selectEpisode(episodeList) {
  document.querySelector("#choose_episode").innerHTML = "";
  episodeList.forEach((episode) => {
    let selectElement = document.createElement("option");

    document.querySelector("#choose_episode").appendChild(selectElement);
    selectElement.value = `${episode.id}`;
    selectElement.textContent = `${
      "S".concat(String(episode.season).padStart(2, 0)) +
      "E".concat(String(episode.number).padStart(2, 0))
    } - ${episode.name}`;
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////
  document.querySelector("#choose_episode").addEventListener("change", () => {
    searchedEpisode(
      episodeList,
      document.querySelector("#choose_episode").value
    );
  });
}

//it generates a page for episode and saved founded object for page episode.html
function searchedEpisode(episodeList, code) {
  let index = episodeList.findIndex((element) => {
    return element.id == code;
  });
  /*  console.log(index);
  episodeList = episodeList.filter((episode) => episode.id != code); */

  document.querySelector("#search_word").classList.add("hidden");
  document
    .querySelectorAll(".episode")
    .forEach((element) => element.classList.add("hidden"));
  document
    .querySelector(".episode:nth-child(" + (index + 1) + ")")
    .classList.remove("hidden");
  /* document
    .querySelector("#root")
    .prepend(document.querySelector(".episode:nth-child(" + (index + 1) + ")")); */
}

window.onload = setup;
