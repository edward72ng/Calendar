import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DatesContext } from '../../app/datesContext'
import {UseFetch} from '../../app/useFetch'

function NavProjectsGroup ({open, setOpen}) {
	const [projectsGroup, updateProjectsGroup] = UseFetch('/api/v1/folders/collaborative')
	const {setFilter} = useContext(DatesContext)

	return<>
		<li className='hover'
		onClick = {() => setOpen(!open)}>
			<div className='align-items-center'>
			<span className="material-symbols-outlined">folder_shared</span>
			<span className='padding-left'>Proyectos Grupales</span>
			</div>
		{open && 
			<ul>
			{projectsGroup.map((elem) => {
				return (<li key={elem.id} className='navigation-sub-items'
					onClick={()=>setFilter('?folder=' + elem.id)}>
					<Link to='/collaborative'>{elem.name}</Link>
					</li>)
			})}
			</ul>
		}
		</li>
		
	</>
}

export {NavProjectsGroup}
