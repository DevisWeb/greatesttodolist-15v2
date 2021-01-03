// # C L A S S E S
import Task from "./models/Task.js";
import TaskList from "./models/TaskList.js";
import TaskStorage from "./models/TaskStorage.js";

const todoList = document.querySelector(".task-container");
const doneList = document.querySelector(".task-container-done");

// ============== EVENT LISTENER - DOM LOADING (-> display tasks from local storage)
document.addEventListener("DOMContentLoaded", TaskStorage.displayTasks());

// ============== EVENT LISTENER - FORM SUBMIT
document
  .querySelector(".button-add-task")
  .addEventListener("click", addTodoCard); // execute funtion addToDoCard

// -------------- EVENT HANDLER: ADD a new Task
function addTodoCard(event) {
  event.preventDefault(); // prevent from submitting/reload

  // SELECT form-elements needed for task values
  const title = document.querySelector("#form-task-title").value,
    description = document.querySelector("#form-task-description").value,
    dueDate = document.querySelector("#form-task-duedate").value;

  // Instantiate objects
  const task = new Task(title, description, dueDate);
  const taskList = new TaskList(); // takes care of adding task to the list containers
  console.log("## see prototype taskList:\n" + taskList);

  // PREVENT from submitting when fields are empty:
  if (title === "" || description === "" || dueDate === "") {
    const message = "Please add information to all fields.";
    taskList.displayCustomAlert(message, "alert-warning"); //pass message and class of alertType based on event
    return;
  }

  TaskStorage.saveLocal(task); // static class --> NO INSTANTIATION of class needed
  taskList.addTaskToList(task); // 'addTaskToList' creates a card for UI with 'createTaskCard'
  taskList.clearForm();

  // ALERT (change styling in alerts.css)
  const message = "New task added to list.";
  taskList.displayCustomAlert(message, "alert-success");
}

// ============== EVENT LISTENERS for whole task-containers (.task-container && .task-container-done)
// -------------- add funcionality (method) based on what is clicked
todoList.addEventListener("click", deleteCheckEdit);
doneList.addEventListener("click", deleteCheckEdit); // important for actions in second container (done tasks)!

// -------------- Evend-Handling: DELETE, CHECK, EDIT
function deleteCheckEdit(e) {
  const task = new Task();
  const taskList = new TaskList();
  const cardSelected = e.target.parentElement.parentElement.parentElement;
  task.uid = cardSelected.querySelector(".task-uid").innerText;
  task.title = cardSelected.querySelector(".task-title").innerText;
  task.description = cardSelected.querySelector(".task-description").innerText;
  task.dueDate = cardSelected.querySelector(".task-duedate").innerText;

  // --------------- DELETE a task-Card that is displayed on a .task-container
  if (e.target.classList.contains("task-delete")) {
    console.log("task.uid on task-delete\n" + task + "\n" + task.uid);

    TaskStorage.removeTask(task); // remove task from localStorage
    taskList.deleteTask(cardSelected); // remove whole task card (html) from UI

    const message = "Task has been removed from list.";
    taskList.displayCustomAlert(message, "alert-success");

    e.preventDefault(); // prevent from reload
  }

  // --------------- CHECK MARK TASK:
  if (
    e.target.classList.contains("task-complete") ||
    e.target.classList.contains("task-uncomplete")
  ) {
    taskList.moveTaskCard(e.target, cardSelected); // move card to container todoList or doneList
    taskList.toggleStyleTaskCard(e.target, cardSelected); // change styles + icon
    taskList.hideShowElement(cardSelected); // remove class .enableEditing to hide input-fields
    console.log("### task-complete-DONE ?\n" + cardSelected.classList);

    if (cardSelected.classList.contains("task-done")) {
      task.markAsDone();
      console.log("done: " + task.done);
      TaskStorage.updateTask(task);
      return;
    }
    if (cardSelected.classList.contains("task-done") === false) {
      task.markAsUndone();
      TaskStorage.updateTask(task);
      console.log("done: " + task.done);
    }
  }

  // --------------- EDIT DIV.TASK-CARD content
  if (e.target.classList.contains("task-edit")) {
    console.log("## classList:\n" + cardSelected.classList);

    // controls hide or show input fields:
    cardSelected.classList.toggle("enableEditing");
    console.log("## classList after toggle:\n" + cardSelected.classList);

    taskList.editTaskCard(cardSelected, task);
    console.log("## Show taskUid \n" + task.uid);
  }
}
