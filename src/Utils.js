/**
 * This file contains important functions to connect tasks with localstorage.
 */

// Constants for local storage key and task status.
const localStorageKey = 'react-todo-tasks';
const taskStatus = {
  pending: 'Pending',
  completed: 'Completed',
};

/**
 * Fetches all tasks from local storage.
 * @returns {Array} Array of tasks fetched from local storage.
 * @throws {Error} Throws an error if there is an issue fetching tasks.
 */
const getAllTasks = () => {
  try {
    // Fetch tasks data from local storage or return an empty array if not found.
    const fetchTasks = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    return fetchTasks;
  } catch (error) {
    throw new Error('Error fetching tasks:', error);
  }
};

/**
 * Adds a new task to the list of tasks.
 * @param {string} data - The text content of the new task.
 * @returns {Array} Array of updated tasks after adding the new task.
 * @throws {Error} Throws an error if there is an issue adding the new task.
 */
const addNewTask = async (data) => {
  try {
    // Get current stored tasks.
    const currentTasks = getAllTasks();

    // Create a new task object with unique id, provided text, and pending status.
    const newTask = {
      id: new Date().getTime().toString(),
      text: data,
      status: taskStatus.pending,
    };

    // Update tasks list with the new task and store it in local storage.
    const updatedTasks = [...currentTasks, newTask];
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    throw new Error('Oops! Some error occurred!');
  }
};

/**
 * Deletes a task from the list of tasks based on its id.
 * @param {string} id - The id of the task to be deleted.
 * @returns {Array} Array of updated tasks after deleting the task.
 * @throws {Error} Throws an error if there is an issue deleting the task.
 */
const deleteTask = async (id) => {
  try {
    // Get current stored tasks.
    const currentTasks = getAllTasks();

    // Filter out the task to be deleted based on its id.
    const updatedTasks = currentTasks.filter((task) => task.id !== id);

    // Update tasks list without the deleted task and store it in local storage.
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));

    return updatedTasks;
  } catch (error) {
    throw new Error('Oops! Some error occurred!');
  }
};

/**
 * Updates a task with new text and status (completed or pending).
 * @param {string} taskId - The id of the task to be updated.
 * @param {string} newText - The new text content of the task.
 * @param {boolean} taskCompleted - The status of the task (completed or pending).
 * @returns {Array} Array of updated tasks after updating the task.
 * @throws {Error} Throws an error if there is an issue updating the task.
 */
const updateTask = async (taskId, newText, taskCompleted = false) => {
  try {
    // Get current stored tasks.
    const currentTasks = getAllTasks();

    // Determine the status of the task based on taskCompleted parameter.
    const currentTaskStatus = taskCompleted
      ? taskStatus.completed
      : taskStatus.pending;

    // Map through current tasks and update the task with provided id.
    const updatedTasks = currentTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, text: newText, status: currentTaskStatus };
      }
      return task;
    });

    // Update tasks list with the updated task and store it in local storage.
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    throw new Error('Oops! Some error occurred!');
  }
};

// Export the utility functions.
export { getAllTasks, addNewTask, deleteTask, updateTask };
