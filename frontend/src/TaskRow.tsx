import {useState, type ChangeEvent, useEffect, useContext} from "react";
import type {Task, TaskEdit} from "./TaskType.ts";
import {useTaskForm} from "./hooks/useTaskForm.ts";
import {Checkbox, TableCell, TableRow} from "@mui/material";
import {TaskContext} from "./TaskContextProvider.tsx";

const DataRow = ({task, handleEdit} :{task: Task, handleEdit:()=>void}) =>{
    return(
        <TableRow
            key={task.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {task.title}
            </TableCell>
            <TableCell >{task.description}</TableCell>
            <TableCell >{task.category.label}</TableCell>
            <TableCell >{task.isComplete ? "Yes" : "No"}</TableCell>
            <TableCell><button onClick={handleEdit}>Edit</button></TableCell>
        </TableRow>
    )
}

const EditRow = ({task, form, checked, handleSave, handleChange, handleClick} :{task : Task, form : TaskEdit, checked: boolean, handleSave : ()=>void, handleChange: (e: any)=>void, handleClick: (e : ChangeEvent<HTMLInputElement, Element>) => void}) =>{
    return(
        <TableRow
            key={task.id}
            sx={{ '&:last-child td, &:last-child th' : {border : 0} }}>
            <TableCell>
                <input type="text" name={"title"} value={form.title} onChange={(e)=>handleChange(e)}/>
            </TableCell>
            <TableCell>
                <input type="text" name={"description"} value={form.description}  onChange={(e)=>handleChange(e)}/>
            </TableCell>
            <TableCell>
                <input type="text" name={"categoryLabel"} value={form.categoryLabel} onChange={(e)=>handleChange(e)}/>
            </TableCell>
            <TableCell>
                <Checkbox name="isComplete" checked={form.isComplete} onChange={e => handleClick(e)}/>
            </TableCell>
            <TableCell>
                <button onClick={handleSave}>Save</button>
            </TableCell>
        </TableRow>
    )
}

const TaskRow = ({task}: { task: Task }) => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("Outside of provider");
    const {updateTask} = context;

    const {edit, form, checked, handleClick, handleEdit, handleChange, handleSave } = useTaskForm(task, updateTask);

    return edit ?
        <EditRow
            task={task}
            form={form}
            checked={checked}
            handleSave={handleSave}
            handleChange={handleChange}
            handleClick={handleClick}
        />
        : <DataRow
            task={task}
            handleEdit={handleEdit} />
};

export default TaskRow;