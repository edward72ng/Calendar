import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DatesContext } from '../../app/datesContext'
import { UseFetch } from '../../custom-hooks/useFetch'

function NavMyProjects ({open, setOpen}) {
	const [myProjects, updateMyProjects] = UseFetch('/api/v1/folders/me')
	const {setFilter} = useContext(DatesContext)

	useEffect(()=>{
		updateMyProjects()
	},[open])

	return<>
		<li className='navigation-item'
		onClick = {() => setOpen(!open)}>
			<div className='align-items-center'>
			<span className="material-symbols-outlined">folder_copy</span>
			<span className='padding-left'>Mis Proyectos</span>
			</div>
		</li>
		{open && 
			<ul>
			{myProjects.map((elem) => {
			return <div key={elem.id}><Link  to='/app/my-projects'> 
			<li className='navigation-sub-items'
					onClick={()=>setFilter('?folder=' + elem.id)}>
						<span className="material-symbols-outlined">folder_open</span>
						
						{elem.name}
					</li></Link></div>
			})}
				</ul>
		}
	</>
}

export {NavMyProjects}
