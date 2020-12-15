// # C L A S S E S

// ### Class TaskList: display / remove / edit task on a list or showing alerts etc.
export default class TaskList {
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
