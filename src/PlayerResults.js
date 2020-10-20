import "./css/styles.css";
import PlayerMatches from "./PlayerMatches";
import Deleter from "./Deleter";
import FileMaster from "./FileMaster";
export default class PlayerResults {
  Run() {
      this.initializePlayerResults();
  }
  initializePlayerResults() {
    document.querySelector("#allPlayers").onclick = async() =>  {
      Deleter.removeAllData();
      let playersWins = document.querySelector(".playersWins");
      console.log(playersWins);
      playersWins.style.display = "inline";
      const playersMatches = (await FileMaster.getPlayerMatches()).sort((a,b) => b.wonGamesCount - a.wonGamesCount);
      for (let playerMatches of playersMatches){
        let playerMatchesDiv = document.createElement("div")
        playerMatchesDiv.classList = "row flex-column m-1"
        playerMatchesDiv.style.border = "solid";
        playerMatchesDiv.appendChild(this.createTextCenterP(`Player name: ${playerMatches.name}`));
        playerMatchesDiv.appendChild(this.createTextCenterP(`Player won games count: ${playerMatches.wonGamesCount}`));
        playerMatchesDiv.appendChild(this.createTextCenterP(`Player games count: ${playerMatches.gamesCount}`));
        playersWins.appendChild(playerMatchesDiv);
      }
      document.querySelector(".form").style.display = "none";
      // playersWins.style.display = "inline";
      document.querySelector("#playersWinsBack").onclick = () => {
        location.reload();
      };
    };
  }
  async getPlayersMatches() {
    return await FileMaster.getPlayerMatches();
    // let localStorageItems = { ...localStorage };
    // let playersMatches = [];
    // for (let localStorageItem in localStorageItems) {
    //   const games = JSON.parse(localStorage[localStorageItem]);
    //   const wonGamesCount = games.filter(
    //     (game) => JSON.parse(game).wonPlayerName === localStorageItem
    //   ).length;
    //   playersMatches.push(new PlayerMatches(localStorageItem, games.length, wonGamesCount));
    // }
    // return playersMatches;
  }
  createTextCenterP(text) {
    let congratulationsP = document.createElement("p");
    congratulationsP.classList = "text-center";
    congratulationsP.textContent = text;
    return congratulationsP;
  }
}