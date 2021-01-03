// ### Class TaskList Object: display, remove, edit task on a list or show alerts etc.
import TaskCard from "./TaskCard.js";
import TaskStorage from "./TaskStorage.js";

const todoList = document.querySelector(".task-container"); // grab todoList Container from the DOM
const doneList = document.querySelector(".task-container-done");

export default class TaskList {
  addTaskToList(task) {
    // take the whole DIV.TASK-CARD incl. content, created with 'createTaskCard' +
    // append it to the div.task-container: 'todoList' or 'doneList' based on done-status (false/true):
    if (task.done === false) {
      todoList.appendChild(TaskCard.createTaskCard(task));
    } else {
      doneList.appendChild(TaskCard.createTaskCard(task)); // important, when cards from localStorage should be displayed with page reload, based on 'done'-status
    }

    console.log("## TaskList_Method addTaskToList - show task details:");
    console.log(task.title + "\n" + task.description + "\n" + task.dueDate);
    console.log("done: " + task.done + "\n" + task.uid);
  }

  // Method - Display alert to prevent from submitting empty form
  displayCustomAlert(message, alertType) {
    const div = document.createElement("div"); // div container for alert
    div.classList.add("custom-alert", alertType); // class for styling
    div.innerText = message; // Add alert text passed by event clicked

    // Select parent + where to display the customAlert (IN main BEFORE the cards)
    const mainContainer = document.querySelector("main");
    const cards = document.querySelector("section.cards-view");
    // insertBefore takes 2 params: (what to insert (div), before what (cards-view))
    mainContainer.insertBefore(div, cards);

    // setTimeout for alert to disappear
    setTimeout(function () {
      document.querySelector(".custom-alert").remove();
    }, 2000);
  }

  // Method - Delete TaskCard
  deleteTask(cardSelected) {
    cardSelected.remove();
  }

  // Method - Clear Form
  clearForm() {
    document.querySelector("#form-task-title").value = "";
    document.querySelector("#form-task-description").value = "";
    document.querySelector("#form-task-duedate").value = "";
  }

  // Method - Move TaskCard between Containers
  moveTaskCard(target, cardSelected) {
    const taskList = new TaskList();
    if (cardSelected.parentElement.classList.contains("task-container-done")) {
      const message =
        "Task marked as UNDONE. Seems, there is still some work to do ...";
      taskList.displayCustomAlert(message, "alert-warning");
      todoList.appendChild(target.parentElement.parentElement.parentElement);
    } else {
      const message =
        "Task marked as DONE. Add a new task or enjoy yourself doing nothing.";
      taskList.displayCustomAlert(message, "alert-success");
      doneList.appendChild(target.parentElement.parentElement.parentElement);
    }
  }

  // Method - Change Style of Card (based on done-status)
  toggleStyleTaskCard(target, cardSelected) {
    target.classList.toggle("task-uncomplete"); // change icon background
    cardSelected.classList.toggle("task-done"); // change card background
    target.firstChild.classList.toggle("fa-times"); // change icon
    target.parentElement.classList.toggle("task-controls-done"); // change background of task-controls
  }

  // Method - Hide(if done) or Show (undone+edit mode) Input fields
  hideShowElement(cardSelected) {
    if (cardSelected.classList.contains("task-done")) {
      cardSelected.classList.remove("enableEditing");
    }
  }

  // Method - Edit a Task
  editTaskCard(cardSelected, task) {
    const taskList = new TaskList();
    console.log(
      "## clicked edit icon\n --> executes function editToDoCard\n --> enable editing or 'save' text changes"
    );
    // define input-fields:
    const inputTitle = cardSelected.querySelector(".enableInputTitle");
    const inputDesc = cardSelected.querySelector(".enableInputDesc");
    const inputDue = cardSelected.querySelector(".enableInputDue");
    // define labels to pass label-text to input-fields:
    const labelTitle = cardSelected.querySelector(".task-title");
    const labelDesc = cardSelected.querySelector(".task-description");
    const labelDue = cardSelected.querySelector(".task-duedate");

    console.log("## edit - Show Class List:\n" + cardSelected.classList);

    // show input fields that contain text from task elements for editing
    if (cardSelected.classList.contains("enableEditing")) {
      console.log("## Input-fields are displayed \n --> text can be edited");
      inputTitle.value = labelTitle.innerText;
      inputDesc.value = labelDesc.innerText;
      inputDue.value = labelDue.innerText;
      return;
    }
    // edit Mode closed - update task in UI and localStorage
    if (
      cardSelected.classList.contains("enableEditing") === false &&
      inputTitle.value.trim() !== "" &&
      inputDesc.value.trim() !== "" &&
      inputDue.value.trim() !== ""
    ) {
      console.log(" 1) labels get text from Input\n 2) input fields will hide");

      task.title = labelTitle.innerText = inputTitle.value.trim();
      task.description = labelDesc.innerText = inputDesc.value.trim();
      task.dueDate = labelDue.innerText = inputDue.value.trim();

      console.log("## Editing done - updateTask in localStorage \n");
      TaskStorage.updateTask(task);
      return;
    }
    const message = "No empty fields please.";
    taskList.displayCustomAlert(message, "alert-warning");
  }
}
