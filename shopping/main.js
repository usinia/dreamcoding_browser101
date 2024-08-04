const items = document.querySelector(".items");
const form = document.querySelector(".new-form");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  onAdd();
});

/*
addBtn.addEventListener("click", onAdd);
// keypress : deprecated
// keydown : 한글 입력시 2번씩 입력됨
// keyup 사용 or event.isComposing (입력중) 확인해서 처리
input.addEventListener("keydown", (event) => {
  if (event.isComposing) return;
  if (event.key === "Enter") onAdd();
});
*/

function onAdd() {
  const text = input.value;

  if (!text) {
    input.focus();
    return;
  }

  const item = createItem(text);
  items.appendChild(item);

  item.scrollIntoView({ block: "center" }); // 새로 추가된 아이템으로 스크롤

  input.value = "";
  input.focus();
}

function createItem(text) {
  if (!text) return null;

  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");

  const item = document.createElement("div");
  item.setAttribute("class", "item");

  const name = document.createElement("span");
  name.setAttribute("class", "item__name");
  // name.textContent = text; /* 요소가 가지고 있는 텍스트 */
  name.innerText = text; /* 사용자에게 보여지고 있는 텍스트 */

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "item__delete");
  deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
  deleteBtn.addEventListener("click", () => itemRow.remove());

  const divider = document.createElement("div");
  divider.setAttribute("class", "item__divider");

  item.appendChild(name);
  item.appendChild(deleteBtn);

  itemRow.append(item);
  itemRow.append(divider);

  return itemRow;
}
