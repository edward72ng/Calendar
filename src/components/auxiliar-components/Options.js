import React, { useContext } from "react";
import { ItemsContext } from "../../providers/ItemsContext";

function Options({state, setState}) {
    const { myProjects } = useContext(ItemsContext)
    
    const handleEventChange = (e) => {
        const event = e.target.value;
        setState((prevState) => ({ ...prevState, event }));
      };
    
      const handleDateChange = (e) => {
        const date = e.target.value;
        setState((prevState) => ({ ...prevState, date }));
      };

      const handleTimeChange = (e) => {
        const time = e.target.value;
        setState((prevState) => ({ ...prevState, time }));
      };
    
      const handleSelectChange = (e) => {
        const folderid = e.target.value;
        setState((prevState) => ({ ...prevState, folderid }));
      };

      const handleAdd = (e) => {
        if (state.date && state.time){
            const notification = {
                date: state.date,
                time: state.time,
            }
            setState((prevState)=> ({...prevState, notifications: [...state.notifications, notification], date: '', time: ''}))
        }
      }

    return <div className="utils-container">
        <div>
        <input type="date" value={state.event} onChange={handleEventChange} />
        <select onChange={handleSelectChange} defaultValue= {state.folderid}>
            {!state.folderid &&
                <option>Inbox</option>
            }
            {
                myProjects.map((elem) => {
                    return <option value={elem.id} key={elem.id}>{elem.name}</option>
                })
            }
        </select>
        </div>
        
        <div>
            <div>
                {
                    state.notifications.map((elem, i)=> {
                        return<div key={i}>
                        <span>{elem.date}</span>
                        <span>{elem.time}</span>
                        <span className="material-symbols-outlined">delete</span>
                        </div>
                    })
                }
            </div>

        <input type="date" value={state.date} onChange={handleDateChange} />
        <input type="time" value={state.time} onChange={handleTimeChange} />
        <span className="material-symbols-outlined"
        onClick={handleAdd}>add</span>
        </div>

    </div>
}

export {Options}