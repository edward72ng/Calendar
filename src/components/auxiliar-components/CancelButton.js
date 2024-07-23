import React from 'react';
import cancelButtStyle from './CancelButton.module.css'

const {cancelButton, 
    buttonText,} = cancelButtStyle

function CancelButton ({ text, onClick }) {
  return (
    <button className={cancelButton} onClick={onClick}>
      <span className={buttonText}>{text}</span>
    </button>
  );
};

export {CancelButton};
