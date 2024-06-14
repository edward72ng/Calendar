// SwitchButton.js

import React, { useState } from 'react';
import './SwitchButton.css';

const SwitchButton = ({checkedValue, changeThisChecked}) => {

  const handleToggle = () => {
    changeThisChecked();
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checkedValue  || false}
        onChange={handleToggle}
      />
      <span className="slider round"></span>
    </label>
  );
};

export {SwitchButton};
