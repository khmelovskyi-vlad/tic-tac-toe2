export default class ConnectionMaster { 
    constructor(connection) {
        this.connection = connection;
    }
  joinToGroup(groupName, playerName) {
      this.connection.invoke("AddToGroup", groupName, playerName)
          .catch(
              function (err) {
                  return console.error(err.toString())
      });
  }
  async start() {
      await this.connection.start().catch(function (e) {
          console.log(e);
    });;
  }
  receiveMessage() {
      this.connection.on("ReceiveMessage", function (message) {
          console.log(message);
    })
  }
//   startGame(startGame, player1Name, linesCount, winLine, groupName, connector) {
//       console.log("watafack Player1");
//       this.connection.on("StartGame", function (player2Name) {
//           if (!connector.isWaiting) {
//             connector.isWaiting = true;
//             startGame(player1Name, player2Name, linesCount, winLine, groupName, player1Name);
//           }
//     })
//   }
  startGameAsPlayer1(startGame, player1Name, linesCount, winLine, groupName, connector) {
      this.connection.on("StartGameAsPlayer1", function (player2Name) {
          // if (player1Name === player2Name) {
          //   connector.reloadPageServer(groupName);
          // }
          // else {
            connector.sendPlayerNameServer(groupName, player1Name);
            startGame(player1Name, player2Name, linesCount, winLine, groupName, player1Name);
          // }
    })
  }
  startGameAsPlayer2(startGame, player2Name, linesCount, winLine, groupName) {
      this.connection.on("StartGameAsPlayer2", function (player1Name) {
          startGame(player1Name, player2Name, linesCount, winLine, groupName, player2Name);
    })
  }
  reloadPage() {
      this.connection.on("ReloadPage", function () {
        location.reload();
    })
  }
  reloadPageServer(groupName) {
      this.connection.invoke("SendReloadPage", groupName);
  }
  sendPlayerNameServer(groupName, player1Name) {
    this.connection.invoke("SendPlayerName", groupName, player1Name);
    //   this.addConsoleError(function (groupName, player1Name) {
    //       this.connection.invoke("SendPlayerName", groupName, player1Name)
    //   }, [groupName, player1Name]);
  }
  addConsoleError(func, ...args){
      func(args).catch(
              function (err) {
                  return console.error(err.toString())
      });
  }
  sendCoordinates(groupName, i, j) {
    this.connection.invoke("SendCoordinates", groupName, i, j).catch(
              function (err) {
                  return console.error(err.toString())
              });
  }
  receiveCoordinates(runSectionSessionCoordinates) {
      this.connection.on("ReceiveCoordinates", function (i, j) {
          runSectionSessionCoordinates(i, j)
    })
  }
}