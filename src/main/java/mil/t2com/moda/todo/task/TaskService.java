package mil.t2com.moda.todo.task;

import mil.t2com.moda.todo.category.Category;
import mil.t2com.moda.todo.category.CategoryRepository;
import mil.t2com.moda.todo.category.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final CategoryService categoryService;


    public TaskService(TaskRepository taskRepository, CategoryService categoryService) {
        this.taskRepository = taskRepository;
        this.categoryService = categoryService;
    }

    public Task saveTask(Task task) {
        task.setCategory(categoryService.resolveCategory(task.getCategory().getLabel()));
        return taskRepository.save(task);
    }

    public Task findTaskById(Long id){
        return taskRepository.getReferenceById(id);
    }

    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    // ADD with Tests for: GetById, Put, Delete
}
