//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  //makePageForEpisodes(allEpisodes);
  ///////////////////////////////////////
  let counterEpisodes = document.querySelector("#search + label");
  counterEpisodes.textContent = `Displaying
  ${allEpisodes.length}/${allEpisodes.length} episodes`;
  ////////////
  ////////////
  document.querySelector("#search").addEventListener("keypress", () => {
    let stringSearch = document.querySelector("#search").value;
    document.querySelector("#search + label").textContent = `Displaying ${
      searchEpisodes(allEpisodes, stringSearch).length
    }/${allEpisodes.length} episodes`;
    console.log(searchEpisodes(allEpisodes, stringSearch));
  });

  ///////////////////////////////////////
  //const oneShow = getOneShow();
  //console.log(oneShow);
  //makePageForEpisodes(oneShow);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

//it searches episodes by word
function searchEpisodes(episodeList, stringForSearch) {
  let searchingResult = episodeList.filter((episode) => {
    return (
      episode.name.includes(stringForSearch) ||
      episode.summary.includes(stringForSearch)
    );
  });
  return searchingResult;
}
window.onload = setup;
