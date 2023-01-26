import React, { useEffect, useState } from 'react'
import { useAuth } from '../providers/auth'
function ProfileView({profileView, setProfileView}){
  const [user,setUser] = useState('')
  const auth = useAuth() 
  useEffect(()=>{
    fetch('http://localhost:3000/api/v1/user/1')
    .then(res => res.json())
    .then(data => {
      setUser(data.user)
    })
  },[])
    return <div className='profile-container'>
      <div className='space-between'>
      <i className="material-icons">person_outline</i>
      <i className="material-icons"
      onClick={()=>setProfileView(false)}
      >close</i>
      </div>
      
      <h6>{user}</h6>
      <p>Plan Free</p>
      <p className='warning' onClick={()=>{
        setProfileView(!profileView);
        auth.logout()
      }}>Cerrar Sesion</p>
    </div>
  }

export {ProfileView}