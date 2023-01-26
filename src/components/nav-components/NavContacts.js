import React from 'react'
import { Link } from 'react-router-dom'

function NavContacts ({open, setOpen}) {
				
	return <>
		<li className='hover'>
		<Link to='/contacts'>
			<div className='align-items-center'>
			<span className="material-symbols-outlined">groups</span>
			<span className='padding-left'>Contactos</span>
			</div>
		</Link>
		</li>
	</>
}

export {NavContacts}