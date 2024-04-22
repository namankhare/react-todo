const localStorageKey = 'react-todo-tasks';
const taskStatus = {
  pending: 'Pending',
  completed: 'Completed',
};

const getAllTasks = () => {
  try {
    // Fetch data or fallback to empty array.
    const fetchTasks = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    return fetchTasks;
  } catch (error) {
    throw new Error('Error fetching tasks:', error);
  }
};

const addNewTask = async (data) => {
  try {
    // Get current stored tasks.
    const currentTasks = getAllTasks();
    const newTask = {
      id: new Date().getTime().toString(),
      text: data,
      status: taskStatus.pending,
    };
    const updatedTasks = [...currentTasks, newTask];
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    throw new Error('Oops! Some error occurred!');
  }
};

const deleteTask = async (id) => {
  try {
    // Get current stored tasks.
    const currentTasks = getAllTasks();

    // Filter out the task to be deleted based on its id.
    const updatedTasks = currentTasks.filter((task) => task.id !== id);

    localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    throw new Error('Oops! Some error occurred!');
  }
};

const updateTask = async (taskId, newText, taskCompleted = false) => {
  try {
    // Get current stored tasks.
    const currentTasks = getAllTasks();

    const currentTaskStatus = taskCompleted
      ? taskStatus.completed
      : taskStatus.pending;

    // Find the task to be updated based on its id.
    const updatedTasks = currentTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, text: newText, status: currentTaskStatus };
      }
      return task;
    });

    localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    throw new Error('Oops! Some error occurred!');
  }
};

export { getAllTasks, addNewTask, deleteTask, updateTask };
