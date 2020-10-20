import PlayerResults from "./PlayerResults";
import FileMaster from "./FileMaster";
// import SectionMaster from "./SectionMaster";
// import Player from "./Player";
import GamePlayer from "./GamePlayer";
import Game from "./Game";
import ConnectionMaster from "./ConnectionMaster";
// import Deleter from "./Deleter";
// import PlayerMatches from "./PlayerMatches";
// import GamePrototype from "./GamePrototype";

var maxLinesCount = 100;
var maxWinLine = 5;

export default class Tic_tac_toe {
  constructor(connectionMaster) {
    this.connectionMaster = connectionMaster;
  }
  Run() {
      this.initializeData();
      const playerResults = new PlayerResults();
      playerResults.Run();
  }
  initializeData() {
    document.querySelector("#names").onclick = () => {
      const playerElement = document.querySelector("#playerName");
      const linesCount = document.querySelector("#linesCount");
      const winLine = document.querySelector("#winLine");
      const groupElement = document.querySelector("#groupName");
      if (this.checkEnteredData(playerElement.value, linesCount.value, winLine.value, groupName.value )
      ) {
        const groupName = `${groupElement.value}-${linesCount.value}-${winLine.value}`;
        // const groupName = groupElement.value;
        console.log(groupName);
        this.createWaiting(playerElement.value, groupName);
        this.connectionMaster.receiveMessage();
        this.connectionMaster.joinToGroup(groupName, playerElement.value);
        this.connectionMaster.startGameAsPlayer1(this.startGame.bind(this),
          playerElement.value,
          linesCount.value,
          winLine.value,
          groupName,
          this.connectionMaster);
        this.connectionMaster.startGameAsPlayer2(this.startGame.bind(this),
          playerElement.value,
          linesCount.value,
          winLine.value,
          groupName);
        // let game = this.createGame(playerElement.value, playerElement.value, linesCount.value, winLine.value);
        // game.Run();
      } else {
        this.addBadData();
      }
    };
  }
  startGame(player1Name, player2Name, linesCount, winLine, groupName, myPlayerName) {
    this.addPlayer(myPlayerName);
    const game = this.createGame(player1Name, player2Name, linesCount, winLine, groupName, myPlayerName);
    game.Run();
  }
  createWaiting(playerName) {
    this.playerName = playerName;
    document.querySelector(".form").style.display = "none";
    const waitEl = document.createElement("h3");
    waitEl.id = "waiting";
    waitEl.textContent = "Waiting for another player";
    waitEl.style.textAlign = "center";
    document.querySelector(".mainContainer").appendChild(waitEl);
    // document.querySelector("#playerContainer").style.display = "none";
    // const noInputElement = document.querySelector("#noInput");
    // console.log(noInputElement);
    // if (noInputElement != undefined) {
    //   noInputElement.style.display = "none";
    // }
  }
  addBadData () {
    const form = document.querySelector(".form");
    let isH3 = false;
    for (let item of form.childNodes) {
      if (item.tagName === "H3") {
        isH3 = true;
        break;
      }
    }
    if (!isH3) {
      let noInput = document.createElement("h3");
      noInput.appendChild(document.createTextNode("Write all data"));
      noInput.style.color = "#000fff";
      noInput.style.textAlign = "center";
      noInput.id = "noInput";
      form.insertBefore(noInput, document.querySelector(".firstFormDiv"));
      return;
    }
  };
  checkEnteredData(playerName, linesCount, winLine, groupName) {
    if (this.checkValue(playerName) &&
      this.checkValue(groupName) &&
      this.checkValue(linesCount) &&
      this.checkValue(winLine) &&
      this.checkNumber(linesCount, maxLinesCount) &&
      this.checkNumber(winLine, maxWinLine)) {
      return true;
      }
    return false;
  }
  checkValue(value) { return value != undefined && value != ""; };
  checkNumber(value, count) { return Number.parseInt(value, 10) !== NaN && value <= count && value > 2; };
  // checkValue = (value) => value != undefined && value != "";
  // checkNumber = (value, count) => Number.parseInt(value, 10) !== NaN && value <= count && value > 2;
  createGame(player1Name, player2Name, linesCount, winLine, groupName, myPlayerName) {
    let players = this.initializePlayers(player1Name, player2Name);
    let game = new Game(players.gamePlayer1,
      players.gamePlayer2,
      Number.parseInt(linesCount, 10),
      Number.parseInt(winLine, 10),
      new Date(),
      "player1",
      myPlayerName == player1Name,
      groupName,
      this.connectionMaster,
      myPlayerName == player1Name);
    this.connectionMaster.receiveCoordinates(game.runSectionSessionCoordinates.bind(game));
    // const sectionMaster = new SectionMaster();
    // sectionMaster.initializeSections(game, this);
    return game;
  }
  initializePlayers(player1Name, player2Name) {
    const gamePlayer1 = GamePlayer.initializePlayer(player1Name, "o");
    const gamePlayer2 = GamePlayer.initializePlayer(player2Name, "x");
    return { gamePlayer1, gamePlayer2 };
  }
  addPlayer(playerName) {
    FileMaster.addSomeData({ Id: playerName }, "https://localhost:5001/api/Player");
  }
  // addSectionOnclickEvent(section, game, o, x) {
  //   section.onclick = () => {
  //     if (!section.firstChild && game != undefined) {
  //       if (game.currentPlayer === "player1") {
  //         this.runSectionFunc(game.gamePlayer1, "player2", o, x, section, game);
  //       } else {
  //         this.runSectionFunc(game.gamePlayer2, "player1", o, x, section, game);
  //       }
  //     }
  //   };
  // }
  // addGame(wonPlayerName, game) {
  //   let now = new Date();
  //   let gamePeriod = new Date(now - game.startGameTime).getSeconds();
  //   const gamePrototype = new GamePrototype(
  //     game.gamePlayer1.name,
  //     game.gamePlayer2.name,
  //     game.linesCount,
  //     game.winLine,
  //     gamePeriod,
  //     wonPlayerName
  //   )
  //   this.addPlayerData(game.gamePlayer1, gamePrototype);
  //   this.addPlayerData(game.gamePlayer2, gamePrototype);
  //   const gameId = FileMaster.addGame(game);
  //   const playerIDs = FileMaster.addGamePlayers(wonPlayerName, game, gameId);
  //   FileMaster.addSections(game, playerIDs);
  // }
  // addPlayerData(player, gamePrototype) {
  //   player.games.push(JSON.stringify(gamePrototype));
  //   localStorage.setItem(player.name, JSON.stringify(player.games));
  // }
  // runSectionFunc (player, anotherPlayerString, o, x, section, game) {
  //   this.addImg(section, player, o, x);
  //   section.style.paddingTop = "0px";
  //   const currentCoordinate = section.id.split("-").map(stringCoordinate => Number.parseInt(stringCoordinate, 10));
  //   player.selectedSections.push(currentCoordinate);
  //   if (game.checkWin(currentCoordinate, player.selectedSections)) {
  //     game.addGame(player.name);
  //     this.addCongratulations(player.name);
  //     this.addContinuations(game);
  //   }
  //   game.currentPlayer = anotherPlayerString;
  // };
  // addImg (section, player, o, x) { return player.figure === "o" ? section.appendChild(o) : section.appendChild(x); };
  // addImg = (section, player, o, x) => player.figure === "o" ? section.appendChild(o) : section.appendChild(x);
  
  // addContinuations(game) {
  //   let continueElement =  document.querySelector("#continue");
  //   let createNew = document.querySelector("#createNew");
  //   continueElement.onclick = () => {
  //     Deleter.removeAllData();
  //     let newGame = this.createGame(game.gamePlayer1.name, game.gamePlayer2.name, game.linesCount, game.winLine);
  //     newGame.startGame();
  //   }
  //   createNew.onclick = () => {
  //     location.reload();
  //   }
  // }
  // createTextCenterP(text) {
  //   let congratulationsP = document.createElement("p");
  //   congratulationsP.classList = "text-center";
  //   congratulationsP.textContent = text;
  //   return congratulationsP;
  // }
  // addCongratulations(playerName) {
  //   let congratulationsDiv = document.querySelector(".congratulations");
  //   congratulationsDiv.appendChild(this.createTextCenterP(`Player ${playerName} won`));
  //   congratulationsDiv.appendChild(this.createTextCenterP("CONGRATULATIONS!!"));
  //   congratulationsDiv.style.display = "inline";
  //   document.querySelector(".mainSection").style.display = "none";
  // }
}