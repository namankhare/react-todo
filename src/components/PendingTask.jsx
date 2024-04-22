import { useState } from 'react';
import PropTypes from 'prop-types';
import taskStyles from '../styles/Task.module.css';
import saveIcon from '../assets/save.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import completeIcon from '../assets/complete.svg';
import { deleteTask, updateTask } from '../Utils';
import Tooltip from './Tooltip';

const PendingTask = ({ taskId, text, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditTask = () => setIsEditing(true);

  const handleSaveTask = async () => {
    const trimmedText = editedText.trim();
    if (!trimmedText) return;

    try {
      const updatedTask = await updateTask(taskId, trimmedText);
      setTasks(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  const handleDeleteTask = async () => {
    try {
      const updatedTasks = await deleteTask(taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  const handleCompleteTask = async () => {
    try {
      const updatedTasks = await updateTask(taskId, text, true);
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  return (
    <div className={taskStyles.singleTaskContainer}>
      {isEditing ? (
        <input
          type='text'
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onBlur={handleSaveTask}
          autoFocus
        />
      ) : (
        <p onDoubleClick={handleDoubleClick}>{text}</p>
      )}
      <span className={taskStyles.taskActions}>
        {isEditing ? (
          <Tooltip text='Save Task'>
            <img
              src={saveIcon}
              alt='Save Task'
              className={taskStyles.saveIcon}
              onClick={handleSaveTask}
            />
          </Tooltip>
        ) : (
          <>
            <Tooltip text='Mark Complete'>
              <img
                src={completeIcon}
                alt='Mark Complete'
                className={taskStyles.completeIcon}
                onClick={handleCompleteTask}
              />
            </Tooltip>
            <Tooltip text='Edit Task'>
              <img
                src={editIcon}
                alt='Edit Task'
                className={taskStyles.editIcon}
                onClick={handleEditTask}
              />
            </Tooltip>
          </>
        )}
        <Tooltip text='Delete Task'>
          <img
            src={deleteIcon}
            alt='Delete Task'
            className={taskStyles.deleteIcon}
            onClick={handleDeleteTask}
          />
        </Tooltip>
      </span>
    </div>
  );
};

// Prop types validation
PendingTask.propTypes = {
  taskId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default PendingTask;
