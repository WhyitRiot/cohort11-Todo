import React, {createContext, useContext, useEffect, useState} from 'react';
import type {Task} from "./TaskType.ts"
import * as client from "./APIClient.ts"
type TaskContext = {
    tasks : Task[]
    error: string | null
    loading: boolean
    addTask: (task: Task) => Promise<void>,
    updateTask: (task: Task) => Promise<void>
    deleteTask: (id: Number) => Promise<void>
    fetchTasks: () => Promise<void>
}

const TaskContext = createContext<TaskContext | undefined>(undefined);
export const TaskContextProvider = ({children} :{children : React.ReactNode}) => {

    const [tasks, setTasks] = useState<Task[]>([])
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        fetchTasks();
    },[])

    const fetchTasks = async () =>{
        setLoading(true);
        let tasks : Task[] = await client.getTasks();
        setTasks(tasks);
        setLoading(false);
    }

    const addTask = async (task : Task) =>{
        setLoading(true);
        await client.postTask(task);
        setLoading(false);
    }

    const updateTask = async (task : Task) =>{
        setLoading(true);
        try{
            await client.putTask(task);
            setTasks((prevTasks) =>{
                if (!prevTasks) return [];
                return prevTasks.map((curTask) => curTask.id === task.id ? task : curTask);
            })
        }catch(error){
            console.error("Failed to update task", error);
        }
        finally{
            setLoading(false);
        }
    }

    const deleteTask = async (id : Number) =>{
        setLoading(true);
        try{
            await client.deleteTask(id);
            setTasks((prevTasks) =>{
                if (!prevTasks) return [];
                return prevTasks.filter(task => task.id !== id);
            })
        }catch(error){
            console.error("Failed to delete task", error);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <TaskContext.Provider value={{tasks, loading, error, addTask, updateTask, deleteTask, fetchTasks}}>
            {children}
        </TaskContext.Provider>
    );
};