"use strict";

const IMAGE_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class Field {
  constructor(count) {
    this.count = count;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    // this.onClick = this.onClick.bind(this); // this 를 bind 해주거나 화살표 함수를 사용해 변수에 함수를 할당해서 호출한다.
    this.field.addEventListener("click", (evt) => {
      const target = evt.target;
      if (target.matches(".carrot")) {
        target.remove();
        this.onClick && this.onClick("carrot");
      } else if (target.matches(".bug")) {
        this.onClick && this.onClick("bug");
      }
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.count, "img/carrot.png");
    this._addItem("bug", this.count, "img/bug.png");
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - IMAGE_SIZE;
    const y2 = this.fieldRect.height - IMAGE_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.top = `${y}px`;
      item.style.left = `${x}px`;
      this.field.appendChild(item);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
