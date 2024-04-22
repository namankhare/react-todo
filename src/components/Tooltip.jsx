import PropTypes from 'prop-types';
import styles from '../styles/Tooltip.module.css';

const Tooltip = ({ text, children }) => {
  return (
    <div className={styles.tooltipContainer}>
      <div className={styles.tooltip}>
        {children}
        <span className={styles.tooltipText}>{text}</span>
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Tooltip;
