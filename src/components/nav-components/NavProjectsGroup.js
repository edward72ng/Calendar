import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { UseFetch } from '../../custom-hooks/useFetch'
import { DataContext } from '../../providers/DataContext'

function NavProjectsGroup ({open, setOpen}) {
	const [projectsGroup, updateProjectsGroup] = UseFetch('/api/v1/folders/collaborative')
	const {setFilter} = useContext(DataContext)

	return<>
		<li className='navigation-item'
		onClick = {() => setOpen(!open)}>
			<div className='align-items-center'>
			<span className="material-symbols-outlined">folder_shared</span>
			<span className='padding-left'>Proyectos Grupales</span>
			</div>
		</li>
		{open && 
			<ul>
			{projectsGroup.map((elem) => {
				return (<div key={elem.id}><Link to='/collaborative'><li  className='navigation-sub-items'
					onClick={()=>setFilter('?folder=' + elem.id)}>
					<span className="material-symbols-outlined">folder_open</span>
					{elem.name}
					</li></Link></div>)
			})}
			</ul>
		}
	</>
}

export {NavProjectsGroup}
