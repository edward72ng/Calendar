import React, { useState } from "react";
import { UseFetch } from "../../custom-hooks/useFetch";
import {useAuth} from '../../providers/auth'

function Contacts () {
    const [search, setSearch] = useState(false)
    const [searchContacts, setSearchContacts] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [contacts, updateContacts] = UseFetch('/api/v1/contacts')

    const auth = useAuth()

    const handleInput = (e)=>{
        setInputValue(e.target.value)
        console.log(inputValue)
    }

    const sendEvent = async ()=>{
        const res = await fetch(`/api/v1/user/search/${inputValue}`)
        const data = await res.json()
        setSearchContacts(data)
        console.log(data)
        setInputValue('')
    }

    const newRequest = async (destinationId) => {
        await fetch(`/api/v1/pending`,{
            method: 'POST',
            body: JSON.stringify( {
                message: 'Solicitud de Contacto',
                destination: destinationId,
                
            }),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.token,
            }
        })
        //const data = await res.json()
    }

    return <div className="row">
        <div>
        <h1>Tus Contactos</h1>

            <ul>
            {contacts.map((elem)=>{
                return <li key={elem.uid}>
                    {elem.user}</li>
            })}
            </ul>

        </div>
        <div>
            <p className="tittle">Añadir Contactos</p>
            <span className="material-symbols-outlined"
            onClick={()=>setSearch(!search)}
            >search</span>
            {search &&
            <>
                <input placeholder="Buscar" type="text" value={inputValue}
                onChange={(e)=>handleInput(e)}></input>
                <span className="material-symbols-outlined"
                onClick={()=>sendEvent()}
                >search</span>
                
            </>
            }
            <ul>
            {
                searchContacts.map((elem, i)=>{
                   return <li key={elem.uid}>{elem.user}
                   <span className="material-symbols-outlined"
                   onClick={()=>{newRequest(elem.uid)}}>person_add</span>
                   </li>
                })
            }
            </ul>
        </div>

        
    </div>
}

export {Contacts}