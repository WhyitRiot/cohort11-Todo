//import React from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import TaskRow from './TaskRow.tsx'
import type {Task} from "./TaskType.ts";
import {Paper, TableContainer} from "@mui/material";
import {useState} from "react";

type taskRow = {
    id: number;
    title: string,
    description: string,
    category: string
    isComplete: string
}

const TaskItem = (props: {tasks: Task[]}) => {
    const tasks = props.tasks;
    const columns: GridColDef[] = [
        {field: 'title', headerName: "Task", flex: 1},
        {field: 'description', headerName: "Description", flex: 1},
        {field: 'category', headerName: "Category", flex: 1},
        {field: 'isComplete', headerName: "Status", flex: 1}
    ]
        let rows : taskRow[] = tasks.map((task, index) =>{
            let row : taskRow = {
                id: index,
                title: task.title,
                description: task.description,
                category: task.category.label,
                isComplete: task.isComplete ? "Yes" : "No"
            }
            return row;
        })
        return (
            <div>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination:{
                                paginationModel: {pageSize: 5, page: 0}
                                }
                        }
                        }
                        pageSizeOptions={[5, 10]}
                        sx={{ border: 0 }}
                    />
                </Paper>
            </div>
        );
    };

export default TaskItem;