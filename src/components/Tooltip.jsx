import PropTypes from 'prop-types';
import styles from '../styles/Tooltip.module.css';

/**
 * Renders a tooltip with the provided text.
 *
 * @param {string} text - The text content of the tooltip.
 * @param {ReactNode} children - The children components wrapped by the tooltip.
 */
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

// PropTypes validation.
Tooltip.propTypes = {
    text: PropTypes.string.isRequired, // Required text prop.
    children: PropTypes.element.isRequired, // Required children prop.
};

export default Tooltip;
