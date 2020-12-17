// # C L A S S E S

// ### Class TaskList: display / remove / edit task on a list or showing alerts etc.
export default class TaskList {
  // TAKE the whole DIV.TASK-CARD created in function 'createTodoCard' and
  // APPEND (paste) it to the actual div.task-container (see index.html) for 'todoList' or 'doneList':
  addTaskToList(task) {
    const todoList = document.querySelector(".task-container"); // grab todoList Container from the DOM
    todoList.appendChild(
      createTodoCard(task._title, task._description, task._dueDate)
    ); // todoList.appendChild(todoDiv);
  }

  // Method - Display alert to prevent from submitting empty form
  displayCustomAlert(message, alertType) {
    // construct alert element, create div
    const div = document.createElement("div");
    // Add class to style alert
    div.classList.add("custom-alert", alertType);
    div.innerText = message; // Add alert text passed by event clicked

    // Select parent and where to display the customAlert
    const mainContainer = document.querySelector("main");
    const form = document.querySelector("section.cards-view");
    // display alert IN main BEFORE the form
    // insertBefore takes 2 params: (what to insert (div), before what (cards-view))
    mainContainer.insertBefore(div, form);

    // setTimeout for alert to disappear
    setTimeout(function () {
      document.querySelector(".custom-alert").remove();
    }, 2000);
  }

  // Method - Delete TaskCard
  deleteTask(target, taskSelected) {
    if (target.className === "task-delete") {
      taskSelected.remove();
    }
  }

  // Method - Clear Form
  clearForm() {
    // note: passing as variables did not work --> select items directly works:
    document.querySelector("#form-task-title").value = "";
    document.querySelector("#form-task-description").value = "";
    document.querySelector("#form-task-duedate").value = "";
  }

  // Method - Move TaskCard
  moveTaskCard(target, todoList, doneList, taskSelected) {
    if (taskSelected.parentElement.classList.contains("task-container-done")) {
      alert(
        "Are you sure we're still not done?\nSo we' ll code the whole damn night again, won't we?\nShould think about creating a SleepDeptCalculator... \n;-)"
      );
      todoList.appendChild(target.parentElement.parentElement.parentElement);
    } else {
      alert(
        "YES! We did it. Now ready for eatin a big family-pizza with extra of everything and grab some beer!"
      );
      doneList.appendChild(target.parentElement.parentElement.parentElement);
    }
  } // sb-todo: change to customAlert

  // Method - Change Style of Card
  toggleStyleTaskCard(target, taskSelected) {
    target.classList.toggle("task-uncomplete");
    taskSelected.classList.toggle("task-done");
    target.firstChild.classList.toggle("fa-times");
    target.parentElement.classList.toggle("task-controls-done");
  }

  // Method - Hide(if done) or Show (undone+edit mode) Input fields
  hideShowElement(taskSelected) {
    console.log("function hideShowElement called:");
    if (taskSelected.classList.contains("task-done")) {
      console.log(" --> SHOW Input fields");
      taskSelected.classList.remove("enableEditing");
    }
  }

  // Method - Hide
  editTaskCard(taskSelected) {
    console.log(
      "clicked edit icon\n --> executes function editToDoCard\n --> enable editing or 'save' text changes"
    );
    // define input-fields:
    const inputEnabledTitle = taskSelected.querySelector("#enableInputTitle");
    const inputEnabledDesc = taskSelected.querySelector("#enableInputDesc");
    const inputEnabledDue = taskSelected.querySelector("#enableInputDue");
    // define labels to pass label-text to input-fields:
    const labelTodoTitle = taskSelected.querySelector(".task-title");
    const labelTodoDesc = taskSelected.querySelector(".task-description");
    const labelTodoDue = taskSelected.querySelector(".task-duedate");

    console.log("Show Class List inMethod Edit");
    console.log(taskSelected.classList);
    if (taskSelected.classList.contains("enableEditing")) {
      // show input field that now contains the former label text for editing
      console.log(
        " Input-fields get text from labels\n --> text can now be edited"
      );
      inputEnabledTitle.value = labelTodoTitle.innerText;
      inputEnabledDesc.value = labelTodoDesc.innerText;
      inputEnabledDue.value = labelTodoDue.innerText;
    } else {
      console.log(
        " 1) if not empty, labels get text from Input-fields;\n 2) input fields should hide"
      );
      //if (taskSelected.querySelector("#enableInputTitle").value === "") {
      if (
        inputEnabledTitle.value === "" ||
        inputEnabledDesc.value === "" ||
        inputEnabledDue.value === ""
      ) {
        const taskList = new TaskList();
        const message = "No empty fields please.";
        taskList.displayCustomAlert(message, "alert-empty-fields");
        return; // return is needed to not save an empty field
      }
      labelTodoTitle.innerText = inputEnabledTitle.value;
      labelTodoDesc.innerText = inputEnabledDesc.value;
      labelTodoDue.innerText = inputEnabledDue.value;
    }
  }
}
