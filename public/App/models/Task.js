// ### Class TASK: handling tasks
// #### --> instantiate a task-object every time a task is created
// ####    (class not needed until a task has been added)
export default class Task {
  // instantiate a task and pass params
  constructor(title, description, dueDate) {
    // assign params to properties of that object
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._done = false; // Undone
  }
  // Add method for check marked as Done
  markAsDone() {
    this._done = true;
  }
}
