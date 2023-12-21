let todoList = [];

function loadTodos() {
  let storedTodos = localStorage.getItem("todoList");
  if (storedTodos) {
    todoList = JSON.parse(storedTodos);
  }
  displayItems();
}

function saveTodos() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function addTodo() {
  let inputElement = document.querySelector("#todo-input");
  let dateElement = document.querySelector("#todo-date");

  let todoItem = inputElement.value;
  let todoDate = dateElement.value;

  if (todoItem.trim() !== "" && todoDate.trim() !== "") {
    todoList.push({ item: todoItem, dueDate: todoDate });
    inputElement.value = "";
    dateElement.value = "";
    saveTodos();
    displayItems();
  }
}

function displayItems() {
  let containerElement = document.querySelector(".todo-container");
  let newHtml = "";
  for (let i = 0; i < todoList.length; i++) {
    let { item, dueDate } = todoList[i];
    newHtml += `
    <span>${item}</span>
    <span>${dueDate}</span>
    <button class="btn-delete" onclick="todoList.splice(${i},1); saveTodos(); displayItems();">Delete</button>
    `;
  }
  containerElement.innerHTML = newHtml;
}

loadTodos();

let inputElement = document.querySelector("#todo-input");
let dateElement = document.querySelector("#todo-date");
let addButton = document.querySelector("#add-button");

inputElement.addEventListener("input", enableAddButton);
dateElement.addEventListener("input", enableAddButton);

function enableAddButton() {
  if (inputElement.value.trim() !== "" && dateElement.value.trim() !== "") {
    addButton.disabled = false;
  } else {
    addButton.disabled = true;
  }
}
