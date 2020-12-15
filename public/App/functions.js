// This function CREATES a task Card,
// that can be appended to a list (task-container) for done/undone tasks
function createTodoCard(title, description, dueDate) {
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
  newTodoTitle.innerText = title; // test: "Your Task Title - Do it";
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
  newTodoDescription.innerText = description; // test: "Task description";
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
  newTodoDue.innerText = dueDate; // test: "2020-12-18";
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
  return todoDiv;
}
