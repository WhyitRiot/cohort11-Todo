import {describe, it, expect, beforeAll, vi} from "vitest";
import TaskTable from "../TaskTable.tsx";
import {fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import type {Task} from "../TaskType.ts";
import * as client from "../APIClient.ts";
import {TaskContextProvider} from "../TaskContextProvider.tsx";

let task: Task;
let taskTwo: Task;
let taskThree: Task;
let tasks: Task[];
let multipleTasks : Task[];
describe('task item', () => {
    beforeAll(()=>{
        task = {
            title: "Learn TDD",
            description: "Testing tables",
            isComplete: false,
            category:{
                label: "Test",
                id : 1
            },
            id: 1 }
        taskTwo= {
            title: "Build React App",
            description: "Create frontend for task manager",
            isComplete: false,
            category: {
                label: "Development",
                id: 2
            },
            id: 2
        };

        taskThree = {
            title: "Write Unit Tests",
            description: "Cover service layer with tests",
            isComplete: true,
            category: {
                label: "Testing",
                id: 3
            },
            id: 3
        };

        tasks = [
            task,
            taskTwo,
            taskThree
        ];
        vi.mock("../APIClient.ts");
        vi.mocked(client.getTasks).mockResolvedValue(tasks);
    })
    it('should display headers', async () => {
        render(<TaskContextProvider><TaskTable /></TaskContextProvider>);
        await waitFor(() =>{
            expect(screen.getAllByRole('row')).toHaveLength(4);
        })
    });

    it('should display button', () => {
        render(<TaskContextProvider><TaskTable /></TaskContextProvider>);
        screen.logTestingPlaygroundURL();
        let tableItems = screen.getAllByRole('row');
        for (let i = 1; i<tableItems.length; i++){
            expect(within(tableItems[i]).getByRole('button', { name: /edit/i })).toBeInTheDocument();
        }
    });

    describe('task item button', () => {
        it('should change row to input', () => {
            render(<TaskContextProvider><TaskTable /></TaskContextProvider>);
            let tableItems = screen.getAllByRole('row');
            for (let i = 1; i<tableItems.length; i++){
                let editButton = within(tableItems[i]).getByRole('button', { name: /edit/i });
                //Click and make sure inputs appear
                fireEvent.click(editButton);
                let newTableItem = screen.getAllByRole('row')[i];
                expect(within(newTableItem).getByPlaceholderText(new RegExp(`^${tasks[i-1].title}$`, "i"))).toBeInTheDocument();
                expect(within(newTableItem).getByPlaceholderText(new RegExp(`^${tasks[i-1].description}$`, "i"))).toBeInTheDocument();
                expect(within(newTableItem).getByPlaceholderText(new RegExp(`^${tasks[i-1].category.label}$`, "i"))).toBeInTheDocument();
                expect(within(newTableItem).getByRole('radio')).toBeInTheDocument()
                //Click save and make sure inputs disappear
                let saveButton = within(newTableItem).getByRole('button', {name: /save/i});
                fireEvent.click(saveButton);
                expect(within(newTableItem).getByPlaceholderText(new RegExp(`^${tasks[i-1].title}$`, "i"))).not.toBeInTheDocument();
                expect(within(newTableItem).getByPlaceholderText(new RegExp(`^${tasks[i-1].description}$`, "i"))).not.toBeInTheDocument();
                expect(within(newTableItem).getByPlaceholderText(new RegExp(`^${tasks[i-1].category.label}$`, "i"))).not.toBeInTheDocument();
                expect(within(newTableItem).getByRole('radio')).not.toBeInTheDocument()
            }
        });
    });
});