// export default class Player {
//   constructor(options) {
//     this.name = options.name;
//     this.figure = options.figure;
//     this.gamesWon = options.gamesWon;
//     this.selectedSections = options.selectedSections;
//   }
// }
export default class Player {
  constructor(name, games) {
    this.name = name;
    this.games = games;
  }
}
