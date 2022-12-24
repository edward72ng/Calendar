import React from 'react'
function ProfileView({profileView, setProfileView}){
    return <div className='profile-container'>
      <i className="material-icons">person_outline</i>
      <h6>Nickname Actual</h6>
      <div className='line-div'></div>
      <p>Plan Free</p>
      <p onClick={()=>{
        setProfileView(!profileView)
      }}>Cerrar Sesion</p>
    </div>
  }

export {ProfileView}