export default class Connector {
  static createConnection(accessToken) {
    let connection = new signalR.HubConnectionBuilder()
    // .withUrl("https://localhost:44392/tic_tac_toehub", { accessTokenFactory: () => this.loginToken })
    // .withUrl("https://localhost:6001/tic_tac_toehub")
      .withUrl("https://localhost:6001/tic_tac_toehub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
    .configureLogging(signalR.LogLevel.Information)
    
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
    return connection;
  }
}