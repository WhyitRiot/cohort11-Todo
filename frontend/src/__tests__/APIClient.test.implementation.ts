import {describe, it, expect} from "vitest";
import type {Task} from "../utilities/TaskType.ts";
import * as APIClient from "../utilities/APIClient.ts";
import type {AxiosResponse} from "axios";

describe("API client", ()=>{
    let postTask : Task = {
        title: "Learn TDD",
        description: "Code iteratively",
        isComplete: false,
        category:{
            label:"Coding",
            id: null
        },
        id: null
    }
    let postTaskTwo : Task = {
        title: "Learn to test",
        description: "Test before you code",
        isComplete: false,
        category:{
            label: "development",
            id: null
        },
        id: null
    }
    let data: Task[];
    it('should get all tasks', async () => {
        data = await APIClient.getTasks()
        expect(data).toHaveLength(2);
        expect(data[0].title).toEqual("Learn TDD");
    });
    it('should post a task', async () => {
        const response : AxiosResponse = await APIClient.postTask(postTaskTwo);
        expect(response.status).toEqual(201);
    });
})