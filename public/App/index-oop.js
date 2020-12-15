// console.log(taskDatabase);
const todoList = document.querySelector(".task-container"); // grab todoList Container from the DOM

// # C L A S S E S

// ### Class TASK: handling tasks
class Task {}

// ### Class TaskList: display / remove / edit task on a list or showing alerts etc.
class TaskList {}

// ### Event-Handler: Add a new Task
document
  .querySelector(".button-add-task")
  .addEventListener("click", addTodoCard); // execute funtion addToDoCard

function addTodoCard(event) {
  const title = document.querySelector("#form-task-title");
  const description = document.querySelector("#form-task-description");
  const dueDate = document.querySelector("#form-task-duedate");

  event.preventDefault(); // prevent form from submitting/reload

  // prevent form from submitting when fields are empty:
  if (title.value == "" || description.value == "" || dueDate.value == "") {
    isEmpty(title, description, dueDate);
    return;
  }

  // CREATE main DIV.TASK-CARD that displays the task content
  // FINALLY TAKE the whole DIV.TASK-CARD created in function 'createTodoCard'
  // + APPEND (paste) it to the actual div.task-container (set in the markup):
  todoList.appendChild(createTodoCard(title, description, dueDate)); // todoList.appendChild(todoDiv);

  // CLEAR Form Input.Values
  title.value = "";
  description.value = "";
  dueDate.value = "";
}
