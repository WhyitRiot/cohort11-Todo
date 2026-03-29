import {describe, it, expect, beforeAll, vi} from "vitest";
import TaskItem from "../TaskItem.tsx";
import {render, screen} from "@testing-library/react";
import type {Task} from "../TaskType.ts";
import * as APIClient from "../APIClient.ts";
import {isRunnableDevEnvironment} from "vite";
import {Axios} from "axios";

let task: Task;
let taskTwo: Task;
let tasks: Task[];
let multipleTasks : Task[];
describe('task item', () => {
    beforeAll(()=>{
        task= {
            title: "Test",
            description: "Testing implementation of tasks",
            isComplete: false,
            category:{
                label:"Test Category",
                id: 1
            },
            id: 1
        }
        taskTwo= {
            title: "TaskTwo",
            description: "Testing implementation of task two",
            isComplete: true,
            category:{
                label:"Test Category Two",
                id: 2
            },
            id: 2
        }
        tasks = [task];
        multipleTasks = [task, taskTwo];
    })
    it('should display task item', () => {
        //Arrange
        render(<TaskItem tasks={tasks} />)
        screen.logTestingPlaygroundURL();
        expect(screen.getByRole("cell", {name:/Title/i})).toBeInTheDocument();
        expect(screen.getByRole("cell", {name:/Description/i})).toBeInTheDocument();
        expect(screen.getByRole("cell", {name:/Status/i})).toBeInTheDocument();
        expect(screen.getByText("Category", {exact:true})).toBeInTheDocument();
    });
    it('should display task row', ()=>{
        render(<TaskItem tasks={tasks}/>)
        expect(screen.getByText("Test", {exact: true})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/Testing implementation of tasks/i})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/Yes|No/i})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/Test Category/i})).toBeInTheDocument();
    })
    it('should display multiple tasks', () => {
        render(<TaskItem tasks={multipleTasks}/>)
        expect(screen.getByText("Test", {exact: true})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/Testing implementation of task two/i})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/No/i})).toBeInTheDocument();
        expect(screen.getByText('Test Category', {exact: true})).toBeInTheDocument();

        expect(screen.getByText("TaskTwo", {exact: true})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/Testing implementation of tasks/i})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/Yes/i})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/Test Category Two/i})).toBeInTheDocument();
    });
});

describe('API Client', () => {
    let data : Task[];
   beforeAll(async()=>{
       task= {
           title: "Test",
           description: "Testing implementation of tasks",
           isComplete: false,
           category:{
               label:"Test Category",
               id: 1
           },
           id: 1
       }
       taskTwo= {
           title: "TaskTwo",
           description: "Testing implementation of task two",
           isComplete: true,
           category:{
               label:"Test Category Two",
               id: 2
           },
           id: 2
       }
       tasks = [task];
       multipleTasks = [task, taskTwo];

       vi.spyOn(APIClient, 'getTasks').mockResolvedValue(multipleTasks);

       data = await APIClient.getTasks();
   });
    it('should display get tasks', () => {
        render(<TaskItem tasks={data}/>)
        expect(screen.getByText("Test", {exact: true})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/Testing implementation of task two/i})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/No/i})).toBeInTheDocument();
        expect(screen.getByText('Test Category', {exact: true})).toBeInTheDocument();

        expect(screen.getByText("TaskTwo", {exact: true})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/Testing implementation of tasks/i})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/Yes/i})).toBeInTheDocument();
        expect(screen.getByRole('cell', {name:/Test Category Two/i})).toBeInTheDocument();
    });


});