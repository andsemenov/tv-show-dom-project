//You can edit ALL of the code here
function setup() {
  let allShows = fetchShow();
  renderSearchShow(allShows);
  makeListSelectShow(allShows);
  makePageForShows(allShows);
}

//it fetches show list and sorts it
function fetchShow() {
  allShows = getAllShows();
  return sortArray(allShows);
}

//it renders page with shows
function makePageForShows(shows) {
  renderCounter(shows);
  renderItems(shows, renderShow);
}

//it renders counter with amount of shows
function renderCounter(shows) {
  document.querySelector("#root").innerHTML = "";
  document.querySelector(
    "#counter_shows"
  ).textContent = `Found ${shows.length} shows`;
}

//it renders all shows on page TOGETHER
function renderItems(shows, render) {
  shows.forEach((element) => {
    render(element);
  });
}

//it renders show's elements on page
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
  //checks if image is null and replaces for spare one
  imgForShow.src = checkIfNullImage(showList, "./src/show_noimage.jpg");

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
    renderSearchPanelForEpisodes();
    fetchEpisodes(showList.id);

    console.log(fetchShow());
    console.log(getAllShows());
  });
}

// checks if image is NULL, replaces for spare
function checkIfNullImage(show, link) {
  if (show.image == null) return link;
  return show.image.medium;
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
  inputSearchItemsShow.className = "search";

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

  document.querySelector("#search_item_show").addEventListener("input", () => {
    let searchItem = document.querySelector("#search_item_show").value;
    console.log(searchEpisodes(shows, searchItem));
    let searched = searchEpisodes(shows, searchItem);
    makePageForShows(searched);
    makeListSelectShow(searched);
  });
}

//it renders page with shows
function makeListSelectShow(shows) {
  document.querySelector("#select-show").innerHTML = "";

  renderItems(shows, renderSelect);

  document.querySelector("#select-show").addEventListener("change", () => {
    let showID = document.querySelector("#select-show").value;
    renderSearchPanelForEpisodes();
    fetchEpisodes(showID);
  });
}

function renderSelect(show) {
  let selectShows = document.createElement("option");

  document.querySelector("#select-show").appendChild(selectShows);
  selectShows.value = show.id;
  selectShows.textContent = show.name;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function renderSearchPanelForEpisodes() {
  //document.querySelector("#search_root").innerHTML = "";
  document.querySelector(".search_show").style.display = "none";

  let divSearchRoot = document.querySelector("#search_root");
  //it creates a select element with list of shows
  /* let divChooseShow = document.createElement("div");
  divChooseShow.className = "search_item";
  divSearchRoot.appendChild(divChooseShow);

  let labelForChooseShow = document.createElement("label");
  divChooseShow.appendChild(labelForChooseShow);
  labelForChooseShow.textContent = "Choose a show";
  labelForChooseShow.htmlFor = "choose_show";

  let selectForChooseShow = document.createElement("select");
  divChooseShow.appendChild(selectForChooseShow);
  selectForChooseShow.className = "select";
  selectForChooseShow.name = "select";
  selectForChooseShow.id = "choose_show"; */

  //it creates a select element with list of episodes
  let divForChooseEpisode = document.createElement("div");
  divSearchRoot.appendChild(divForChooseEpisode);
  divForChooseEpisode.className = "search_item";

  let labelForChooseEpisode = document.createElement("label");
  divForChooseEpisode.appendChild(labelForChooseEpisode);
  labelForChooseEpisode.htmlFor = "choose_episode";
  labelForChooseEpisode.textContent = "Choose an episode";

  let selectForChooseEpisode = document.createElement("select");
  divForChooseEpisode.appendChild(selectForChooseEpisode);
  selectForChooseEpisode.className = "select";
  selectForChooseEpisode.name = "select";
  selectForChooseEpisode.id = "choose_episode";

  //it creates an input element for searching among episodes
  let divForSearchItems = document.createElement("div");
  divForSearchItems.className = "search_item";
  divSearchRoot.appendChild(divForSearchItems);

  let labelForSearchItems = document.createElement("label");
  divForSearchItems.appendChild(labelForSearchItems);
  labelForSearchItems.htmlFor = "search";
  labelForSearchItems.textContent = "Search episodes";

  let inputForSearchItems = document.createElement("input");
  divForSearchItems.appendChild(inputForSearchItems);
  inputForSearchItems.type = "text";
  inputForSearchItems.id = "search";
  inputForSearchItems.className = "search";
  inputForSearchItems.placeholder = "Search episodes";

  let counterForSearchItems = document.createElement("span");
  divForSearchItems.appendChild(counterForSearchItems);
  counterForSearchItems.id = "counter";
}

//it sorts array alphabetically
function sortArray(array) {
  array = array.sort(function (a, b) {
    if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
    else if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
    return 0;
  });
  return array;
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

  //checks if image is null and replaces for spare one
  imgMedium.src = checkIfNullImage(episode, "./src/episode_noimage.jpg");
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
  //it waits when episode will be selected/////////////////////////////////////////////////////////////////////////////////
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

  //document.querySelector("#search").classList.add("hidden");
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

      // document.querySelector("#search").classList.remove("hidden");
      document
        .querySelectorAll(".episode.hidden")
        .forEach((element) => element.classList.remove("hidden"));
      document.querySelector("#choose_episode").value = episodeList[0].id;
      document.querySelector("#search").scrollIntoView();
    })
  );
}

window.onload = setup;
