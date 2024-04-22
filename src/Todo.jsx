import { useEffect, useRef, useState } from 'react';
import { addNewTask, getAllTasks } from './Utils';
import taskStyles from './styles/Task.module.css';
import PendingTask from './components/PendingTask';
import CompleteTask from './components/CompleteTask';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const taskRef = useRef(null);

  // Fetch tasks from local storage on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getAllTasks();
      setTasks(tasksData);
    };

    fetchTasks();

    // Cleanup function to clear tasks state on component unmount
    return () => {
      setTasks([]);
    };
  }, []);

  // Handle adding a new task
  const handleAddTask = async () => {
    const newTaskText = taskRef.current.value.trim();
    if (!newTaskText) return; // Early return if task text is empty

    // Clear the task input field
    taskRef.current.value = '';

    try {
      // Add the new task to the tasks state
      const newTask = await addNewTask(newTaskText);
      setTasks(newTask);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={taskStyles.header}>
        <h1>Minimalistic Todo</h1>
        <p>
          Stay organized and productive with our intuitive Todo app – your go-to
          tool for managing tasks, staying on top of deadlines, and achieving
          your goals with ease.
        </p>
      </div>
      <div className={taskStyles.taskContainer}>
        <h2 className={taskStyles.sectionHeading}>Pending Tasks</h2>
        {tasks.filter((task) => task.status === 'Pending').length === 0 && (
          <p className={taskStyles.noTasks}>No pending tasks.</p>
        )}
        {tasks
          .filter((task) => task.status === 'Pending')
          .map((task) => (
            <PendingTask
              key={task.id}
              taskId={task.id}
              text={task.text}
              setTasks={setTasks}
            />
          ))}

        <h2 className={taskStyles.sectionHeading}>Completed Tasks</h2>
        {tasks.filter((task) => task.status === 'Completed').length === 0 && (
          <p className={taskStyles.noTasks}>No completed tasks.</p>
        )}
        {tasks
          .filter((task) => task.status === 'Completed')
          .map((task) => (
            <CompleteTask
              key={task.id}
              taskId={task.id}
              text={task.text}
              setTasks={setTasks}
            />
          ))}
      </div>
      <div className={taskStyles.taskInput}>
        <input
          type='text'
          name='task'
          id='task'
          ref={taskRef}
          placeholder='Enter task description...'
          onKeyDown={(e) => {
            e.key === 'Enter' && handleAddTask();
          }}
        />
        <button
          type='submit'
          className={taskStyles.button}
          onClick={handleAddTask}>
          Add Task
        </button>
      </div>
    </>
  );
}

export default Todo;
