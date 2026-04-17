import {type ChangeEvent, useState} from "react";
import type {Task, TaskEdit} from "../utilities/TaskType.ts";

export const useTaskForm = (task : Task, onSave : (updatedTask : Task) => Promise<void>, onDelete : (id : number) => Promise<void>)=>
{
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
    }

    const [form, setForm] = useState<TaskEdit>({
        title: task.title,
        description: task.description,
        categoryLabel: task.category.label,
        isComplete: task.isComplete
    })

    const handleClick = (e: ChangeEvent<HTMLInputElement, Element>) => {
        const {name, checked} = e.target;
        setForm((prev) => ({...prev, [name]: checked}))
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === "isComplete"){
            console.log("here");
        }
        setForm((prev) => ({...prev, [name]: value}))
    }

    const handleSave = async () => {
        const updatedTask: Task = {
            title: form.title,
            description: form.description,
            isComplete: form.isComplete,
            category: {
                label: form.categoryLabel,
                id: task.category.id
            },
            id: task.id
        }
        await onSave(updatedTask);
        console.log(updatedTask);
        setEdit(false);
    }

    const handleDelete = async () =>{
        if (task.id){
            await onDelete(task.id);
        }
        setEdit(false);
    }

    return {
        edit,
        form,
        handleDelete,
        handleClick,
        handleEdit,
        handleChange,
        handleSave
    }
}