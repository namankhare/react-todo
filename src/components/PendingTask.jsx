import { useState } from 'react';
import PropTypes from 'prop-types';
import taskStyles from '../styles/Tasks.module.css';
import saveIcon from '../assets/save.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import completeIcon from '../assets/complete.svg';
import { deleteTask, updateTask } from '../Utils';
import Tooltip from './Tooltip';

/**
 * Renders a pending task with options to edit, mark as complete, or delete it.
 *
 * @param {string} taskId - The unique identifier of the task.
 * @param {string} text - The text content of the pending task.
 * @param {function} setTasks - Function to update the tasks state.
 */
const PendingTask = ({ taskId, text, setTasks }) => {
    // State to manage editing mode and edited text.
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);

    // Handler to enable editing mode.
    const handleEditTask = () => setIsEditing(true);

    /**
     * Handler to save edited task.
     * */
    const handleSaveTask = () => {
        const trimmedText = editedText.trim();
        if (!trimmedText) return;

        try {
            // Update the task text.
            const updatedTask = updateTask(taskId, trimmedText);

            // Update tasks state.
            setTasks(updatedTask);

            // Exit editing mode.
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    /**
     *  Handler to delete the task
     */
    const handleDeleteTask = () => {
        try {
            // Delete the task from tasks list
            const updatedTasks = deleteTask(taskId);

            // Update tasks state.
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    /**
     * Handler to mark task as complete.
     */
    const handleCompleteTask = () => {
        try {
            // Mark the task as complete.
            const updatedTasks = updateTask(taskId, text, true);

            // Update tasks state.
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error marking task as complete:', error);
        }
    };

    /**
     * Handler for double-click event to enable editing mode.
     */
    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    return (
        <div className={taskStyles.singleTaskContainer}>
            {/* Render input field in editing mode, otherwise render text. */}
            {isEditing ? (
                <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={handleSaveTask}
                    autoFocus
                />
            ) : (
                <p onDoubleClick={handleDoubleClick}>{text}</p>
            )}

            {/* Task actions. */}
            <span className={taskStyles.taskActions}>
                {/* Render Save Task icon when editing, otherwise render Mark Complete and Edit Task icons. */}
                {isEditing ? (
                    <Tooltip text="Save Task">
                        <img
                            src={saveIcon}
                            alt="Save Task"
                            className={taskStyles.saveIcon}
                            onClick={handleSaveTask}
                        />
                    </Tooltip>
                ) : (
                    <>
                        <Tooltip text="Mark Complete">
                            <img
                                src={completeIcon}
                                alt="Mark Complete"
                                className={taskStyles.completeIcon}
                                onClick={handleCompleteTask}
                            />
                        </Tooltip>
                        <Tooltip text="Edit Task">
                            <img
                                src={editIcon}
                                alt="Edit Task"
                                className={taskStyles.editIcon}
                                onClick={handleEditTask}
                            />
                        </Tooltip>
                    </>
                )}

                {/* Tooltip for deleting the task. */}
                <Tooltip text="Delete Task">
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
PendingTask.propTypes = {
    taskId: PropTypes.string.isRequired, // Required taskId prop.
    text: PropTypes.string.isRequired, // Required text prop.
    setTasks: PropTypes.func.isRequired, // Required setTasks prop.
};

export default PendingTask;
