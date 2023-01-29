import React from 'react'
import { Link } from 'react-router-dom'

function NavContacts ({open, setOpen}) {
				
	return <><Link to='/contacts'>
		<li className='navigation-item'>
			<div className='align-items-center'>
			<span className="material-symbols-outlined">groups</span>
			<span className='padding-left'>Contactos</span>
			</div>
		</li>
		</Link>
	</>
}

export {NavContacts}