// ** DOM SELECTORS ***********************************************************************************

const todoInputTitle = document.querySelector("#form-task-title");
const todoInputDesc = document.querySelector("#form-task-description");
const todoInputDue = document.querySelector("#form-task-duedate");

const todoButton = document.querySelector(".button-add-task");
const todoList = document.querySelector(".task-container");
const doneList = document.querySelector(".task-container-done");

const iconFas = document.getElementsByTagName("i"); // sb-del

// *** EVENT LISTENERS ********************************************************************************

// --> listen on what user clicks --> execute according function
todoButton.addEventListener("click", addTodoCard); // execute funtion addToDoCard

// --> listen to whole task-container --> add funcionality based on what is clicked
todoList.addEventListener("click", deleteCheckEdit); // execute funtion deleteCheckEdit + further function
doneList.addEventListener("click", deleteCheckEdit); // important for actions on click in second container for done tasks!

// *** FUNCTIONS **************************************************************************************

// *** DELETE, EDIT or CHECK MARK Task
// Grab specific item we are clicking on --> execute function based on targeted clickItem
function deleteCheckEdit(e) {
  const clickItem = e.target;
  const taskChoosen = clickItem.parentElement.parentElement.parentElement;
  // console.log(e.target); // test if listens on differnt clicks to whole container

  // --> DELETE DIV.TASK-CARD (= targeted task clicked to be deleted):
  if (clickItem.classList.contains("task-delete")) {
    eventDeleteTask(e, taskChoosen); // execute function eventDeleteTask
  }
  // --> CHECK MARK TASK:
  if (
    clickItem.classList.contains("task-complete") ||
    clickItem.classList.contains("task-uncomplete")
  ) {
    moveTodoCard(e, taskChoosen); // moves card to other container (todoList or doneList)
    eventCheckMarkTask(e, taskChoosen, clickItem); // toggle classes to change styles and icon
    hideShowElement(taskChoosen); // removes class .enableEditing to hide input-fields
  }
  // --> EDIT DIV.TASK-CARD content
  if (clickItem.classList.contains("task-edit")) {
    console.log(taskChoosen.classList); // class status before

    // toggle (.enableEditing) between read and edititing whole card:
    // --> this class controls display(block/none) of fields in task_cards.css
    taskChoosen.classList.toggle("enableEditing");
    console.log(taskChoosen.classList); // class status after

    editTodoCard(e, taskChoosen);
  }
}

// *** execute DELETE a TASK
function eventDeleteTask(e, taskChoosen) {
  alert(
    "Sure!? If you click okay, there's no way back:\nItem will be deleted for ever.\nBut anyway, this is a DEAD END.\nIf you don' t click okay, you're stuck."
  );
  taskChoosen.remove();
}

// *** execute CHECK MARK a TASK | (clickItem = e.target)
function eventCheckMarkTask(e, taskChoosen, clickItem) {
  clickItem.classList.toggle("task-uncomplete");
  taskChoosen.classList.toggle("task-done");
  clickItem.firstChild.classList.toggle("fa-times");
  clickItem.parentElement.classList.toggle("task-controls-done");
  // moveTodoCard(e, taskChoosen);
}

// *** execute MOVE a TASK between div-task-container: todo <--> done
function moveTodoCard(e, taskChoosen) {
  if (taskChoosen.parentElement.classList.contains("task-container-done")) {
    alert(
      "Are you sure we're still not done?\nSo we' ll code the whole damn night again, won't we?\nShould think about creating a SleepDeptCalculator... \n;-)"
    );
    todoList.appendChild(taskChoosen);
  } else {
    alert(
      "YES! We did it. Now ready for eatin a big family-pizza with extra of everything and grab some beer!"
    );
    doneList.appendChild(taskChoosen);
  }
}

// *** execute EDIT a TASK Card (calls function 'hideShowElement')  // sb-todo: label/input values -> array
function editTodoCard(e, taskChoosen) {
  console.log(
    "clicked edit icon\n --> executes function editToDoCard\n --> enable editing or 'save' text changes"
  );
  // define input-fields:
  const inputEnabledTitle = taskChoosen.querySelector("#enableInputTitle");
  const inputEnabledDesc = taskChoosen.querySelector("#enableInputDesc");
  const inputEnabledDue = taskChoosen.querySelector("#enableInputDue");
  // define labels to pass label-text to input-fields:
  const labelTodoTitle = taskChoosen.querySelector(".task-title");
  const labelTodoDesc = taskChoosen.querySelector(".task-description");
  const labelTodoDue = taskChoosen.querySelector(".task-duedate");

  // console.log(taskChoosen.classList);
  if (taskChoosen.classList.contains("enableEditing")) {
    // show input field that now contains the former label text for editing
    inputEnabledTitle.value = labelTodoTitle.innerText;
    inputEnabledDesc.value = labelTodoDesc.innerText;
    inputEnabledDue.value = labelTodoDue.innerText;
    console.log(
      " Input-fields get text from labels\n --> text can now be edited"
    );
  } else {
    // Prevent from leaving fields blank when editing a task:
    if (inputEnabledTitle.value == "") {
      alert("Please add a Task Title for your task");
      return;
    }
    if (inputEnabledDesc.value == "") {
      alert("Please add a Description for your task");
      return;
    }
    if (inputEnabledDue.value == "") {
      alert("Please add a Due Date for your task");
      return;
    }
    labelTodoTitle.innerText = inputEnabledTitle.value;
    labelTodoDesc.innerText = inputEnabledDesc.value;
    labelTodoDue.innerText = inputEnabledDue.value;
    console.log(
      " 1) labels get text from Input-fields;\n 2) input fields should hide"
    );
  }
}

// This function NOW removes class .enableEditing to hide input-fields when task are checked
// general hide/show label/input fields (display block/none) is now controlled in tasc-cards.css
function hideShowElement(taskChoosen) {
  console.log("function hideShowElement called:");
  if (taskChoosen.classList.contains("task-done")) {
    console.log(" --> SHOW Input fields");
    taskChoosen.classList.remove("enableEditing");
  }
}

// ** STORE todoLocal **************************************************
function storeTodoLocal(taskChoosen) {
  // array
} // sb-todo

// *** ADD TodoCard ****************************************************
function addTodoCard(event) {
  event.preventDefault(); // prevent form from submitting/reload
  // prevent form from submitting when fields are empty:
  if (todoInputTitle.value == "") {
    alert("Please add a Task Title for your task");
    return;
  }
  if (todoInputDesc.value == "") {
    alert("Please add a Description for your task");
    return;
  }
  if (todoInputDue.value == "") {
    alert("Please add a Due Date for your task");
    return;
  }

  // CREATE main DIV.TASK-CARD that displays the task content
  // FINALLY TAKE the whole DIV.TASK-CARD created in function 'createTodoCard'
  // + APPEND (paste) it to the actual div.task-container (set in the markup):
  todoList.appendChild(createTodoCard()); // todoList.appendChild(todoDiv);

  // CLEAR Form Input.Values
  todoInputTitle.value = "hallihallo";
  todoInputDesc.value = "";
  todoInputDue.value = "";
}

// optional ToDo:
// * Add data storage
// * OutSource Functions

// * Add Animation for re/moving Card
// * Add tooltips to icons
// * Add filter with switch for e.target --> status of task
