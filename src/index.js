import "./css/styles.css";
// import Player from "./Player";
// import GamePlayer from "./GamePlayer";
// import Game from "./Game";
// import PlayerMatches from "./PlayerMatches";
// import GamePrototype from "./GamePrototype";
// var maxLinesCount = 100;
// var maxWinLine = 5;
import Tic_tac_toe from "./Tic_tac_toe";
import Connector from "./Connector";
import ConnectionMaster from "./ConnectionMaster";

// const connection = new signalR.HubConnectionBuilder()
//     .withUrl("/chathub")
//     .configureLogging(signalR.LogLevel.Information)
//     .build();

// async function start() {
//     try {
//         await connection.start();
//         console.log("SignalR Connected.");
//     } catch (err) {
//         console.log(err);
//         setTimeout(start, 5000);
//     }
// };

// connection.onclose(start);

// // Start the connection.
// start();

const connectionMaster = new ConnectionMaster(Connector.createConnection());
connectionMaster.reloadPage();
connectionMaster.start();
const tic_tac_toe = new Tic_tac_toe(connectionMaster);
tic_tac_toe.Run();