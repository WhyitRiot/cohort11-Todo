import React, {createContext, useContext, useEffect, useState} from 'react';
import type {Category, Task} from "../utilities/TaskType.ts"
import * as client from "../utilities/APIClient.ts"

type TaskContextType = {
    tasks : Task[]
    categories : Category[]
    error: string | null
    loading: boolean
    addTask: (task: Task) => Promise<void>,
    updateTask: (task: Task) => Promise<void>
    deleteTask: (id: number) => Promise<void>
    fetchTasks: () => Promise<void>
    fetchCategories: () => Promise<void>
    addCategory: (category: Category) => Promise<void>
    updateCategory: (category: Category) => Promise<void>
    deleteCategory: (id: number) => Promise<void>
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);
export const TaskContextProvider = ({children} :{children : React.ReactNode}) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [tasks, setTasks] = useState<Task[]>([])
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCategories = async() =>{
        setLoading(true);
        let categories = await client.getCategories();
        setCategories(categories);
        setLoading(false);
    }

    const addCategory = async (category: Category) =>{
        setLoading(true);
        await client.postCategory(category);
        await fetchCategories();
        setLoading(false);
    }

    const updateCategory = async(category: Category)=>{
        setLoading(true)
        if (category.id){
            await client.putCategory(category.id, category);
            setCategories(prev => prev.map(item => {
                if (item.id === category.id){
                    return category
                } else{
                    return item
                }
            }))
        }
        setLoading(false);
    }

    const deleteCategory = async(id : Number) => {
        setLoading(true);
        await client.deleteCategory(id);
        setCategories(prev => prev.filter(item => item.id != id));
        setLoading(false);
    }

    const fetchTasks = async () =>{
        setLoading(true);
        let tasks : Task[] = await client.getTasks();
        setTasks(tasks);
        setLoading(false);
    }

    const addTask = async (task : Task) =>{
        setLoading(true);
        await client.postTask(task);
        await fetchTasks();
        await fetchCategories();
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
    useEffect(()=>{
        fetchCategories();
        fetchTasks();
    },[])

    return (
        <TaskContext.Provider value={{tasks, categories, loading, error, addTask, updateTask, deleteTask, fetchTasks, fetchCategories, addCategory, updateCategory, deleteCategory}}>
            {children}
        </TaskContext.Provider>
    );
};