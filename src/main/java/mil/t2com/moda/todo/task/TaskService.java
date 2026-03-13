package mil.t2com.moda.todo.task;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task saveTask(Task task) {
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
