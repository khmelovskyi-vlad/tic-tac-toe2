import ImageMaster from "./ImageMaster";
export default class SectionMaster {
    createHorizontalSection(i) {
      let horizontalSection = document.createElement("div");
      horizontalSection.id = `section${i}`;
      horizontalSection.classList = "row w-100 m-0 p-0 flex-nowrap";
      return horizontalSection;
    }
    createSection(i,j, sidePrecentLength) {
      let section = document.createElement("div");
      section.classList = "section";
      section.id = `${i}-${j}`;
      section.style.paddingTop = `${sidePrecentLength}%`;
      section.style.width = `${sidePrecentLength}%`;
      section.style.lineHeight = "0px";
      return section;
    }
    // createXOElements() {
    //   let x = document.createElement("img");
    //   x.src = "../src/img/x.jpg";
    //   x.style.width = "100%";
    //   let o = document.createElement("img");
    //   o.src = "../src/img/o.jpg";
    //   o.style.width = "100%";
    //   return {x,o};
    // }
    initializeSections(game) {
      let mainSection = document.querySelector(".mainSection");
      mainSection.style.display = "none"
      document.querySelector("#waiting").style.display = "none";
      const sidePrecentLength = 100 / game.linesCount;
      for (let i = 1; i <= game.linesCount; i++) {
        let horizontalSection = this.createHorizontalSection(i);
        for (let j = 1; j <= game.linesCount; j++) {
          let section = this.createSection(i,j,sidePrecentLength);
        
          const XOElements = ImageMaster.createXOElements();
        
          game.addSectionOnclickEvent(section, XOElements.o, XOElements.x);
        
          horizontalSection.appendChild(section);
          mainSection.appendChild(horizontalSection);
        }
      }
    }
}