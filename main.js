const items = document.querySelector(".app__items");

const form = document.querySelector(".app__form");
const input = document.querySelector(".form__input");

let itemsArr = [];

// Add item function
function onAdd(event) {
  event.preventDefault();
  const newItem = input.value;

  if (input.value == "") {
    input.focus();
    return;
  }

  const newId = Date.now();

  itemsArr.push({ id: newId, name: newItem });
  localStorage.setItem("items", JSON.stringify(itemsArr));

  const li = createLi(newItem, newId);

  input.value = "";

  li.scrollIntoView();
}

// Delete item function
function onDelete() {
  const selectedItem = this.parentNode;
  itemsArr = itemsArr.filter(item => {
    return String(item.id) !== selectedItem.id;
  });

  localStorage.setItem("items", JSON.stringify(itemsArr));

  items.removeChild(selectedItem);
}

// Make li tag function
function createLi(item, id) {
  const li = document.createElement("li");
  li.setAttribute("class", "item");
  li.innerHTML = `
      <span class="item__name">${item}</span>
      <button class="item__deleteBtn">
        <i class="fas fa-trash-alt"></i>
      </button>
      `;

  const deleteBtn = li.lastElementChild;
  deleteBtn.addEventListener("click", onDelete);

  li.id = id;
  items.appendChild(li);

  return li;
}

// Form event
form.addEventListener("submit", onAdd);

// Load lists
window.addEventListener("load", () => {
  input.focus();
  const localItems = localStorage.getItem("items");

  if (localItems) {
    itemsArr = JSON.parse(localItems);
    itemsArr.forEach(item => {
      createLi(item.name, item.id);
    });
  }
});
