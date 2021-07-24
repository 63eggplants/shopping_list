const appLists = document.querySelector(".app__lists");

const form = document.querySelector(".app__form");
const addInput = document.querySelector(".form__addInput");

let lists = [];

// Delete item function
function deleteItem() {
  const selectedItem = this.parentNode;
  lists = lists.filter(list => {
    return String(list.id) !== selectedItem.id;
  });

  localStorage.setItem("lists", JSON.stringify(lists));
  appLists.removeChild(selectedItem);
}

// Make li tag function
function makeLi(item, id) {
  const li = document.createElement("li");
  li.setAttribute("class", "list");
  li.innerHTML = `
    <span class="list__item">${item}</span>
    <button class="list__deleteBtn">
      <i class="fas fa-trash-alt"></i>
    </button>
    `;

  const deleteBtn = li.lastElementChild;
  deleteBtn.addEventListener("click", deleteItem);

  li.id = id;
  appLists.appendChild(li);

  return li;
}

// Add item function
function addList(event) {
  event.preventDefault();
  const newItem = addInput.value;
  const itemId = Date.now();

  addInput.value = "";

  lists.push({ id: itemId, item: newItem });
  localStorage.setItem("lists", JSON.stringify(lists));

  const li = makeLi(newItem, itemId);
}

// Form event
form.addEventListener("submit", addList);

// Load lists
window.addEventListener("load", () => {
  const localLists = localStorage.getItem("lists");

  if (localLists) {
    lists = JSON.parse(localLists);
    lists.forEach(list => {
      makeLi(list.item, list.id);
    });
  }
});
