import React from 'react'

function NavAsignMe ({open, setOpen}) {
			
	return<>
		<li className='navigation-item'
		onClick = {() => setOpen(!open)}>
			<div className='align-items-center'>
			<span className="material-symbols-outlined">person</span>
			<span className='padding-left'>Asignadas a Mí</span>
			</div>
		</li>
		{open && 
			<ul>
				<li className='navigation-sub-items'>
				<span className="material-symbols-outlined">folder_open</span>
					Proyectos</li>
				<li className='navigation-sub-items'>
				<span className="material-symbols-outlined">event</span>	
					Evento</li>
			</ul>
		}
	</>
}

export {NavAsignMe}
