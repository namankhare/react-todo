import PropTypes from 'prop-types';
import taskStyles from '../styles/Tasks.module.css';
import deleteIcon from '../assets/delete.svg';
import PendingIcon from '../assets/pending.svg';
import { deleteTask, updateTask } from '../Utils';
import Tooltip from './Tooltip';

/**
 * Renders a completed task with options to mark it as pending or delete it.
 *
 * @param {string} taskId - The unique identifier of the task.
 * @param {string} text - The text content of the completed task.
 * @param {function} setTasks - Function to update the tasks state.
 */
const CompleteTask = ({ taskId, text, setTasks }) => {
    /**
     * Handles the deletion of the completed task. Deletes the task from the tasks list.
     */
    const handleDeleteTask = () => {
        try {
            // Delete the task from the tasks list.
            const updatedTasks = deleteTask(taskId);

            // Update the tasks state.
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    /**
     * Handles marking the completed task as pending. Updates the status of the task to pending.
     */
    const handlePendingTask = () => {
        try {
            // Update the status of the task to pending.
            const updatedTasks = updateTask(taskId, text, false);

            // Update the tasks state.
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error marking task as pending:', error);
        }
    };

    return (
        <div className={taskStyles.singleCompletedTaskContainer}>
            {/* Display the completed task text. */}
            <p className={taskStyles.completed}>{text}</p>

            <span className={taskStyles.taskActions}>
                {/* Tooltip for marking the task as pending. */}
                <Tooltip text="Mark Pending">
                    {/* Icon for marking the task as pending. */}
                    <img
                        src={PendingIcon}
                        alt="Mark Pending"
                        className={taskStyles.completedIcon}
                        onClick={handlePendingTask}
                    />
                </Tooltip>

                {/* Tooltip for deleting the task. */}
                <Tooltip text="Delete Task">
                    {/* Icon for deleting the task. */}
                    <img
                        src={deleteIcon}
                        alt="Delete Task"
                        className={taskStyles.deleteIcon}
                        onClick={handleDeleteTask}
                    />
                </Tooltip>
            </span>
        </div>
    );
};

// Prop types validation.
CompleteTask.propTypes = {
    taskId: PropTypes.string.isRequired, // Required taskId prop.
    text: PropTypes.string.isRequired, // Required text prop.
    setTasks: PropTypes.func.isRequired, // Required setTasks prop.
};

export default CompleteTask;
