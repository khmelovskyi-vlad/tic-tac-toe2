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
import FileMaster from "./FileMaster";

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
function log() {
    document.getElementById('results').innerText = '';

    Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
            msg = "Error: " + msg.message;
        }
        else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg, null, 2);
        }
        document.getElementById('results').innerText += msg + '\r\n';
    });
}

document.getElementById("login").addEventListener("click", login, false);
document.getElementById("api").addEventListener("click", api, false);
document.getElementById("logout").addEventListener("click", logout, false);

function take() {
    document.getElementById('resultsTake').textContent += "x ";
    mgr.getUser().then(function (user) {
        if (user == null) {
            document.getElementById('resultsTake').textContent += "user=null  ";
        }
        else if (user == undefined) {
            document.getElementById('resultsTake').textContent += "user=undefined  ";
        }
        document.getElementById('resultsTake').textContent += "y ";
        document.getElementById('resultsTake').textContent += user.id_token;
        document.getElementById('resultsTake').textContent += user.profile;
        document.getElementById('resultsTake').textContent += user;
    });
}
var config = {
    authority: "https://localhost:5001",
    client_id: "js",
    redirect_uri: "http://127.0.0.1:5500/dist",
    response_type: "id_token token",
    scope: "openid profile api1",
    post_logout_redirect_uri: "http://127.0.0.1:5500/dist",
};
var mgr = new Oidc.UserManager(config);
console.log(mgr);
mgr.getUser().then(function (user) {
    if (user) {
        log("User logged in", user.profile);
    }
    else {
        log("User not logged in");
    }
});

function login() {
    mgr.signinRedirect();
}

function api() {
    mgr.getUser().then(function (user) {
        var url = "https://localhost:6001/identity";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        // xhr.withCredentials = true;
        xhr.onload = function () {
            log(xhr.status, JSON.parse(xhr.responseText));
        }
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.send();
    });
}
function logout() {
    mgr.signoutRedirect();
}


mgr.getUser().then(
    function (user) {
    const fileMaster = new FileMaster(user.access_token);
    const connectionMaster = new ConnectionMaster(Connector.createConnection(user.access_token));
    connectionMaster.reloadPage();
    connectionMaster.start();
    const tic_tac_toe = new Tic_tac_toe(connectionMaster, fileMaster);
    tic_tac_toe.Run(user.profile.name);
});

