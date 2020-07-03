//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();

  makePageForEpisodes(allEpisodes);
  searchResultRender(allEpisodes);
  //const oneShow = getOneShow();
  //console.log(oneShow);
  //makePageForEpisodes(oneShow);
}

//it renders page with episodes
function makePageForEpisodes(episodeList) {
  document.querySelector("#root").innerHTML = "";
  episodeList.forEach(renderEpisode);
}

// it renders searched episodes and counter of episodes
function searchResultRender(episodeList) {
  let counterEpisodes = document.querySelector("#search + label");
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

//it makes unique code of each episode
function settingCode(symbol, number) {
  let code;
  if (number < 10) {
    code = `${symbol}0${number}`;
  } else {
    code = `${symbol}${number}`;
  }
  return code;
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
    settingCode("s", episode.season) + settingCode("e", episode.number);

  //nested img of each episode
  let imgMedium = document.createElement("img");
  divContainer.append(imgMedium);
  imgMedium.src = episode.image.medium;

  //nested summary paragraph for each episode
  let divSummary = document.createElement("div");
  divContainer.append(divSummary);
  divSummary.innerHTML = episode.summary;
}

window.onload = setup;
