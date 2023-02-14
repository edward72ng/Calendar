import React from 'react'
import { Link } from 'react-router-dom'

function NavCalendar ({open, setOpen}) {
				
	return <>
	<Link to='/app/calendar'>
		<li className='navigation-item'>
			<div className='align-items-center'>
			<span className="material-symbols-outlined">calendar_month</span>
			<span className='padding-left'>Calendario</span>
			</div>
		</li>
		</Link>
	</>
}

export {NavCalendar}