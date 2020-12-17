// # C L A S S E S
import Task from "./models/Task.js";
import TaskList from "./models/TaskList.js";

const todoList = document.querySelector(".task-container");
const doneList = document.querySelector(".task-container-done");

// ################################################################################################
// ### Event-Handler: ADD a new Task
document
  .querySelector(".button-add-task")
  .addEventListener("click", addTodoCard); // execute funtion addToDoCard

function addTodoCard(event) {
  event.preventDefault(); // prevent from submitting/reload

  // select form-elements needed for task values
  const title = document.querySelector("#form-task-title").value,
    description = document.querySelector("#form-task-description").value,
    dueDate = document.querySelector("#form-task-duedate").value;

  // INSTANTIATE a new task
  const task = new Task(title, description, dueDate);
  // console.log(task);

  // INSTANTIATE a TaskList object (takes care of adding task to the list containers)
  const taskList = new TaskList();
  console.log("see prototype taskList: ");
  console.log(taskList);

  // prevent form from submitting when fields are empty:
  if (title === "" || description === "" || dueDate === "") {
    const message = "Please add information to all fields.";
    taskList.displayCustomAlert(message, "alert-empty-fields"); //pass message and class of alertType based on event
    //taskList.displayCustomAlert(message, "alert-empty-fields"); //pass message and class of alertType based on event
  } else {
    // Add new task to be displayed on todoList
    // with TaskList method 'addTaskToList', that creates a card calling 'createTodoCard':
    taskList.addTaskToList(task);

    // CLEAR Form Input.Values
    taskList.clearForm();

    // ALERT: if task successfully added --> display alert (uses styles from class '.alert-success', see alerts.css)
    const message = "New task added to list.";
    taskList.displayCustomAlert(message, "alert-success");
  }
}
// ################################################################################################

// LISTEN to both task-container with class .task-container --> add funcionality (method) based on what is clicked
// --> listen to whole task-container --> add funcionality based on what is clicked
todoList.addEventListener("click", deleteCheckEdit); // execute funtion deleteCheckEdit + further function
doneList.addEventListener("click", deleteCheckEdit); // important for actions on click in second container for done tasks!
// note: this is another way of structuring the eventlistener with its handlers
function deleteCheckEdit(e) {
  // Instantiate TaskList
  const task = new Task();
  const taskList = new TaskList();
  // ### Event-Handler: DELETE a task that is displayed on a .task-container
  // DELETE DIV.TASK-CARD (= targeted task clicked to be deleted):
  const taskSelected = e.target.parentElement.parentElement.parentElement;

  // DELETE with method deleteTask of Class TaskList
  if (e.target.classList.contains("task-delete")) {
    taskList.deleteTask(e.target, taskSelected); // same as in index.js 'taskChoosen'

    const message = "Task has been removed from list.";
    taskList.displayCustomAlert(message, "alert-success");
    e.preventDefault();
  }

  // CHECK MARK TASK:
  if (
    e.target.classList.contains("task-complete") ||
    e.target.classList.contains("task-uncomplete")
  ) {
    taskList.moveTaskCard(e.target, todoList, doneList, taskSelected); // moves card to other container (todoList or doneList)
    task.markAsDone();
    taskList.toggleStyleTaskCard(e.target, taskSelected); // toggle classes to change styles and icon
    taskList.hideShowElement(taskSelected); // removes class .enableEditing to hide input-fields
  }

  // --> EDIT DIV.TASK-CARD content
  if (e.target.classList.contains("task-edit")) {
    console.log("show class list of class selected before toggle:");
    console.log(taskSelected.classList); // class status before

    // toggle (.enableEditing) between read and edititing whole card:
    // --> this class controls display(block/none) of fields in task_cards.css
    taskSelected.classList.toggle("enableEditing");

    console.log("show class list of class selected after toggle:");
    console.log(taskSelected.classList); // class status after

    taskList.editTaskCard(taskSelected);
  }
}

// sb-todo:
// intercept dummy clicking causing multiple alerts
