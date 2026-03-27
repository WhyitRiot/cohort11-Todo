//import React from 'react';
import {useState} from "react";
import axios from "axios";
import type {Task} from "./TaskType.ts";

const TaskItem = () => {
    const [data, setData] = useState<Task[]>([]);


    const handleSubmit = async () => {
        try {
            const response =  axios.get("http://localhost:8080/api/v1/task/all").then(r=> setData(r.data))
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    console.log(data, "data")



        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <td>
                            Id
                        </td>
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

                </table>
                {data?.map((t) =>{
                    return(
                    <tr>
                        <td>
                            {t.id}
                        </td>
                        <td>
                            {t.title}
                        </td>
                        <td>
                            {t.description}
                        </td>
                        <td>
                            {t.isComplete ? "Yes" : "No"}
                        </td>
                        <td>
                            {t.category.label}
                        </td>
                    </tr>
                    )})}
                <button onClick={handleSubmit}>Click me</button>

            </div>
        );
    };

export default TaskItem;