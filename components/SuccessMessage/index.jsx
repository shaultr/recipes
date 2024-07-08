import React from 'react';
import styles from './style.module.scss'
import Checkmark from '../Checkmark';

const SuccessMessage = ({ message }) => {
  return (
    <div className={styles.success}>
      {message}
      <Checkmark/>
    </div>
  );
};

export default SuccessMessage;
