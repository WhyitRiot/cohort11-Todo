
import './App.css'
import TaskTable from "./TaskTable.tsx";
import type {Task} from "./TaskType.ts";
import {useEffect, useState} from "react";
import * as client from "./APIClient.ts"
import {TaskContextProvider} from "./TaskContextProvider.tsx";
import AddForm from "./AddForm.tsx";

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
            <TaskContextProvider>
                <TaskTable />
                <AddForm/>
            </TaskContextProvider>
        </>
    )
}

export default App
