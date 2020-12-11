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
todoList.addEventListener("click", deleteAndCheck); // execute funtion deleteAndCheck + further function
doneList.addEventListener("click", deleteAndCheck); // important for actions on click in second container for done tasks!
// *** FUNCTIONS **************************************************************************************

// DELETE or CHECK MARK Task
// Grab specific item we are clicking on --> execute function based on targeted clickItem
function deleteAndCheck(e) {
  const clickItem = e.target;
  const taskChoosen = clickItem.parentElement.parentElement.parentElement;
  // console.log(e.target); // test if listens on differnt clicks to whole container

  // --> DELETE DIV.TASK-CARD (= targeted task clicked to be deleted)
  if (clickItem.classList[0] === "task-delete") {
    eventDeleteTask(e, taskChoosen); // execute function eventDeleteTask
  }
  // --> CHECK MARK TASK
  if (
    clickItem.classList.contains("task-complete") ||
    clickItem.classList.contains("task-uncomplete")
  ) {
    console.log(clickItem.classList[0]);
    console.log(clickItem.classList[1]);

    console.log(clickItem.firstChild.classList[1]);
    eventCheckMarkTask(e, taskChoosen, clickItem); // execute function eventCheckMarkTask
    moveTodoCard(e, taskChoosen);
  }
}

// execute DELETE a TASK
function eventDeleteTask(e, taskChoosen) {
  taskChoosen.remove();
}

// execute CHECK MARK a TASK | (clickItem = e.target)
function eventCheckMarkTask(e, taskChoosen, clickItem) {
  clickItem.classList.toggle("task-uncomplete");
  taskChoosen.classList.toggle("task-done");
  clickItem.firstChild.classList.toggle("fa-times");
  clickItem.parentElement.classList.toggle("task-controls-done");
  // moveTodoCard(e, taskChoosen);
}

// execute MOVE a TASK between div-task-container: todo <--> undone
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
    // taskChoosen.remove();
    doneList.appendChild(taskChoosen);
  }
}

function addTodoCard(event) {
  event.preventDefault(); // prevent form from submitting/reload

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
  // = < < < CREATE i-inner element p.task-description
  const newTodoDescription = document.createElement("p");
  newTodoDescription.classList.add("task-description");
  newTodoDescription.innerText = todoInputDesc.value; // test: "Task description";
  newTodoContent.appendChild(newTodoDescription);
  // = < < < CREATE i-inner element p.task-duedate
  const newTodoDue = document.createElement("p");
  newTodoDue.classList.add("task-duedate");
  newTodoDue.innerText = todoInputDue.value; // test: "2020-12-18";
  newTodoContent.appendChild(newTodoDue);
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
// * OutSource Functions
// * Add Animation
