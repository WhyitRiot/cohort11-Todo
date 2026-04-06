import React, {createContext} from 'react';
import type {Task} from "./TaskType.ts"
import * as client from "./APIClient.ts"

const TaskContext = createContext<Task[]>([]);

const TaskContextProvider = () => {
    return (
        <div>

        </div>
    );
};

export default TaskContextProvider;