import PropTypes from 'prop-types';
import taskStyles from '../styles/Task.module.css';
import deleteIcon from '../assets/delete.svg';
import PendingIcon from '../assets/pending.svg';
import { deleteTask, updateTask } from '../Utils';
import Tooltip from './Tooltip';

const CompleteTask = ({ taskId, text, setTasks }) => {
  const handleDeleteTask = async () => {
    try {
      const updatedTasks = await deleteTask(taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePendingTask = async () => {
    try {
      const updatedTasks = await updateTask(taskId, text, false);
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={taskStyles.singleCompletedTaskContainer}>
      <p className={taskStyles.completed}>{text}</p>
      <span className={taskStyles.taskActions}>
        <Tooltip text='Mark Pending'>
          <img
            src={PendingIcon}
            alt='Mark Pending'
            className={taskStyles.completedIcon}
            onClick={handlePendingTask}
          />
        </Tooltip>
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
CompleteTask.propTypes = {
  taskId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default CompleteTask;
