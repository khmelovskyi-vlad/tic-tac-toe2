import Player from "./Player";

export default class GamePlayer extends Player {
    constructor(name, games, figure, selectedSections) {
      super(name, games);
      this.figure = figure;
      this.selectedSections = selectedSections;
    }
    static initializePlayer(playerName, figure) {
      let games = JSON.parse(localStorage.getItem(playerName));
      if (games === null || typeof games === "undefined") {
        games = new Array();
      }
      return new GamePlayer(playerName, games, figure, []);
    }
    createPlayerElement(text) {
      let playerDiv = document.createElement("div");
      let playerP = document.createElement("p");
      playerP.textContent = `${text} ${this.name}`; //game.gamePlayer1.name
      playerDiv.appendChild(playerP);
      return playerDiv;
    }
}
