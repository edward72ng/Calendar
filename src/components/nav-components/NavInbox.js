import React from "react";
import { Link } from "react-router-dom";

function NavInbox ({open, setOpen}) {
				
	return<Link to='/app/'><li className="navigation-item"
		onClick = {() => setOpen(!open)}>
			
			<div className='align-items-center'>
        	<span className="material-symbols-outlined">archive</span>
        	<span className="padding-left">Bandeja de Entrada</span> 
			</div>
			
        </li></Link>
	
}

export {NavInbox}