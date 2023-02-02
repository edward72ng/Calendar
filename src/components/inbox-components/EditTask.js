import React, { useContext } from "react";
import { FunctionTasksContext } from "../../providers/FunctionTasks.provider";
import { SubOptions } from "../my-projects-components/SubOptions";

function EditTask ({values, functions}) {
    const {contentVal = content,
        detailsVal = details} = values;

    const {editTask} = useContext(FunctionTasksContext)

    const [content, setContent] = useState(contentVal);
    const [details, setDetails] = useState(detailsVal);

    const sendTask = () => {
        editTask({content, details})
    } 

    return <div>
        <div>
        <input className="input-task" placeholder="contenido"
            value={content}
            onChange = { (e) => setContent(e.target.value)}></input>
        <input className="input-task" placeholder="detalles"
            value={details}
            onChange = { (e) => setDetails(e.target.value)}></input>
        </div>
        <div className="options-container-horizontal">
            <SubOptions>
            <li 
            onClick={sendTask}
            className="option-item">
            <span className="material-symbols-outlined">send</span><span>Enviar</span>
            </li>
            </SubOptions>
        </div>
    </div>
}

export {EditTask}