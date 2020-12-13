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
  const InputEnabledTitle = taskChoosen.querySelector("#enableInputTitle");
  const InputEnabledDesc = taskChoosen.querySelector("#enableInputDesc");
  const InputEnabledDue = taskChoosen.querySelector("#enableInputDue");
  // define labels to pass label-text to input-fields:
  const labelTodoTitle = taskChoosen.querySelector(".task-title");
  const labelTodoDesc = taskChoosen.querySelector(".task-description");
  const labelTodoDue = taskChoosen.querySelector(".task-duedate");

  // console.log(taskChoosen.classList);
  if (taskChoosen.classList.contains("enableEditing")) {
    // show input field that now contains the former label text for editing
    InputEnabledTitle.value = labelTodoTitle.innerText;
    InputEnabledDesc.value = labelTodoDesc.innerText;
    InputEnabledDue.value = labelTodoDue.innerText;
    console.log(
      " Input-fields get text from labels\n --> text can now be edited"
    );
  } else {
    // turn to .fa-edit, pass value to input
    labelTodoTitle.innerText = InputEnabledTitle.value;
    labelTodoDesc.innerText = InputEnabledDesc.value;
    labelTodoDue.innerText = InputEnabledDue.value;
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
  if (todoInputTitle.value == "") {
    alert("Please add a title for your task");
    return;
  }
  if (todoInputDesc.value == "") {
    alert("Please add a Description for your task");
    return;
  }
  if (todoInputDue.value == "") {
    alert("Please add a DueDate for your task");
    return;
  }
  // = < CREATE main DIV.TASK-CARD+task-todo in the div.task-container
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("task-card"); // add class to div
  todoDiv.classList.add("task-todo"); // -- " --

  // --- < 1st inner div of div.task-card:
  // = < < CREATE inner div.task-content+vertical that is inside div.task-card
  const newTodoContent = document.createElement("div");
  newTodoContent.classList.add("task-content");
  newTodoContent.classList.add("vertical");
  todoDiv.appendChild(newTodoContent); // grab parent todoDiv -> append child newTodoContent to it

  // ---- < inner-elements of div.task-content:
  // = < < < CREATE i-inner element h2.task-title
  const newTodoTitle = document.createElement("h2");
  newTodoTitle.classList.add("task-title");
  newTodoTitle.innerText = todoInputTitle.value; // test: "Your Task Title - Do it";
  newTodoContent.appendChild(newTodoTitle); // append to inner div.task-content
  // = < < < create INPUT FIELD for title
  const enableTodoInputField = document.createElement("input");
  enableTodoInputField.type = "text";
  enableTodoInputField.placeholder = "Title";
  enableTodoInputField.setAttribute("id", "enableInputTitle"); // set I D
  enableTodoInputField.setAttribute("maxlength", "100");
  newTodoContent.appendChild(enableTodoInputField);

  // = < < < CREATE i-inner element p.task-description
  const newTodoDescription = document.createElement("p");
  newTodoDescription.classList.add("task-description");
  newTodoDescription.innerText = todoInputDesc.value; // test: "Task description";
  newTodoContent.appendChild(newTodoDescription);
  // = < < < create INPUT FIELD for description
  const enableTodoInputFieldDesc = document.createElement("textarea");
  enableTodoInputFieldDesc.placeholder = "Description";
  enableTodoInputFieldDesc.setAttribute("id", "enableInputDesc"); // set I D
  enableTodoInputFieldDesc.setAttribute("maxlength", "500");
  enableTodoInputFieldDesc.setAttribute("rows", "5");
  newTodoContent.appendChild(enableTodoInputFieldDesc);

  // = < < < CREATE i-inner element p.task-duedate
  const newTodoDue = document.createElement("p");
  newTodoDue.classList.add("task-duedate");
  newTodoDue.innerText = todoInputDue.value; // test: "2020-12-18";
  newTodoContent.appendChild(newTodoDue);
  // = < < < create INPUT FIELD for dueDate
  const enableTodoInputFieldDue = document.createElement("input");
  enableTodoInputFieldDue.type = "date";
  enableTodoInputFieldDue.placeholder = "DueDate";
  enableTodoInputFieldDue.setAttribute("id", "enableInputDue"); // set I D
  newTodoContent.appendChild(enableTodoInputFieldDue);

  // = < < < CREATE i-inner div."horizontal task-controls task-controls-todo"
  const newTodoControls = document.createElement("div");
  newTodoControls.classList.add("horizontal");
  newTodoControls.classList.add("task-controls");
  newTodoControls.classList.add("task-controls-todo");
  newTodoContent.appendChild(newTodoControls);

  // ------- < CREATE 3 inner elements of task-controls:
  // = < < < < CREATE button a.task-DELETE
  const trashBtn = document.createElement("a");
  trashBtn.href = "#delete";
  trashBtn.classList.add("task-delete");
  trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  newTodoControls.appendChild(trashBtn); // append to Controls div
  // = < < < < CREATE button a.task-EDIT
  const editBtn = document.createElement("a");
  editBtn.href = "#edit";
  editBtn.classList.add("task-edit");
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  newTodoControls.appendChild(editBtn);
  // = < < < < CREATE button a.task-COMPLETE
  const completeBtn = document.createElement("a");
  completeBtn.href = "#complete";
  completeBtn.classList.add("task-complete");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  newTodoControls.appendChild(completeBtn);

  // >>>>>>>> FINALLY TAKE the whole DIV.TASK-CARD
  // + APPEND (paste) it to the actual div.task-container (set in the markup)
  todoList.appendChild(todoDiv);

  // CLEAR Form Input.Values
  todoInputTitle.value = "";
  todoInputDesc.value = "";
  todoInputDue.value = "";
}

// sb-ToDo:
// * Add data storage
// * OutSource Functions
// * Add Animation for re/moving Card
// * Add tooltips to icons
// * Add required inputs
// * Add filter with switch for e.target --> status of task
