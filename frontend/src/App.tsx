
import './App.css'
import TaskItem from "./TaskItem.tsx";
import type {Task} from "./TaskType.ts";
import {useEffect, useState} from "react";
import * as client from "./APIClient.ts"

function App() {
    const [data, setData] = useState<Task[]>([]);

    const fetchData = async () =>{
        const data = await client.getTasks();
        setData(data);
    }

    useEffect(()=>{
        fetchData();
    }, [])

    return (
        <>
            <TaskItem tasks={data}/>
        </>
    )
}

export default App
