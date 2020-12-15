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
}

// ### Event-Handler: Add a new Task
document
  .querySelector(".button-add-task")
  .addEventListener("click", addTodoCard); // execute funtion addToDoCard

function addTodoCard(event) {
  // select form-elements needed for task values
  const title = document.querySelector("#form-task-title").value,
    description = document.querySelector("#form-task-description").value,
    dueDate = document.querySelector("#form-task-duedate").value;

  event.preventDefault(); // prevent from submitting/reload

  // prevent form from submitting when fields are empty:
  if (title == "" || description == "" || dueDate == "") {
    isEmpty(title, description, dueDate);
    return;
  }

  // Instantiate a new task
  const task = new Task(title, description, dueDate);
  console.log(task); // console.log(task);

  // Add new task to be displayed on todoList
  // with TaskList method addTaskToList, that creates a card calling 'createTodoCard':
  TaskList.addTaskToList(task);

  // old:
  // todoList.appendChild(createTodoCard(title, description, dueDate)); // todoList.appendChild(todoDiv);
}
