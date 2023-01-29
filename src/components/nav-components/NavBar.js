import React, {useContext, useState} from "react"
import {NavMyProjects} from './NavMyProjects'
import {NavProjectsGroup} from './NavProjectsGroup'
import {NavAsignMe} from './NavAsignMe'
import {NavCalendar} from './NavCalendar'
import { NavDashboard } from "./NavDashboard"
import { NavContacts } from "./NavContacts"
import { DataContext } from "../../providers/DataContext"


function NavBar ({children}) {
	const [dashboard, setDashboard] = useState(false)
	const [myProjects, setMyProjects] = useState(false)
	const [projectsGroup, setProjectsGroup] = useState(false)
	const [assignedToMe, setAssignedToMe] = useState(false)
	const [calendar, setCalendar] = useState(false)
	const {activeMenu} = useContext(DataContext)

	return<nav className="navigation-container" >
		<div className={activeMenu ? "active-menu" : "navigation-list"}>
			<ul className="list-container">
			<NavDashboard
			open = {dashboard}
			setOpen = {setDashboard}
			></NavDashboard>

			<NavMyProjects
			open = {myProjects}
			setOpen= {setMyProjects}
			></NavMyProjects>

			<NavProjectsGroup
			open = {projectsGroup}
			setOpen= {setProjectsGroup}
			></NavProjectsGroup>

			<NavAsignMe
			open = {assignedToMe}
			setOpen= {setAssignedToMe}
			></NavAsignMe>

			<NavCalendar
			open = {calendar}
			setOpen= {setCalendar}
			></NavCalendar>

			<NavContacts>
				
			</NavContacts>
			</ul>
		</div>
		{children}
		
	</nav>
}

export {NavBar}