import React, {useContext, useEffect, useState} from "react"
import {NavMyProjects} from './NavMyProjects'
import {NavProjectsGroup} from './NavProjectsGroup'
import {NavAsignMe} from './NavAsignMe'
import {NavCalendar} from './NavCalendar'
import { NavDashboard } from "./NavDashboard"
import { NavContacts } from "./NavContacts"
import { DataContext } from "../../providers/DataContext"
import { useAuth } from "../../providers/auth"
import {useNavigate} from 'react-router-dom';
import { NavInbox } from "./NavInbox"

function NavBar ({children}) {
	const [dashboard, setDashboard] = useState(false)
	const [myProjects, setMyProjects] = useState(false)
	const [projectsGroup, setProjectsGroup] = useState(false)
	const [assignedToMe, setAssignedToMe] = useState(false)
	const [calendar, setCalendar] = useState(false)
	const {activeMenu} = useContext(DataContext)
	const [inbox, setInbox] = useState(false)

	const auth = useAuth()
	const [render, setRender] = useState(false)
	const navigate = useNavigate()

	useEffect(()=>{
		if(!auth.token){
			navigate('/')
		  }
		setRender(true)
	},[])

	if (!render){
		return <span className="material-symbols-outlined">sync</span>
	}

	return<nav className="navigation-container" >
		<div className={activeMenu ? "active-menu" : "navigation-list"}>
			<ul className="list-container">
				
			<NavInbox
			open = {inbox}
			setOpen = {setInbox}
			></NavInbox>

			<NavDashboard
			open = {dashboard}
			setOpen = {setDashboard}
			></NavDashboard>

			<NavMyProjects
			open = {myProjects}
			setOpen= {setMyProjects}
			></NavMyProjects>





			{/*<NavCalendar
			open = {calendar}
			setOpen= {setCalendar}
			></NavCalendar>*/}


			</ul>
		</div>
		{children}
		
	</nav>
}

export {NavBar}