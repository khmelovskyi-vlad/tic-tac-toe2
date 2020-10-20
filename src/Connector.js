export default class Connector {
  static createConnection() {
    let connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44392/tic_tac_toehub")
    .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
    return connection;
  }
}