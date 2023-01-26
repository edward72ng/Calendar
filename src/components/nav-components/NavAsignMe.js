import React from 'react'

function NavAsignMe ({open, setOpen}) {
			
	return<>
		<li className='hover'
		onClick = {() => setOpen(!open)}>
			<div className='align-items-center'>
			<span className="material-symbols-outlined">person</span>
			<span className='padding-left'>Asignadas a Mí</span>
			</div>
		{open && 
			<ul>
				<li className='navigation-sub-items'>Proyectos</li>
				<li className='navigation-sub-items'>Evento</li>
			</ul>
		}
		</li>
	</>
}

export {NavAsignMe}
