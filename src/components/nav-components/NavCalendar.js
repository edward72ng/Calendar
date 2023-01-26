import React from 'react'
import { Link } from 'react-router-dom'

function NavCalendar ({open, setOpen}) {
				
	return <>
		<li className='hover'>
		<Link to='/calendar'>
			<div className='align-items-center'>
			<span className="material-symbols-outlined">calendar_month</span>
			<span className='padding-left'>Calendario</span>
			</div>
		</Link>
		</li>
	</>
}

export {NavCalendar}