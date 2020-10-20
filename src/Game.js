import FileMaster from "./FileMaster";
import SectionMaster from "./SectionMaster";
import Deleter from "./Deleter";
import ConnectionMaster from "./ConnectionMaster";
import ImageMaster from "./ImageMaster";
export default class Game {
  constructor(gamePlayer1, gamePlayer2, linesCount, winLine, startGameTime,
    currentPlayer, isMyMove, groupName, connectionMaster, mustSaveData) {
    this.gamePlayer1 = gamePlayer1;
    this.gamePlayer2 = gamePlayer2;
    this.linesCount = linesCount;
    this.winLine = winLine;
    this.startGameTime = startGameTime;
    this.currentPlayer = currentPlayer;
    this.isMyMove = isMyMove;
    this.groupName = groupName;
    this.connectionMaster = connectionMaster;
    this.mustSaveData = mustSaveData;
  }
  Run() {
    const sectionMaster = new SectionMaster();
    sectionMaster.initializeSections(this);
    this.startGame();
  }
  startGame() {
    let mainSection = document.querySelector(".mainSection");
    let startGameForm = document.querySelector(".startGameForm");
    startGameForm.style.display = "inline";
    document.querySelector("#startGameInput").onclick = () => {
      startGameForm.style.display = "none";
      this.addPlayersInformationElements();
      mainSection.style.display = "inline";
    }
  }
  
  addPlayersInformationElements() {
    let playersInformation = document.querySelector(".playersInformation");
    playersInformation.appendChild(this.gamePlayer1.createPlayerElement("Player1 name:"));
    playersInformation.appendChild(this.gamePlayer2.createPlayerElement("Player2 name:"));
    playersInformation.style.display = "inline"
  }

  checkWin(currentCoordinates, selectedCoordinates) {
    if (selectedCoordinates.length >= this.winLine) {
      if (this.checkCoordinates(currentCoordinates[1],
        selectedCoordinates.filter(coordinates => coordinates[0] === currentCoordinates[0])
          .map(coordinates => coordinates[1])) ||
      
        this.checkCoordinates(currentCoordinates[0],
        selectedCoordinates.filter(coordinates => coordinates[1] === currentCoordinates[1])
            .map(coordinates => coordinates[0])) ||
      
        this.checkCoordinates(currentCoordinates[0], selectedCoordinates.filter(coordinates => coordinates[0] - coordinates[1]
          === currentCoordinates[0] - currentCoordinates[1]).map(coordinates => coordinates[0])) ||
      
          this.checkCoordinates(currentCoordinates[0], selectedCoordinates.filter(coordinates => coordinates[0] + coordinates[1]
          === currentCoordinates[0] + currentCoordinates[1]).map(coordinates => coordinates[0]))) {
        return true;
      }
    }
        return false;
  };
  checkCoordinates (currentCoordinate, selectedCoordinates) {
    let numberOfCoincidences = 0;
    for (let i = currentCoordinate; i <= this.linesCount; i++){
      if (selectedCoordinates.includes(i)) {
        numberOfCoincidences++;
      }
      else {
        break;
      }
    }
    for (let i = currentCoordinate - 1; i > 0; i--){
      if (selectedCoordinates.includes(i)) {
        numberOfCoincidences++;
      }
      else {
        break;
      }
    }
    return numberOfCoincidences >= this.winLine;
  }
  addGame(wonPlayerName) {
    const gameId = FileMaster.addGame(this);
    const playerIDs = FileMaster.addGamePlayers(wonPlayerName, this, gameId);
    FileMaster.addSections(this, playerIDs);
  }
  addSectionOnclickEvent(section, o, x) {
    section.onclick = () => {
      if (!section.firstChild && this != undefined && this.isMyMove) {
        this.runSectionSession(section, o, x);
        // if (this.currentPlayer === "player1") {
        //   this.runSectionFunc(this.gamePlayer1, "player2", o, x, section);
        // } else {
        //   this.runSectionFunc(this.gamePlayer2, "player1", o, x, section);
        // }
      }
    };
  }
  getNeedSection(i, j) {
    return document.querySelector(`[id='${i}-${j}']`);
  }
  runSectionSessionCoordinates(i, j) {
    const XOElements = ImageMaster.createXOElements();
    this.runSectionSession(this.getNeedSection(i, j), XOElements.o, XOElements.x);
  }
  runSectionSession(section, o, x) {
    if (this.currentPlayer === "player1") {
          this.runSectionFunc(this.gamePlayer1, "player2", o, x, section);
        } else {
          this.runSectionFunc(this.gamePlayer2, "player1", o, x, section);
        }
  }

  runSectionFunc (player, anotherPlayerString, o, x, section) {
    this.addImg(section, player, o, x);
    section.style.paddingTop = "0px";
    const currentCoordinate = section.id.split("-").map(stringCoordinate => Number.parseInt(stringCoordinate, 10));
    player.selectedSections.push(currentCoordinate);
    this.currentPlayer = anotherPlayerString;
    if (this.isMyMove) {
      this.connectionMaster.sendCoordinates(this.groupName, currentCoordinate[0], currentCoordinate[1]);
    }
    this.isMyMove = !this.isMyMove;

    if (this.checkWin(currentCoordinate, player.selectedSections)) {
      if (this.mustSaveData) {
        this.addGame(player.name);
      }
      this.addCongratulations(player.name);
      this.addContinuations();
    }
  };
  addImg(section, player, o, x) { return player.figure === "o" ? section.appendChild(o) : section.appendChild(x); };
  
  createTextCenterP(text) {
    let congratulationsP = document.createElement("p");
    congratulationsP.classList = "text-center";
    congratulationsP.textContent = text;
    return congratulationsP;
  }
  addCongratulations(playerName) {
    let congratulationsDiv = document.querySelector(".congratulations");
    congratulationsDiv.appendChild(this.createTextCenterP(`Player ${playerName} won`));
    congratulationsDiv.appendChild(this.createTextCenterP("CONGRATULATIONS!!"));
    congratulationsDiv.style.display = "inline";
    document.querySelector(".mainSection").style.display = "none";
  }
  addContinuations() {
    let continueElement =  document.querySelector("#continue");
    let createNew = document.querySelector("#createNew");
    continueElement.onclick = () => {
      Deleter.removeAllData();
      this.changeGameData();
      this.Run();
    }
    createNew.onclick = () => {
      location.reload();
    }
  }
  changeGameData() {
    this.startGameTime = new Date();
    this.gamePlayer1.selectedSections = [];
    this.gamePlayer2.selectedSections = [];
  }
}
