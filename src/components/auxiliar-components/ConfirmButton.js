import React from 'react';
import cancelButtStyle from './ConfirmButton.module.css'

const {confirmButton, 
    buttonText,} = cancelButtStyle

function ConfirmButton ({ text, onClick }) {
  return (
    <button className={confirmButton} onClick={onClick}>
      <span className={buttonText}>{text}</span>
    </button>
  );
};

export {ConfirmButton};
