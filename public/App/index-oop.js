// # C L A S S E S
import Task from "./models/Task.js";
import TaskList from "./models/TaskList.js";

// ### Event-Handler: Add a new Task
document
  .querySelector(".button-add-task")
  .addEventListener("click", addTodoCard); // execute funtion addToDoCard

function addTodoCard(event) {
  event.preventDefault(); // prevent from submitting/reload

  // select form-elements needed for task values
  const title = document.querySelector("#form-task-title").value,
    description = document.querySelector("#form-task-description").value,
    dueDate = document.querySelector("#form-task-duedate").value;

  // Instantiate a new task
  const task = new Task(title, description, dueDate);
  console.log(task); // console.log(task);

  // prevent form from submitting when fields are empty:
  if (title === "" || description === "" || dueDate === "") {
    const message = "Please add information to all fields.";
    TaskList.displayCustomAlert(message, "alert-empty-fields"); //pass message and class of alertType based on event
  } else {
    const message = "New task added to list.";
    TaskList.displayCustomAlert(message, "alert-success");

    // Add new task to be displayed on todoList
    // with TaskList method addTaskToList, that creates a card calling 'createTodoCard':
    TaskList.addTaskToList(task);

    // CLEAR Form Input.Values
    TaskList.clearForm();
  }
}

// sb-todo:
// intercept dummy clicking causing multiple alerts
