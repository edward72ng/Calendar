import React, { useContext, useState } from "react";
import {useAuth} from '../../providers/auth'
import { urlBase64ToUint8Array } from "../../utils/utilityFunctions";
import {DataContext} from "./../../providers/DataContext"
import { Modal } from "../../app/modal";
import './Notifications.css'
import { SwitchButton } from "../auxiliar-components/SwitchButton";
//import notificationPermissionImg from "../../public/assets/notifications-permission.svg";

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
const activeProvicional = false

function Notifications () {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState({
        notificationsActive: activeProvicional
    })
    const {worker, permission, setPermission} = useContext(DataContext)
    const auth = useAuth()
  
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
    }

    const changeNotificationsActive = () => {
        if(permission == false){
            subscription().then(() =>{
                setOptions((prev) => {
                    return({
                        ...prev,
                        notificationsActive: !prev.notificationsActive,
                    })
                })
                setPermission(true)
            })
            .catch(err => console.log(err));
        }else if(permission == true){
            setOptions((prev) => {
                return({
                    ...prev,
                    notificationsActive: !prev.notificationsActive,
                })
            })
        }
      }

    const subscription = async () => {
        try {
            const permission = await Notification.requestPermission()

            if(permission === "granted"){
                const register = await navigator.serviceWorker.register('/worker.js',{
                    scope: '/'
                });
                console.log('Servide Worker started')
            
                const subscription = await register.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
                }); 
            
                console.log(subscription);
            
                //Suscribirse y recibir notificacion para confirmarlo
                await fetch("/api/v1/workers/subscribed", {
                  method: "POST",
                  body: JSON.stringify(subscription),
                  headers: headers
                });
                console.log("Subscribed!");
            }
            
        } catch (error) {
            alert('Algo a salido mal')
        }
    }; 
    

    return <><li className="header-item">
        <span className="material-symbols-outlined"
        onClick={() => setOpen(!open)}
        >notifications</span>
    </li>

{open && 
    <Modal>
         <div className="notifications-settings-modal">
            <div className="modal-header">
                <h1 className="modal-tittle">Notificaciones</h1>
                <span className="material-symbols-outlined" 
                onClick={() => setOpen(!open)}>close</span>
            </div>

             {(worker == false) &&
                 <span>No hay serviceWorker</span>
             }
             {permission?
                <>
                <img src="assets/notifications-actived.svg" alt=""></img>
                <span className="information-tittle">
                    Selecciona tus preferencias</span>
                <span className="information-description">
                    Las selecciones se guardaran automaticamente</span>

                <div className="options-notifications-settings">             
                    <span>Activar Notificaciones</span>
                    <SwitchButton 
                    checkedValue={options.notificationsActive} 
                    changeThisChecked={changeNotificationsActive}/>
                </div>

                <div className="options-notifications-group">             
                    <span>Recibir un resumen del día</span>

                    <div>
                        <span>Notificaciones Push</span>
                        <label>
                        <input
                        type="checkbox"
                        checked={true}
                        ></input>
                        </label>
                    </div>
                    <div>
                        <span>Notificaciones por E-mail</span>
                        <label>
                        <input
                        type="checkbox"
                        checked={false}
                        ></input>
                        </label>
                    </div>
                    <div>
                        <span>Solo los de prioridad máxima</span>
                        <label>
                        <input
                        type="checkbox"
                        checked={true}
                        ></input>
                        </label>
                    </div>

                </div>

                </>
                :
                <>    
                <img src="assets/notifications-disabled.svg" alt=""></img>
                <span className="information-tittle">
                    Necesitas permitir las notificaciones para recibirlas</span>
                <span className="information-description">
                    Puedes desactivarlas cuando desees</span>

                <div className="options-notifications-settings">             
                    <span>Activar Notificaciones</span>
                    <SwitchButton
                    checkedValue={options.notificationsActive} 
                    changeThisChecked={changeNotificationsActive}/>
                </div>
                </>
             }

         </div>
    </Modal>
    
    }</>
}

export {Notifications}