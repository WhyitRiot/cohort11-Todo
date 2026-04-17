import { describe, vi, it, expect } from "vitest";
import * as client from "../utilities/APIClient.ts"
import {render, waitFor, screen} from "@testing-library/react";
import {TaskContextProvider} from "../context/TaskContextProvider.tsx";
import TaskTable from "../components/TaskTable.tsx";

vi.mock("../APIClient.ts");
describe('task context', () => {
    it('should show data', async () => {
        vi.mocked(client.getTasks).mockResolvedValue([
            {
                title: "Learn TDD",
                description: "Testing tables",
                isComplete: false,
                category:{
                    label: "Test",
                    id : 1
                },
                id: 1
            }
        ]);
        render(
            <TaskContextProvider>
                <TaskTable/>
            </TaskContextProvider>
        );
        await waitFor(()=>{
            expect(screen.getAllByRole('row')).toHaveLength(2);
        })
    });

});