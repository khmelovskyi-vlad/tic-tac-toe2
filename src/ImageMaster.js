export default class ImageMaster {
  static createXOElements() {
    const x = document.createElement("img");
    x.src = "../src/img/x.jpg";
    x.style.width = "100%";
    const o = document.createElement("img");
    o.src = "../src/img/o.jpg";
    o.style.width = "100%";
    return {x,o};
  }
}