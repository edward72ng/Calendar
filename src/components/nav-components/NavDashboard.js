import React from "react";
import { Link } from "react-router-dom";

function NavDashboard ({open, setOpen}) {
				
	return<Link to='/app/home'><li className="navigation-item"
		onClick = {() => setOpen(!open)}>
			
			<div className='align-items-center'>
        	<span className="material-symbols-outlined">dashboard</span>
        	<span className="padding-left">Tablero</span> 
			</div>
			
        </li></Link>
	
}

export {NavDashboard}