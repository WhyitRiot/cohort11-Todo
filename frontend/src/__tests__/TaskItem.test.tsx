import {describe, it, expect, beforeAll, vi} from "vitest";
import TaskTable from "../components/TaskTable.tsx";
import {act, fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import type {Task} from "../utilities/TaskType.ts";
import * as client from "../utilities/APIClient.ts";
import {TaskContextProvider} from "../context/TaskContextProvider.tsx";
import Tasks from "../pages/Tasks.tsx";
import userEvent from "@testing-library/user-event";


vi.mock("../utilities/APIClient.ts");
let addTask: Task;
let task: Task;
let taskTwo: Task;
let taskThree: Task;
let tasks: Task[];
let multipleTasks : Task[];
describe('task item', () => {
    beforeAll(()=>{
        addTask ={
            title: "Test",
            description: "Test Description",
            isComplete: false,
            category:{
                label: "Test Category",
                id: 4
            },
            id: 4
        }
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
        vi.mocked(client.getTasks).mockResolvedValue(tasks);
        vi.mocked(client.postTask);
        vi.mocked(client.deleteTask);
    })
    it('should display headers', async () => {
        render(<TaskContextProvider><TaskTable /></TaskContextProvider>);
        await waitFor(() =>{
            expect(screen.getAllByRole('row')).not.toEqual(undefined);
        })
        expect(screen.getAllByRole('row')).toHaveLength(4);
    });

    it('should display button', async () => {
        render(<TaskContextProvider><TaskTable /></TaskContextProvider>);
        await waitFor(()=>{
            const tableItems = screen.getAllByRole('row');
            expect(tableItems.length).toBeGreaterThan(1);

        })
        const tableItems = screen.getAllByRole('row');
        for (let i = 1; i<tableItems.length; i++){
            expect(within(tableItems[i]).getByRole('button', { name: /edit/i })).toBeInTheDocument();
        }
        screen.logTestingPlaygroundURL();
    });

    describe('task item button', () => {
        beforeAll(()=>{
            addTask ={
                title: "Test",
                description: "Test Description",
                isComplete: false,
                category:{
                    label: "Test Category",
                    id: 4
                },
                id: 4
            }
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
            vi.mocked(client.getTasks).mockResolvedValue(tasks);
            vi.mocked(client.postTask);
            vi.mocked(client.deleteTask)});
        it('should change row to input', async () => {
            render(<TaskContextProvider><TaskTable /></TaskContextProvider>);

            let tableItems = await screen.findAllByRole('row');
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

    describe('add task', () =>{
        beforeAll(()=>{
            addTask ={
                title: "Test",
                description: "Test Description",
                isComplete: false,
                category:{
                    label: "Test Category",
                    id: 4
                },
                id: 4
            }
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
            vi.mocked(client.getTasks).mockResolvedValue(tasks);
            vi.mocked(client.postTask);
            vi.mocked(client.deleteTask);
        })

        const user = userEvent.setup();
        it('should allow input', async () => {
            render(<TaskContextProvider><Tasks/></TaskContextProvider>)
            const titleInput = await screen.findByPlaceholderText(/title/i);
            const descriptionInput = await screen.findByPlaceholderText(/description/i);
            const categoryInput = await screen.findByPlaceholderText(/category/i);
            await user.type(titleInput, "Test");
            await user.type(descriptionInput, "Test Description");
            await user.type(categoryInput, "Test Category");

            expect(titleInput).toHaveValue("Test");
            expect(descriptionInput).toHaveValue("Test Description");
            expect(categoryInput).toHaveValue("Test Category");
        });
        it('should add task', async() =>{
            render(<TaskContextProvider><Tasks/></TaskContextProvider>)
            const titleInput = await screen.findByPlaceholderText(/title/i);
            const descriptionInput = await screen.findByPlaceholderText(/description/i);
            const categoryInput = await screen.findByPlaceholderText(/category/i);
            const addButton= await screen.findByRole('button', {
                name: /add/i
            })
            await user.type(titleInput, "Test");
            await user.type(descriptionInput, "Test Description");
            await user.type(categoryInput, "Test Category");
            tasks = [...tasks, addTask];
            vi.mocked(client.getTasks).mockResolvedValue(tasks);
            await user.click(addButton);
            let tableItems = await screen.findAllByRole('row');
            expect(within(tableItems[tableItems.length-1]).getByRole('rowheader', {name: /Test/i})).toBeInTheDocument();
            expect(within(tableItems[tableItems.length-1]).getByRole('cell', {name: /test description/i})).toBeInTheDocument();
        })
        it('should delete task', async() => {
            tasks = [...tasks, addTask];
            vi.mocked(client.getTasks).mockResolvedValue(tasks);
            render(<TaskContextProvider><Tasks/></TaskContextProvider>)
            let tableItems = await screen.findAllByRole('row');
            waitFor( async()=>{
                while(tableItems.length != tasks.length + 1){
                    tableItems = await screen.findAllByRole('row');
                }
            })
            tableItems = screen.getAllByRole('row');
            const editButton = within(tableItems[tableItems.length-1]).getByRole('button', { name: /edit/i });
            await user.click(editButton);
            const deleteButton = screen.getByRole('button', { name: /delete/i })
            tasks = tasks.filter(task => task.id != addTask.id);
            await user.click(deleteButton);
            tableItems = screen.getAllByRole('row');
            expect(tableItems).toHaveLength(tasks.length + 1);
        });
    })
});