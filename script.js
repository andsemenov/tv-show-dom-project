//You can edit ALL of the code here
function setup() {
  let allShows = fetchShow();
  renderSearchShow(allShows);
  makeListSelectShow(allShows);
  makePageForShows(allShows);
}

//it fetches show list
function fetchShow() {
  return (allShows = getAllShows());
}

//it renders page with shows
function makePageForShows(shows) {
  document.querySelector("#root").innerHTML = "";
  shows = sortArray(shows);
  document.querySelector(
    "#counter_shows"
  ).textContent = `Found ${shows.length} shows`;
  renderShowList(shows);

  ////////////////////////
}

//it renders all shows on page
function renderShowList(shows) {
  shows.forEach((element) => {
    renderShow(element);
  });
}

//it renders show
function renderShow(showList) {
  let divForEachShow = document.createElement("div");
  document.querySelector("#root").appendChild(divForEachShow);

  let h1ShowName = document.createElement("h1");
  divForEachShow.appendChild(h1ShowName);
  h1ShowName.textContent = showList.name;
  h1ShowName.className = "link-to-episode";

  let divForContentShow = document.createElement("div");
  divForEachShow.appendChild(divForContentShow);

  let imgForShow = document.createElement("img");
  divForEachShow.appendChild(imgForShow);
  imgForShow.src = showList.image.medium;

  let divForSummary = document.createElement("div");
  divForEachShow.appendChild(divForSummary);
  divForSummary.innerHTML = showList.summary;

  let ulForShow = document.createElement("ul");
  divForEachShow.appendChild(ulForShow);

  let liRatedShow = document.createElement("li");
  ulForShow.appendChild(liRatedShow);
  liRatedShow.textContent = showList.rating.average;

  let liGenresShow = document.createElement("li");
  ulForShow.appendChild(liGenresShow);
  liGenresShow.textContent = showList.genres;

  let liStatusShow = document.createElement("li");
  ulForShow.appendChild(liStatusShow);
  liStatusShow.textContent = showList.status;

  let liRuntimeShow = document.createElement("li");
  ulForShow.appendChild(liRuntimeShow);
  liRuntimeShow.textContent = showList.runtime;

  h1ShowName.addEventListener("click", () => {
    console.log(showList.id); ///////////////////////////////////////
    fetchEpisodes(showList.id);
    renderSearchPanelForEpisodes();
  });
}

//it renders search panel for all shows
function renderSearchShow(shows) {
  //elements search items
  let searchItemsShow = document.createElement("div");
  searchItemsShow.className = "search_show";
  document.querySelector("#search_root").appendChild(searchItemsShow); /////111111111111111111

  let labelSearchItemsShow = document.createElement("label");

  let inputSearchItemsShow = document.createElement("input");

  searchItemsShow.appendChild(labelSearchItemsShow);
  searchItemsShow.appendChild(inputSearchItemsShow);

  inputSearchItemsShow.id = "search_item_show";
  inputSearchItemsShow.type = "text";
  inputSearchItemsShow.placeholder = "Filtering for";

  labelSearchItemsShow.textContent = "Filtering for";
  labelSearchItemsShow.htmlFor = "search_item_show";

  //elements select items

  let selectSearchedShow = document.createElement("div");
  selectSearchedShow.className = "select_show";
  document.querySelector("#search_root").appendChild(selectSearchedShow); /////111111111111111111

  let labelSelectShow = document.createElement("label");
  labelSelectShow.id = "counter_shows";

  selectSelectShow = document.createElement("select");

  selectSearchedShow.appendChild(labelSelectShow);
  selectSearchedShow.appendChild(selectSelectShow);

  selectSelectShow.id = "select-show";
  selectSelectShow.className = "select";
  selectSelectShow.name = "select";
  labelSelectShow.htmlFor = "select-show";
  /////////////////////////////////////////////////////////////

  //makeListSelectShow(shows);
  /*   shows = sortArray(shows);
  document.querySelector("#root").innerHTML = "";
  shows.forEach((element) => {
    ///////////////////////////////////////////////////////////////////////////////
    let selectShows = document.createElement("option");
    document.querySelector("#select-show").appendChild(selectShows);
    selectShows.value = element.id;
    selectShows.textContent = element.name;
    /////////////////////////////////////////////////////////////////////////////////////
  }); */
  ////////////////////////////
  //counterOfSearchedShows(shows);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  document.querySelector("#search_item_show").addEventListener("input", () => {
    let searchItem = document.querySelector("#search_item_show").value;
    // console.log(searchEpisodes(shows, searchItem));
    let searched = searchEpisodes(shows, searchItem);
    makePageForShows(searched);
    makeListSelectShow(searched);

    //////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////
  });
}

//
function makeListSelectShow(shows) {
  document.querySelector("#select-show").innerHTML = "";
  shows = sortArray(shows);

  renderListSelectShow(shows);
}

function renderListSelectShow(shows) {
  sortArray(shows).forEach((element) => {
    renderList(element);
  });

  console.log("ttt", shows);

  //it expects a choice in List of shows
  document.querySelector("#select-show").addEventListener("change", () => {
    let showID = document.querySelector("#select-show").value;

    fetchEpisodes(showID);
    renderSearchPanelForEpisodes();
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderSearchPanelForEpisodes() {
  document.querySelector("#search_root").innerHTML = "";
}

function renderList(element) {
  let selectShows = document.createElement("option");

  document.querySelector("#select-show").appendChild(selectShows);
  selectShows.value = element.id;
  selectShows.textContent = element.name;

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
/* shows = sortArray(shows);
//document.querySelector("#root").innerHTML = "";
shows.forEach((element) => {
  ///////////////////////////////////////////////////////////////////////////////
  let selectShows = document.createElement("option");
  document.querySelector("#select-show").appendChild(selectShows);
  selectShows.value = element.id;
  selectShows.textContent = element.name;
  /////////////////////////////////////////////////////////////////////////////////////
});
 */

//it counts amount of searched shows
/* function counterOfSearchedShows(shows) {
  document.querySelector(
    "#counter_shows"
  ).textContent = `Found ${shows.length} shows`;
} */

/* function fu() {
  document.querySelector("#search_item_show").addEventListener("input", () => {
    let searchItem = document.querySelector("#search_item_show").value;
    //makePageForShows(searchEpisodes(episodeList, searchItem));
    console.log(searchItem);
  });
} */

//it sorts array alphabetically
function sortArray(array) {
  array = array.sort(function (a, b) {
    if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
    else if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
    return 0;
  });
  return array;
}

//it renders select of Show
function renderShowSelect(allShows) {
  allShows.forEach((allShows) => {
    let selectElement = document.createElement("option");
    document.querySelector("#choose_show").appendChild(selectElement);
    selectElement.value = allShows.id;
    selectElement.textContent = allShows.name;
  });
  fetchEpisodes(document.querySelector("#choose_show").value);
  document.querySelector("#choose_show").addEventListener("change", () => {
    fetchEpisodes(document.querySelector("#choose_show").value);
  });
}

//it fetches episode list
function fetchEpisodes(showID) {
  fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
    .then(function (result) {
      return result.json();
    })
    .then(function (allEpisodes) {
      renderEpisodes(allEpisodes);
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

//it searches episodes by word //////////////////////////////////////////////////////////////////////////////////////////
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
  //it waits when episode will be selected
  document.querySelector("#choose_episode").addEventListener("change", () => {
    searchedEpisode(
      episodeList,
      document.querySelector("#choose_episode").value
    );
  });
}

//it find the index of selected episode in array
function searchedEpisode(episodeList, code) {
  let index = episodeList.findIndex((element) => {
    return element.id == code;
  });

  document.querySelector("#search_word").classList.add("hidden");
  document
    .querySelectorAll(".episode")
    .forEach((element) => element.classList.add("hidden"));
  document
    .querySelector(".episode.hidden:nth-child(" + (index + 1) + ")")
    .classList.remove("hidden");

  document
    .querySelector(".episode:nth-child(" + (index + 1) + ")")
    .scrollIntoView();
  let buttonReturnEpisodes = document.createElement("button");

  buttonReturnEpisodes.textContent = "Return all episodes";
  buttonReturnEpisodes.className = "button_return_episodes";
  document
    .querySelector(".episode:nth-child(" + (index + 1) + ")")
    .append(buttonReturnEpisodes);
  document.querySelectorAll(".button_return_episodes").forEach((element) =>
    element.addEventListener("click", () => {
      element.parentNode.removeChild(element);

      document.querySelector("#search_word").classList.remove("hidden");
      document
        .querySelectorAll(".episode.hidden")
        .forEach((element) => element.classList.remove("hidden"));
      document.querySelector("#choose_episode").value = episodeList[0].id;
      document.querySelector("#search_root").scrollIntoView();
    })
  );
}

window.onload = setup;
