import TaskList from "./TaskList.js";
// Resources for group about the used methods for storing:
// https://developer.mozilla.org/en/docs/Web/API/Window/localStorage
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

// TaskStorage Class for localStorage - to store, fetch and remove tasks from localStorage
//   - here used as a static class (see static methods), difference:
//     --> no instantiation for TaskStorage Object needed in EventHandlers
//     --> it can be used directly (see difference to other classes in index-oop.js)

export default class TaskStorage {
  // getTasks from localStorage for the afterwards following methods --> avoids redundant code
  static getTasks() {
    let tasks; // for JS object parse back to an array through Jason.parse; else return null
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks; // returns all items listed inside local storage
  }

  // Save new task in localStorage
  static saveLocal(task) {
    let tasks = TaskStorage.getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Display local stored Tasks on UI
  static displayTasks() {
    let tasks = TaskStorage.getTasks();
    // loop through tasks | callback
    tasks.forEach((task) => {
      const taskList = new TaskList();
      taskList.addTaskToList(task);
    });
  }
  // ------------------------------------------------------------------------
  // Compare uid to findIndex in order to update or remove a task
  static findIndex(uid) {
    let tasks = TaskStorage.getTasks();
    for (let index = 0; index < tasks.length; index++) {
      if (tasks[index].uid === uid) {
        return index;
      }
    }
    console.log("## failed to findIndex");
    return -1;
  }

  // Update task in localStorage when task on UI is edited or marked as done
  static updateTask(task) {
    let tasks = TaskStorage.getTasks();
    console.log("## TaskStorage - updateTask - show uid:\n" + task.uid);
    let index = TaskStorage.findIndex(task.uid);
    if (index !== -1) {
      tasks[index] = task;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      console.log("## failed to updateTask");
    }
  }
  // Remove task from localStorage when corresponding task has been deleted from UI
  static removeTask(task) {
    let tasks = TaskStorage.getTasks();
    let index = TaskStorage.findIndex(task.uid);
    console.log("## displayed task task.uid: \n" + task.uid);
    console.log("## tasks: \n" + tasks);
    if (index !== -1) {
      console.log("## index found --> splice ");
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      console.log("## failed to removeTask");
    }

    /*
    note: the following simple solution works as long as cards are not dublicated;
    --> doesn't work if there are more than one tasks with the complete same content
    --> if user clicks to delete one card, this will delete all cards that have the same content
    
    tasks.forEach((task, index) => {
      if (
        task.title === title &&
        task.description === description &&
        task.dueDate === dueDate
      ) {
        tasks.splice(index, 1);
      }
    });
    */
  }
}
