import type {Task} from "../TaskType.ts";
import {beforeAll, afterEach, afterAll, describe, it, expect} from "vitest";
import {setupServer, SetupServerApi} from "msw/node";
import {http, HttpResponse} from "msw";
import * as client from "../APIClient.ts";

describe('Task service', () => {
    let server : SetupServerApi;
    beforeAll(()=>{
        const task : Task = {
            title: "Learn TDD",
            description: "Testing tables",
            isComplete: false,
            category:{
                label: "Test",
                id : 1
            },
            id: 1 }
        const taskTwo : Task= {
            title: "Build React App",
            description: "Create frontend for task manager",
            isComplete: false,
            category: {
                label: "Development",
                id: 2
            },
            id: 2
        };

        const taskThree : Task= {
            title: "Write Unit Tests",
            description: "Cover service layer with tests",
            isComplete: true,
            category: {
                label: "Testing",
                id: 3
            },
            id: 3
        };
        const expected : Task[] = [
            task, taskTwo, taskThree
        ]
        server = setupServer(
            http.get('/api/v1/task/all', () =>{
                return HttpResponse.json(expected);
            })
        );
        server.listen()});
    afterEach(() =>server.resetHandlers());
    afterAll(() => server.close());

    it('should get all tasks', async () => {
            const tasks = await client.getTasks();
            expect(tasks.length).toBe(3);
        })
    });