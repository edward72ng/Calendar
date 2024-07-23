// EventScheduler.js
import React from 'react';
import styles from './EventScheduler.module.css';
import { SwitchButton } from "../auxiliar-components/SwitchButton";

const {
    eventScheduler,
    headerSchedule,
    timeInputs,
    timeInput,
    labelHeaderSchedule
  } = styles

function EventScheduler () {

    const changeSchedulerMode = () => {
        console.log("cambiar")
    } 

  return (
    <div className={eventScheduler}>
    <div className={headerSchedule}>
        <span className="material-symbols-outlined">schedule</span>

        <label className={labelHeaderSchedule}>
        <span>All day</span>
        </label>

        <SwitchButton 
        checkedValue={true} 
        changeThisChecked={changeSchedulerMode}/>

    </div>

    <div className={timeInputs}>
      <div className={timeInput}>
        <label>Starts</label>
        <div>
          <span>Sat, 19 Jan</span>
          <span>19:00pm</span>
        </div>
      </div>
      <div className={timeInput}>
        <label>Ends</label>
        <div>
          <span>21:00pm</span>
        </div>
      </div>
      <div className={timeInput}>
        <label>Repeat</label>
        <div>
          <span>Never</span>
        </div>
      </div>
    </div>
  </div>
  );
};

export {EventScheduler};
