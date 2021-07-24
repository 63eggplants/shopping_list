const appLists = document.querySelector(".app__lists");
const deleteBtn = document.querySelector(".list__deleteBtn");

const form = document.querySelector(".app__form");
const addInput = document.querySelector(".form__addInput");
const addBtn = document.querySelector(".form__addBtn");

// Add item
function addList(event) {
  event.preventDefault();
  const newItem = addInput.value;
  addInput.value = "";
  const li = document.createElement("li");
  li.setAttribute("class", "list");
  li.innerHTML = `
  <span class="list__item">${newItem}</span>
  <button class="list__deleteBtn">
    <i class="fas fa-trash-alt"></i>
  </button>
  `;
  appLists.appendChild(li);
}
form.addEventListener("submit", addList);
