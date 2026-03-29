import axios, {type AxiosResponse} from "axios";
import type {Task} from "./TaskType.ts";

const client = axios.create({
    baseURL: "http://localhost:8080"
})

export async function getTasks(): Promise<Task[]> {
    return client.get<Task[]>("/api/v1/task/all").then(r => r.data)
}

export async function postTask(task : Task) : Promise<AxiosResponse>{
    return await client.post("/api/v1/task", task).then(r => r);
}
