//import React from 'react';
import TaskRow from './TaskRow.tsx'
import type {Task} from "./TaskType.ts";

const TaskItem = ({tasks} : {tasks: Task[]}) => {
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <td>
                            Title
                        </td>
                        <td>
                            Description
                        </td>
                        <td>
                            Status
                        </td>
                        <td>
                            Category
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((e : Task) =>{
                        return(
                            <TaskRow key={e.id} task={e}/>
                        )
                    })}
                    </tbody>
                </table>

            </div>
        );
    };

export default TaskItem;