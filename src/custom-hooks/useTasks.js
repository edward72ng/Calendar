import React, { useEffect, useState } from "react";

import { useFetchData } from "./useFetchData";



function useTasks ({sectionid}){
    const [tasks, setTasks] = useState([])
    const {loadData} = useFetchData()

    useEffect(()=>{
        loadtasks()
    },[])

    const loadtasks = async()=>{
        const data = await axios.get('/api/v1/inbox/with-section/'+ sectionid)
        //const data = res.json()
        console.log(data)
        
        setTasks(data)
    }

    return {tasks}

}

export {useTasks}