import React from "react";

function Options ({open, setOpen}) {

    return <div className="options-container">
        <ul>
            <li className="option-item">
            <span className="material-symbols-outlined">edit</span>
            <span>Editar</span>
            </li>
            <li className="option-item">
            <span className="material-symbols-outlined">calendar_month</span>
            <span>calendario</span>
            </li>
            <li className="option-item">
            <span className="material-symbols-outlined">timer</span>
            <span>Alarma</span>
            </li>
            <li className="option-item">
            <span className="material-symbols-outlined">input</span>
            <span>Mover</span>
            </li>
            <li className="option-item">
            <span className="material-symbols-outlined">assignment_ind</span>
            <span>Asignar</span>
            </li>
            <li className="option-item"
            onClick={() => setOpen(!open)}>
            <span className="material-symbols-outlined">close</span>
            <span>Cerrar</span>
            </li>
            <li className="option-item">
            <span className="material-symbols-outlined">delete</span>
            <span>Borrar</span>
            </li>
        </ul>
    </div>
}

export {Options}