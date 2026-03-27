package mil.t2com.moda.todo.task;

import mil.t2com.moda.todo.category.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static aQute.bnd.annotation.headers.Category.json;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.matchesPattern;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    TaskService taskService;

    @Captor
    ArgumentCaptor<Task> captor = ArgumentCaptor.forClass(Task.class);

    Task taskOne;
    Task taskTwo;
    Task taskThree;

    Category catOne;
    Category catTwo;
    Category catThree;

    List<Task> allTasks;

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
    void shouldSaveNewTask() throws Exception {
        // Arrange
        Category newCategory = new Category("important");
        Task newTask = new Task("Learn about testing HTTP request/response", "Learn how to use WebMvcTest", false, newCategory);
        newTask.setId(1L);

        when(taskService.saveTask(any(Task.class))).thenReturn(newTask);

        // Act
        mockMvc.perform(post("/api/v1/task")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newTask)))
                // result matchers
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value(matchesPattern("Learn about.*request/response")))
                .andExpect(jsonPath("$.description").value(containsString("Learn how to")))
                .andExpect(jsonPath("$.category.label").value("important"))
                .andDo(print()
                );

        // Assert
        verify(taskService, times(1)).saveTask(any(Task.class));
    }

    @Test
    void shouldSaveNewTaskUsingCaptor() throws Exception {
        // Arrange
        Task newTask = new Task(
                "Learn about testing HTTP request/response",
                "Learn how to use WebMvcTest",
                false,
                new Category("enablement"));
        newTask.setId(1L);

        when(taskService.saveTask(any(Task.class))).thenReturn(newTask);

        // Act
        mockMvc.perform(post("/api/v1/task")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newTask)))
                // result matchers
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value(matchesPattern("Learn about.*request/response")))
                .andExpect(jsonPath("$.description").value(containsString("Learn how to")))
                .andExpect(jsonPath("$.category.label").value("enablement"))
                .andDo(print()
                );

        // Assert
        verify(taskService, only()).saveTask(captor.capture());
        assertThat(captor.getValue()).usingRecursiveComparison().isEqualTo(newTask);

        verify(taskService, only()).saveTask(any(Task.class));
    }
    @Test
    void shouldGetAllTasks() throws Exception{
        when(taskService.findAllTasks()).thenReturn(allTasks);

        MvcResult result = mockMvc.perform(get("/api/v1/task/all").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String response = result.getResponse().getContentAsString();
        List<Task> returnedTasks = objectMapper.readValue(response, new TypeReference<List<Task>>(){});

        verify(taskService, only()).findAllTasks();
        assertThat(returnedTasks).usingRecursiveComparison().isEqualTo(allTasks);
    }
    @Test
    void shouldGetTaskById() throws Exception{
        when(taskService.findTaskById(1L)).thenReturn(taskOne);
        when(taskService.findTaskById(2L)).thenReturn(taskTwo);
        when(taskService.findTaskById(3L)).thenReturn(taskThree);

        //ACT
        MvcResult resultOne = mockMvc.perform(get("/api/v1/task/1").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                        .andReturn();

        MvcResult resultTwo = mockMvc.perform(get("/api/v1/task/2").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                        .andReturn();

        MvcResult resultThree = mockMvc.perform(get("/api/v1/task/3").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                        .andReturn();


        String resultJson = resultOne.getResponse().getContentAsString();
        Task gotTaskOne = objectMapper.readValue(resultJson, Task.class);
        resultJson = resultTwo.getResponse().getContentAsString();
        Task gotTaskTwo = objectMapper.readValue(resultJson, Task.class);
        resultJson = resultThree.getResponse().getContentAsString();
        Task gotTaskThree = objectMapper.readValue(resultJson, Task.class);

        //Assert
        assertThat(gotTaskOne.getId()).isEqualTo(taskOne.getId());
        assertThat(gotTaskTwo.getId()).isEqualTo(taskTwo.getId());
        assertThat(gotTaskThree.getId()).isEqualTo(taskThree.getId());
    }
}