import type {Task} from "./TaskType.ts";

const TaskRow = ({task} : {task : Task}) => {
    const {title, description, isComplete} = task;
    const label = task.category.label;
    return (
        <tr>
            <td>
                {title}
            </td>
            <td>
                {description}
            </td>
            <td>
                {isComplete ? "Yes" : "No"}
            </td>
            <td>
                {label}
            </td>
        </tr>
    );
};

export default TaskRow;