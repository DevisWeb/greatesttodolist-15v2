// Class TASK Object: handling tasks
// --> instantiate a task-object every time a task is created
//     (class not needed until a task has been added)

export default class Task {
  // instantiate a task and pass params
  constructor(title, description, dueDate) {
    // assign params to properties of that object
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.done = false; // task = Undone
    this.uid =
      Math.random().toString(36).substring(2, 12) +
      new Date().getTime().toString(36).substring(2, 12); // set unique ID
  }

  markAsDone() {
    this.done = true;
  }

  markAsUndone() {
    this.done = false;
  }
}
