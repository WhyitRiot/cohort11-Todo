import type {Task} from "./TaskType.ts";
import {TableCell, TableRow} from "@mui/material";

const TaskRow = ({task} : {task : Task}) => {

    const handleClick = () =>{

    }

    const rowData = () =>{
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
                <TableCell><button>Edit</button></TableCell>
                {/*<TableCell align="right">{row.protein}</TableCell>*/}
            </TableRow>
        )
    }
};

export default TaskRow;