import { useState } from "react";
import type {Task} from "./TaskType.ts";
import {TableCell, TableRow} from "@mui/material";

const TaskRow = ({task} : {task : Task}) => {
    const [edit, setEdit] = useState(false);
    const handleClick = () =>{
        setEdit(!edit);
    }
    const EditRow = () =>{
        return(
            <TableRow
                key={task.id}
                sx={{ '&:last-child td, &:last-child th' : {border : 0} }}>
                <TableCell>
                    <input type="text" placeholder={task.title}/>
                </TableCell>
                <TableCell>
                    <input type="text" placeholder={task.description}/>
                </TableCell>
                <TableCell>
                    <input type="text" placeholder={task.category.label}/>
                </TableCell>
                <TableCell>
                    <input type="radio"/>
                </TableCell>
                <TableCell>
                    <button onClick={handleClick}>Save</button>
                </TableCell>
            </TableRow>
        )
    }

    const DataRow = () =>{
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
                <TableCell><button onClick={handleClick}>Edit</button></TableCell>
            </TableRow>
        )
    }
    return edit ? <EditRow /> : <DataRow />
};

export default TaskRow;