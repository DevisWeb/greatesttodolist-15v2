// This function CREATES html for a task Card,
// that can be appended to a list (task-container) for done/undone tasks
function createTaskCard(task) {
  // = < CREATE main DIV.TASK-CARD+task-todo in the div.task-container
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("task-card");
  cardDiv.classList.add("task-todo"); // -------------------- class for background red --
  if (task.done === true) {
    cardDiv.classList.toggle("task-done"); // --------------- T O G G L E to get background green --
  }

  // = < < CREATE inner div.task-content+vertical inside div.task-card:
  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");
  taskContent.classList.add("vertical");
  cardDiv.appendChild(taskContent);

  // = < < < CREATE h2.task-title (that is inside div.task-content)
  const taskTitle = document.createElement("h2");
  taskTitle.classList.add("task-title");
  taskTitle.innerText = task.title; // -------------------- T I T L E
  taskContent.appendChild(taskTitle);
  // = < < < create INPUT FIELD for title
  const inputTitle = document.createElement("input");
  inputTitle.type = "text";
  inputTitle.placeholder = "Title";
  inputTitle.classList.add("enableInputTitle");
  inputTitle.setAttribute("maxlength", "100");
  taskContent.appendChild(inputTitle);

  // = < < < CREATE p.task-description (append to div.task-content)
  const taskDescription = document.createElement("p");
  taskDescription.classList.add("task-description");
  taskDescription.innerText = task.description; // -------- D E S C R I P T I O N
  taskContent.appendChild(taskDescription);
  // = < < < create INPUT FIELD for description
  const inputDesc = document.createElement("textarea");
  inputDesc.placeholder = "Description";
  inputDesc.classList.add("enableInputDesc");
  inputDesc.setAttribute("maxlength", "500");
  inputDesc.setAttribute("rows", "5");
  taskContent.appendChild(inputDesc);

  // = < < < CREATE p.task-duedate (append to div.task-content)
  const taskDue = document.createElement("p");
  taskDue.classList.add("task-duedate");
  taskDue.innerText = task.dueDate; // -------------------- D U E D A T E ("2020-12-18")
  taskContent.appendChild(taskDue);
  // = < < < create INPUT FIELD for dueDate
  const inputDue = document.createElement("input");
  inputDue.type = "date";
  inputDue.placeholder = "DueDate";
  inputDue.classList.add("enableInputDue");
  taskContent.appendChild(inputDue);

  // = < < < CREATE div."horizontal task-controls task-controls-todo" (append to div.task-content)
  const taskControls = document.createElement("div");
  taskControls.classList.add("horizontal");
  taskControls.classList.add("task-controls");
  taskControls.classList.add("task-controls-todo");
  if (task.done === true) {
    taskControls.classList.toggle("task-controls-done"); // - T O G G L E for bg green --
  }
  taskContent.appendChild(taskControls);

  // = < < < CREATE span for unique ID (append to div.task-content)
  const taskUid = document.createElement("span");
  taskUid.classList.add("task-uid");
  taskUid.innerText = task.uid; // ------------------------ U I D (unique Identifier)
  // taskUid.style.display = "none";
  taskContent.appendChild(taskUid);

  // --------- CREATE 3 inner elements of task-controls:
  // = < < < < CREATE button a.task-DELETE (append to div.task-controls)
  const trashBtn = document.createElement("a");
  trashBtn.href = "#delete";
  trashBtn.classList.add("task-delete");
  trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  taskControls.appendChild(trashBtn);
  // = < < < < CREATE button a.task-EDIT (append to div.task-controls)
  const editBtn = document.createElement("a");
  editBtn.href = "#edit";
  editBtn.classList.add("task-edit");
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  taskControls.appendChild(editBtn);
  // = < < < < CREATE button a.task-COMPLETE (append to div.task-controls)
  const completeBtn = document.createElement("a");
  completeBtn.href = "#complete";
  completeBtn.classList.add("task-complete");
  if (task.done === true) {
    completeBtn.classList.toggle("task-uncomplete"); // ----- T O G G L E for icon bg red --
  }
  taskControls.appendChild(completeBtn);

  // = < < < < < CREATE icon element in order to toggle between icon fa-check / fa-times
  const iconUnCheck = document.createElement("i");
  iconUnCheck.classList.add("fas");
  iconUnCheck.classList.add("fa-check");
  completeBtn.appendChild(iconUnCheck);
  if (task.done === true) {
    iconUnCheck.classList.toggle("fa-times"); // ------------ T O G G L E to icon fa-times
  }

  //
  return cardDiv;
}
