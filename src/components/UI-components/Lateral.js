import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../providers/DataContext';
import { ItemsContext } from '../../providers/ItemsContext';
import './lateral.css';

function Lateral ({children}) {
  const {setFilter, folder_id} = useContext(DataContext)
  const {myProjects} = useContext(ItemsContext)
  const [showText, setShowText] = useState(false);
  const [open, setOpen] = useState(false)

  const toggleText = () => {
    setShowText(!showText);
  };

  return (<>
    <div className={`menu-lateral-container ${showText ? "auto" : ""}`}>

      <div className="menu-button" onClick={toggleText}>
      <span className="material-symbols-outlined">menu</span>
      </div>

      <div className="menu-items">

        <Link to='/app/home'>
        <div className={`menu-item ${showText? "show" : ""}`}>
        <span className={`text ${showText ? "show" : ""}`}>Dashboard</span>
        <span className="material-symbols-outlined">dashboard</span>
        </div>
        </Link>
        

        <Link to='/app/'>
        <div className={`menu-item ${showText? "show" : ""}`}
        onClick={() => {setFilter(folder_id)}}>
        <span className={`text ${showText ? "show" : ""}`}>Inbox</span>
        <span className="material-symbols-outlined">archive</span>
        </div>
        </Link>
        

        <div className={`menu-item ${showText? "show" : ""}`}
        onClick={() => setOpen(!open)}>
        <span className={`text ${showText ? "show" : ""}`}>Folders</span>
        <span className="material-symbols-outlined">folder</span>
        </div>
        {open &&
          <div className='folders-modal'>
            {
          myProjects.map((elem, i) => {
            if(elem.name != "Inbox"){
              return(
                <Link to='/app/my-projects' key={elem.id}>
                <div className={`sub menu-item ${showText? "show" : ""}`}
                onClick={() => {setFilter(elem.id)}}>
                <span className={`sub-text ${showText ? "show" : ""}`}>{elem.name}</span>
                <span className="material-symbols-outlined" style={{color: `rgba(${elem.myColor.color}, 1)`}}>folder</span>
                </div>
                </Link>
              )
            }
          })
            }
          </div>
        }
        <div className={`menu-item ${showText? "show" : ""}`}>
        <span className={`text ${showText ? "show" : ""}`}>Groups</span>
        <span className="material-symbols-outlined">groups</span>
        </div>

        <div className={`menu-item ${showText? "show" : ""}`}>
        <span className={`text ${showText ? "show" : ""}`}>Settings</span>
        <span className="material-symbols-outlined">settings </span>
        </div>

      </div>

    </div>

    <div className='screen-container'>
        {children}
    </div>
    </>
  );
};

export {Lateral};
