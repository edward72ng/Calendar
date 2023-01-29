import React from "react";
import { Link } from "react-router-dom";

function NavDashboard ({open, setOpen}) {
				
	return<li className="navigation-item"
		onClick = {() => setOpen(!open)}>
			<Link to='/home'>
			<div className='align-items-center'>
        	<span className="material-symbols-outlined">dashboard</span>
        	<span className="padding-left">Tablero</span> 
			</div>
			</Link>
        </li>
	
}

export {NavDashboard}