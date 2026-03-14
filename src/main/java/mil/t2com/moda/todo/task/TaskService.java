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
    private final CategoryRepository categoryRepository;


    public TaskService(TaskRepository taskRepository, CategoryRepository categoryRepository) {
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
    }

    public Task saveTask(Task task) {
        Optional<Category> category = categoryRepository.findByLabel(task.getCategory().getLabel());
        if (category.isPresent()){
            task.setCategory(category.get());
            return taskRepository.save(task);
        }else{
            String label = task.getCategory().getLabel();
             Category newCategory = categoryRepository.save(new Category(label));
             Long categoryId = newCategory.getId();
             task.getCategory().setId(categoryId);
             return taskRepository.save(task);
        }
    }

    public Task findTaskById(Long id){
        return taskRepository.getReferenceById(id);
    }

    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    // ADD with Tests for: GetById, Put, Delete
}
