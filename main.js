const appLists = document.querySelector(".app__lists");

const form = document.querySelector(".app__form");
const addInput = document.querySelector(".form__addInput");

let lists = [];

// Delete item
function deleteItem(event) {
  const selectedItem = event.target;
  if (selectedItem.className === "fas fa-trash-alt") {
    appLists.removeChild(selectedItem.parentNode.parentNode);
  } else {
    appLists.removeChild(selectedItem.parentNode);
  }
}

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

  const deleteBtn = li.lastElementChild;
  deleteBtn.addEventListener("click", deleteItem);

  lists.push({ id: Date.now(), item: newItem });
  const jsonLists = JSON.stringify(lists);
  localStorage.setItem("lists", jsonLists);

  appLists.appendChild(li);
}

form.addEventListener("submit", addList);

window.addEventListener("load", () => {
  const localLists = localStorage.getItem("lists");

  if (localLists) {
    lists = JSON.parse(localLists);
    lists.forEach(list => {
      const li = document.createElement("li");
      li.setAttribute("class", "list");
      li.innerHTML = `
        <span class="list__item">${list.item}</span>
        <button class="list__deleteBtn">
          <i class="fas fa-trash-alt"></i>
        </button>
        `;

      const deleteBtn = li.lastElementChild;
      deleteBtn.addEventListener("click", deleteItem);

      appLists.appendChild(li);
    });
  }
});
