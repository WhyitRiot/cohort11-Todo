import axios, {type AxiosResponse} from "axios";
import type {Task, Category} from "./TaskType.ts";

const client = axios.create({
    //baseURL: "http://localhost:8080"
})

export const getTaskFat  = async(): Promise<Task[]> =>{
    return fetch("http://localhost:8080/api/v1/task/all").then(response =>{
        if (!response.ok){
            throw new Error("Error")
        }
        return response.json() as Promise<Task[]>;
    });
}

export async function getTasks(): Promise<Task[]> {

    // const response = await fetch("http://localhost:8080/api/v1/task/all")
    // if (!response.ok){
    //     throw new Error("Error retrieving tasks")
    // }
    // return response.json();
    return client.get<Task[]>("/api/v1/task/all").then(r => r.data)
}

export async function postTask(task : Task) : Promise<AxiosResponse>{
    return await client.post("/api/v1/task", task).then(r => r);
}

export async function putTask(task : Task) : Promise<AxiosResponse>{
    return await client.put(`/api/v1/task/${task.id}`, task).then(r => r);
}

export async function deleteTask(id : Number) : Promise<AxiosResponse>{
    return await client.delete(`/api/v1/task/${id}`).then(r => r);
}

export async function getCategories(): Promise<Category[]> {
    return await client.get<Category[]>("/api/v1/category").then(r => r.data);
}

export async function postCategory(category: Category) : Promise<AxiosResponse>{
    return await client.post("api/v1/category", category).then(r => r);
}
export async function putCategory(id: Number, category: Category) : Promise<AxiosResponse>{
    return await client.put(`/api/v1/category/${id}`, category).then(r => r);
}
export async function deleteCategory(id: Number) : Promise<AxiosResponse>{
    return await client.delete(`/api/v1/category/${id}`).then(r => r);
}
