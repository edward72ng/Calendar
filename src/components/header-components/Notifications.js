import React, { useState } from "react";
import {useAuth} from '../../providers/auth'

const PUBLIC_KEY = 'BEs07nyEof-ZdzfawuCTHPL3KP0RTis5Nkw32K2cBgIYc4NmXAVljzgFnRWF65Yz3we9cbcCR1FonVea2lCrBBs'

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }




function Notifications () {
    const auth = useAuth()
    
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
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
            
                // Send Notification
                await fetch("/api/v1/workers/subscribed", {
                  method: "POST",
                  body: JSON.stringify(subscription),
                  headers: headers
                });
                console.log("Subscribed!");
            }
            
        } catch (error) {
            console.log('Algo a salido mal')
        }
    }; 
    
    
    const handleClick = () => {
        if ("serviceWorker" in navigator && "Notification" in window) {
            console.log('EXISTE SERVICE WORKER')
            subscription().catch(err => console.log(err));
        }else{
            console.log('NO EXISTE SERVICE WORKER')
        }
    }

    return <li className="header-item"
    onClick={() => handleClick()}>
        <span className="material-symbols-outlined">notifications</span>
       
    </li>
}

export {Notifications}