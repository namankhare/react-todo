import { useEffect, useRef, useState } from 'react';
import { addNewTask, getAllTasks } from './Utils';
import taskStyles from './styles/Tasks.module.css';
import PendingTask from './components/PendingTask';
import CompleteTask from './components/CompleteTask';

function Todo() {
    const [tasks, setTasks] = useState([]);
    const taskRef = useRef(null);

    /**
     *  Fetch tasks from local storage on component mount.
     */
    const fetchTasks = () => {
        try {
            // Fetch tasks data from local storage.
            const tasksData = getAllTasks();

            // Update tasks state with fetched data.
            setTasks(tasksData);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();

        // Cleanup function to clear tasks state on component unmount.
        return () => {
            setTasks([]);
        };
    }, []);

    /**
     * Handle adding a new task
     */
    const handleAddTask = () => {
        // Trim and get new task text from input field.
        const newTaskText = taskRef.current.value.trim();

        // Check if task text is empty.
        if (!newTaskText) return;

        // Clear the task input field.
        taskRef.current.value = '';

        try {
            // Add the new task to the tasks state.
            const newTask = addNewTask(newTaskText);
            setTasks(newTask);
        } catch (error) {
            console.error('Error adding new task:', error);
        }
    };

    return (
        <>
            {/* Header Section. */}
            <div className={taskStyles.header}>
                <h1>Minimalistic Todo</h1>
                <p>
                    Stay organized and productive with our intuitive Todo app –
                    your go-to tool for managing tasks, staying on top of
                    deadlines, and achieving your goals with ease.
                </p>
            </div>

            {/* Task Container Section. */}
            <div className={taskStyles.taskContainer}>
                {/* Pending Tasks Section. */}
                <h2 className={taskStyles.sectionHeading}>Pending Tasks</h2>
                {tasks.filter((task) => task.status === 'Pending').length ===
                    0 && (
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

                {/* Completed Tasks Section. */}
                <h2 className={taskStyles.sectionHeading}>Completed Tasks</h2>
                {tasks.filter((task) => task.status === 'Completed').length ===
                    0 && (
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

            {/* Task Input Section. */}
            <div className={taskStyles.taskInput}>
                <input
                    type="text"
                    name="task"
                    id="task"
                    ref={taskRef}
                    placeholder="Enter task description..."
                    onKeyDown={(e) => {
                        // Call handleAddTask on Enter key press.
                        e.key === 'Enter' && handleAddTask();
                    }}
                />
                <button
                    type="submit"
                    className={taskStyles.button}
                    onClick={handleAddTask}>
                    Add Task
                </button>
            </div>
        </>
    );
}

export default Todo;
