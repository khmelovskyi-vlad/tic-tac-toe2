export default class Deleter { 
    
    static removeAllData() {
      let mainSection =  document.querySelector(".mainSection");
      this.removeAllChildNodes(mainSection);
      let playersInformation = document.querySelector(".playersInformation");
      this.removeAllChildNodes(playersInformation);
      playersInformation.style.display = "none";
      let congratulations = document.querySelector(".congratulations");
      let dontTouch = document.querySelector("#dontTouch");
      this.removeAllChildNodes(congratulations);
      congratulations.appendChild(dontTouch);
      congratulations.style.display = "none";
    }
    static removeAllChildNodes(parent) {
      if (parent != undefined) {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild)
        }
      }
    }
}