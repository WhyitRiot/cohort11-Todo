import React, {type ChangeEvent, useContext} from 'react';
import {Box, Button, Checkbox, TextField} from "@mui/material";
import {type FieldValues, useForm} from "react-hook-form";
import {type InferType, object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import type {Task} from "../utilities/TaskType.ts";
import {TaskContext} from "../context/TaskContextProvider.tsx";

const AddForm = () => {
    const context = useContext(TaskContext);
    if (!context) throw Error("Outside of provider!")
    const {addTask} = context;
    let taskSchema = object({
        title: string().required(),
        description: string().required(),
        category: string().required()
    })

    const {
        register, handleSubmit, setValue, formState
    } = useForm(    {resolver: yupResolver(taskSchema)});

    type AddTaskData = InferType<typeof taskSchema>;

    const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const {name, value} = e.target;
        setValue(name as keyof AddTaskData, value as any, {
            shouldValidate: true,
            shouldDirty: true
        })
    }

    const onSubmit = async (data : FieldValues) =>{
        let parsedData : AddTaskData = await taskSchema.validate(data);
        const newTask : Task = {
            title: parsedData.title,
            description: parsedData.description,
            isComplete: false,
            category: {
                label: parsedData.category,
                id: undefined
            },
            id: undefined
        }
        await addTask(newTask);
    }


    return (
        <>
            <Box
                component={"form"}
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', backgroundColor:'#F3F6F9', borderRadius: '4px' } }}
                noValidate
                autoComplete={"off"}
                onSubmit={ handleSubmit(data => onSubmit(data))}
            >
                <div className={"flex justify-center items-center"}>
                    <TextField
                        required
                        id={"outlined-required"}
                        placeholder={"Title"}
                        {...register("title")}
                        onChange={(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => handleChange(e)}
                    />
                    <TextField
                        required
                        id={"outlined-required"}
                        placeholder={"Description"}
                        {...register("description")}
                        onChange={(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => handleChange(e)}
                    />
                    <TextField
                        required
                        id={"outlined-required"}
                        placeholder={"Category"}
                        {...register("category")}
                        onChange={(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => handleChange(e)}
                    />
                    <Button variant={"outlined"} type={"submit"}>Add</Button>
                </div>

            </Box>
        </>
    );
};

export default AddForm;