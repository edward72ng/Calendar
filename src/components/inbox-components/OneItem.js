import React,{useContext, useState} from "react";
import {useAuth} from '../../providers/auth'
import { Options } from "../my-projects-components/Options";
import { DataContext } from "../../providers/DataContext";
import { GaleryFromTask } from "./GaleryFromTask";
import { EditTask } from "./EditTask";
import { VisualItem } from "./VisualItem";
import { EditItem } from "./EditItem";

function OneItem ({values, functions}){
    const {id, content, details, evento, sectionid, folderid} = values
    const {refreshTasks, dispatchTasks} = functions
    const [edit, setEdit] = useState(false)
    
    if(edit){
      return <EditItem
      values={values}
      functions={{refreshTasks, setEdit, dispatchTasks}}></EditItem>
    }

    return <VisualItem
    values={values}
    functions={{...functions, setEdit}}></VisualItem>
}
export {OneItem}