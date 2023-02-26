import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { DataContext } from '../../providers/DataContext'
import { ItemsContext } from '../../providers/ItemsContext'

function NavMyProjects ({open, setOpen}) {
	//const [myProjects, updateMyProjects] = UseFetch('/api/v1/folders/me')
	const { myProjects, dispatchMyProjects,  updateAll, section, updateWithout} = useContext(ItemsContext)
	const {setFilter} = useContext(DataContext)
	return<>
		<li className='navigation-item'
		onClick = {() => setOpen(!open)}>
			<div className='align-items-center'>
			<span className="material-symbols-outlined">folder_copy</span>
			<span className='padding-left'>Mis Proyectos</span>
			</div>
		</li>
		{open && 
			<ul className='sub-projects-container'>
			{myProjects.map((elem, i) => {
			return <div key={elem.id? elem.id : i}><Link  to='/app/my-projects'> 
			<li className='navigation-sub-items'
					onClick={()=>{
						setFilter(elem.id); 
						//updateAll(); 
						//updateWithout();
						}}>
						<span className="material-symbols-outlined">folder_open</span>
						
						{elem.name}
					</li></Link></div>
			})}
				</ul>
		}
	</>
}

export {NavMyProjects}
