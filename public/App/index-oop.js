// # C L A S S E S

// ### Class TASK: handling tasks
// #### --> instantiate a task-object every time a task is created
// ####    (class not needed until a task has been added)
class Task {
  // instantiate a task and pass params
  constructor(title, description, dueDate) {
    // assign params to properties of that object
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._done = false; // Undone
  }
  // Add method for check marked as Done
  markAsDone() {
    this._done = true;
  }
}

// ### Class TaskList: display / remove / edit task on a list or showing alerts etc.
class TaskList {
  // TAKE the whole DIV.TASK-CARD created in function 'createTodoCard' and
  // APPEND (paste) it to the actual div.task-container (see index.html) for 'todoList' or 'doneList':
  static addTaskToList(task) {
    const todoList = document.querySelector(".task-container"); // grab todoList Container from the DOM
    todoList.appendChild(
      createTodoCard(task._title, task._description, task._dueDate)
    ); // todoList.appendChild(todoDiv);
  }
  // Method - Display alert to prevent from submitting empty form
  static displayCustomAlert(message, alertType) {
    // construct alert element, create div
    const div = document.createElement("div");
    // Add class to style alert
    div.classList.add("custom-alert", alertType);
    div.innerText = message; // Add alert text passed by event clicked

    // Select parent and where to display the customAlert
    const mainContainer = document.querySelector("main");
    const form = document.querySelector("#todo-form");
    // display alert IN main BEFORE the form
    // insertBefore takes 2 params: (what to insert (div), before what (form))
    mainContainer.insertBefore(div, form);

    // setTimeout for alert to disappear
    setTimeout(function () {
      document.querySelector(".custom-alert").remove();
    }, 2000);
  }

  // Method - Clear Form
  static clearForm() {
    // note: passing as variables did not work --> select items directly works:
    document.querySelector("#form-task-title").value = "";
    document.querySelector("#form-task-description").value = "";
    document.querySelector("#form-task-duedate").value = "";
  }
}

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
