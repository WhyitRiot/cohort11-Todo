package mil.t2com.moda.todo.task;

import jakarta.transaction.Transactional;
import mil.t2com.moda.todo.category.Category;
import mil.t2com.moda.todo.category.CategoryRepository;
import mil.t2com.moda.todo.category.CategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    TaskService taskService;

    Task taskOne;
    Task taskTwo;
    Task taskThree;

    String labelOne;
    String labelTwo;
    String labelThree;

    Category catOne;
    Category catTwo;
    Category catThree;

    List<Task> allTasks;

    /*
        this.title = title;
        this.description = description;
        this.isComplete = isComplete;
        this.category = category;
     */

    @BeforeEach
    void setUp(){
        catOne = new Category("Category One");
        catTwo = new Category("Category Two");
        catThree = new Category("Category Three");
        taskOne = new Task("TaskOne", "Task One Description", false, catOne);
        taskOne.setId(1L);
        taskTwo = new Task("TaskTwo", "Task two Description", false, catTwo);
        taskTwo.setId(2L);
        taskThree = new Task("TaskThree", "Task three Description", false, catThree);
        taskThree.setId(3L);
        allTasks = new ArrayList<Task>();
        allTasks.add(taskOne);
        allTasks.add(taskTwo);
        allTasks.add(taskThree);
    }

    @Test
    void shouldSaveNewTask() {
        // Arrange
        Category newCategory = new Category("important");
        Task newTask = new Task("Learn about Mocks", "Learn about Inject mocks", false, newCategory);
        newTask.setId(1L);
        newCategory.setId(1L);

        // Act
        when(taskRepository.save(newTask)).thenReturn(newTask);

        when(categoryService.resolveCategory(newTask.getCategory().getLabel())).thenReturn(newCategory);

        Task result = taskService.saveTask(newTask);

        // Assert
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("Learn about Mocks");
        assertThat(result.getCategory().getLabel()).isEqualTo("important");

        verify(taskRepository, only()).save(newTask);
        verify(categoryService, only()).resolveCategory(newTask.getCategory().getLabel());
    }

    @Test
    void shouldGetAllTasks(){
        //Repository save mock
        when(taskRepository.save(taskOne)).thenReturn(taskOne);
        when(taskRepository.save(taskTwo)).thenReturn(taskTwo);
        when(taskRepository.save(taskThree)).thenReturn(taskThree);
        when(taskRepository.findAll()).thenReturn(allTasks);

        //Arrange
        Task saveOne = taskService.saveTask(taskOne);
        Task savedTwo = taskService.saveTask(taskTwo);
        Task savedThree = taskService.saveTask(taskThree);

        //Act
        List<Task> result = taskService.findAllTasks();

        for (int i = 0; i < allTasks.size(); i++){
            assertThat(allTasks.get(i).getTitle() == result.get(i).getTitle());
        }

        verify(taskRepository, times(1)).findAll();
    }
    @Test
    void shouldFindById(){
        when(taskService.findTaskById(1L)).thenReturn(taskOne);
        when(taskService.findTaskById(2L)).thenReturn(taskTwo);
        when(taskService.findTaskById(3L)).thenReturn(taskThree);

        Task foundTaskOne = taskService.findTaskById(1L);
        Task foundTaskTwo = taskService.findTaskById(2L);
        Task foundTaskThree = taskService.findTaskById(3L);

        assertThat(foundTaskOne.getId()).isEqualTo(taskOne.getId());
        assertThat(foundTaskTwo.getId()).isEqualTo(taskTwo.getId());
        assertThat(foundTaskThree.getId()).isEqualTo(taskThree.getId());
    }
    @Test
    void shouldUpdateTask(){
        Task updateTask = new Task("Grape", "Mustard", false, new Category("Greese"));
        updateTask.setId(1L);
        updateTask.getCategory().setId(1L);
        when(taskRepository.getReferenceById(1L)).thenReturn(taskOne);
        when(taskRepository.save(any(Task.class))).thenReturn(updateTask);

        Task updatedTask = taskService.updateTaskById(1L, updateTask);

        assertThat(updatedTask.getId()).isEqualTo(1L);
    }
    @Test
    void shouldDeleteTask(){
        Task deleteThis = new Task("Wish", "Granted", false, new Category("Grummy"));
        deleteThis.getCategory().setId(1L);
        deleteThis.setId(1L);
        when(taskRepository.save(deleteThis)).thenReturn(deleteThis);
        Task saved = taskRepository.save(deleteThis);
        taskRepository.deleteById(saved.getId());

        verify(taskRepository, times(1)).deleteById(1L);
    }
}