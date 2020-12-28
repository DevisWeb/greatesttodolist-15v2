export default class TaskCard {
  static createTaskCard(task) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("task-card");
    cardDiv.classList.add("task-todo"); // -------------------- class for background red --
    if (task.done === true) {
      cardDiv.classList.toggle("task-done"); // --------------- T O G G L E to get background green --
    }
    cardDiv.appendChild(this.taskContent(task));
    return cardDiv; // will be appended to div.task-container of 'todoList' or 'DoneList'
  }

  // get content for cardDiv
  static taskContent(task) {
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");
    taskContent.classList.add("vertical");

    taskContent.appendChild(this.taskTitle(task));
    taskContent.appendChild(this.inputTitle());

    taskContent.appendChild(this.taskDescription(task));
    taskContent.appendChild(this.inputDesc());

    taskContent.appendChild(this.taskDue(task));
    taskContent.appendChild(this.inputDue());

    taskContent.appendChild(this.taskControls(task));
    taskContent.appendChild(this.taskUid(task));

    return taskContent; // will be appended to cardDiv (main div of a taskCard)
  }
  // create labels for task details (title, description, dueDate) + + input fields (only available for editing)
  static taskTitle(task) {
    const taskTitle = document.createElement("h2");
    taskTitle.classList.add("task-title");
    taskTitle.innerText = task.title; // -------------------- T I T L E
    return taskTitle; // will be appended to div.task-content
  }
  static inputTitle() {
    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.placeholder = "Title";
    inputTitle.classList.add("enableInputTitle");
    inputTitle.setAttribute("maxlength", "100");
    return inputTitle;
  }
  static taskDescription(task) {
    const taskDescription = document.createElement("p");
    taskDescription.classList.add("task-description");
    taskDescription.innerText = task.description; // -------- D E S C R I P T I O N
    return taskDescription; // will be appended to div.task-content
  }
  static inputDesc() {
    const inputDesc = document.createElement("textarea");
    inputDesc.placeholder = "Description";
    inputDesc.classList.add("enableInputDesc");
    inputDesc.setAttribute("maxlength", "500");
    inputDesc.setAttribute("rows", "5");
    return inputDesc;
  }
  static taskDue(task) {
    const taskDue = document.createElement("p");
    taskDue.classList.add("task-duedate");
    taskDue.innerText = task.dueDate; // -------------------- D U E D A T E ("2020-12-18")
    return taskDue; // will be appended to div.task-content
  }
  static inputDue() {
    const inputDue = document.createElement("input");
    inputDue.type = "date";
    inputDue.placeholder = "DueDate";
    inputDue.classList.add("enableInputDue");
    return inputDue;
  }
  // label for unique ID -> important for usage of localStorage
  static taskUid(task) {
    const taskUid = document.createElement("span");
    taskUid.classList.add("task-uid");
    taskUid.innerText = task.uid; // ------------------------ U I D (unique Identifier)
    // taskUid.style.display = "none";
    return taskUid;
  }

  // 'Button'-Section allows to delete, edit, checkMark (Move) a Task
  static taskControls(task) {
    const taskControls = document.createElement("div");
    taskControls.classList.add("horizontal");
    taskControls.classList.add("task-controls");
    taskControls.classList.add("task-controls-todo");
    if (task.done === true) {
      taskControls.classList.toggle("task-controls-done"); // - T O G G L E for bg green --
    }

    taskControls.appendChild(this.trashBtn());
    taskControls.appendChild(this.editBtn());
    taskControls.appendChild(this.completeBtn(task));

    return taskControls; // will be appended to div.task-content
  }

  static trashBtn() {
    const trashBtn = document.createElement("a");
    trashBtn.href = "#delete";
    trashBtn.classList.add("task-delete");
    trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    return trashBtn; // will be appended to div.task-controls
  }
  static editBtn() {
    const editBtn = document.createElement("a");
    editBtn.href = "#edit";
    editBtn.classList.add("task-edit");
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    return editBtn; // will be appended to div.task-controls
  }
  static completeBtn(task) {
    const completeBtn = document.createElement("a");
    completeBtn.href = "#complete";
    completeBtn.classList.add("task-complete");
    if (task.done === true) {
      completeBtn.classList.toggle("task-uncomplete"); // ----- T O G G L E for icon bg red --
    }
    completeBtn.appendChild(this.iconUnCheck(task));
    return completeBtn; // will be appended to div.task-controls
  }

  // icon element in order to toggle between icon fa-check / fa-times
  static iconUnCheck(task) {
    const iconUnCheck = document.createElement("i");
    iconUnCheck.classList.add("fas");
    iconUnCheck.classList.add("fa-check");
    if (task.done === true) {
      iconUnCheck.classList.toggle("fa-times"); // ------------ T O G G L E to icon fa-times
    }
    return iconUnCheck;
  }
}
