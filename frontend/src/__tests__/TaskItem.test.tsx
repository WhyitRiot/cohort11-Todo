import {describe, it, expect, vi} from "vitest";
import TaskItem from "../TaskItem.tsx";
import {render, screen} from "@testing-library/react";
import * as getTask from "../EventClientTasks.ts";



describe('task item', () => {
    vi.mock('axios')

    it('should display task item', () => {
        const taskData = {id: 1, name: "Learn TDD", description: "Use TDD to develop."}
        vi.spyOn(getTask, 'getTasks').mockResolvedValue(taskData)

        //Arrange
        render(<TaskItem/>)
        screen.logTestingPlaygroundURL();
        expect(screen.getByRole("row")).toBeInTheDocument()
        expect(screen.findByRole("cell", {name:/Learn TDD/i})).toBeInTheDocument();
    });
});