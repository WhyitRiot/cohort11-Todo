//import React from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import TaskRow from './TaskRow.tsx'
import type {Task} from "./TaskType.ts";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useState} from "react";

type taskRow = {
    id: number;
    title: string,
    description: string,
    category: string
    isComplete: string
}

const TaskTable = (props: {tasks: Task[]}) => {
    const tasks = props.tasks;
        return (
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Task</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task) => (
                                <TaskRow key={task.id} task={task} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    };

export default TaskTable;