import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DatesContext } from '../../app/datesContext'
import {UseFetch} from '../../app/useFetch'

function NavMyProjects ({open, setOpen}) {
	const [myProjects, updateMyProjects] = UseFetch('/api/v1/folders/me')
	const {setFilter} = useContext(DatesContext)

	return<>
		<li className='hover'
		onClick = {() => setOpen(!open)}>
			<div className='align-items-center'>
			<span className="material-symbols-outlined">folder</span>
			<span className='padding-left'>Mis Proyectos</span>
			</div>
		{open && 
			<ul>
			{myProjects.map((elem) => {
			return  <li key={elem.id} className='navigation-sub-items'
					onClick={()=>setFilter('?folder=' + elem.id)}>
						<Link to='/my-projects'>
						{elem.name}</Link>
					</li>
			})}
				</ul>
		}
		</li>
		
	</>
}

export {NavMyProjects}
