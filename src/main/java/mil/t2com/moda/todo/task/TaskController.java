package mil.t2com.moda.todo.task;

import mil.t2com.moda.todo.category.CategoryRepository;
import mil.t2com.moda.todo.category.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/task")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task saveNewTask(@RequestBody Task task) {
        return taskService.saveTask(task);
    }

    // Update POST using ResponseEntity
//    @PostMapping
//    public ResponseEntity<Task> saveNewTask(@RequestBody Task task){
//        return new ResponseEntity<>(taskService.saveTask(task), HttpStatus.CREATED);
//    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<Task> findAllTasks() { return taskService.findAllTasks(); }

    // ADD with Tests for: GetById, Put, Delete

    // Example
    @GetMapping("/{taskId}")
    @ResponseStatus(HttpStatus.OK)
    public Task findTask(@PathVariable Long taskId){
        return taskService.findTaskById(taskId);
    }

    @PutMapping("/{taskId}")
    @ResponseStatus(HttpStatus.OK)
    public Task updateTask(@PathVariable Long taskId, @RequestBody Task task){return taskService.updateTaskById(taskId, task);}

}
