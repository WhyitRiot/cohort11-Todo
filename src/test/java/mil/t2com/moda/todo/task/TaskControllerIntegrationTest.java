package mil.t2com.moda.todo.task;

import jakarta.transaction.Transactional;
import mil.t2com.moda.todo.category.Category;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.event.annotation.BeforeTestClass;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import tools.jackson.databind.ObjectMapper;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class TaskControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TaskService taskService;

    // Setup test objects
    Task learnTdd;
    Task firstTask;
    Task secondTask;
    Category started;
    Category normal;
    Category important;

    @BeforeEach
    void setUp() {

        started = new Category("Started");
        normal = new Category("Normal");
        important = new Category("Important");
        learnTdd = new Task( "Learn TDD", "research TDD", false, started);
        firstTask = new Task( "Learn Tdd", "Task One Description", false, normal);
        secondTask = new Task("Practice Tdd", "Task Two Description", false, important);
    }

    @Test
    public void shouldCreateTask() throws Exception {
        String learnTddJson = objectMapper.writeValueAsString(learnTdd);

        MvcResult savedTask = mockMvc.perform(post("/api/v1/task")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(learnTddJson))
                .andReturn();
        String expectType = savedTask.getRequest().getContentType();
        Task expectedTask = objectMapper.readValue(savedTask.getResponse().getContentAsString(), Task.class);

        assertEquals("application/json", expectType);
        assertEquals(expectedTask.getTitle(), objectMapper.readValue(learnTddJson, Task.class).getTitle());
        assertEquals(expectedTask.getCategory().getLabel(), learnTdd.getCategory().getLabel());
    }

    @Test
    public void shouldGetAllTasks() throws Exception {

        //taskService.saveTask(firstTask);
        mockMvc.perform(post("/api/v1/task").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(firstTask))).andExpect(status().isCreated());
        mockMvc.perform(post("/api/v1/task").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(secondTask))).andExpect(status().isCreated());
        //taskService.saveTask(secondTask);

        mockMvc.perform(get("/api/v1/task"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.*", hasSize(2)))
                .andExpect(jsonPath("$[0].id").exists())
                .andExpect(jsonPath("$[0].title").value("Learn Tdd"))
                .andExpect(jsonPath("$[1].title").value("Practice Tdd"))
                .andExpect(jsonPath("$[0].category.id").exists())
                .andExpect(jsonPath("$[0].category.label").value("Normal"))
                .andExpect(jsonPath("$[1].category.label").value("Important"))
                .andExpect(jsonPath("$[1].category.id").exists());
    }

    @Test
    public void shouldGetTaskById() throws Exception {
        Task savedTask = taskService.saveTask(learnTdd);

        mockMvc.perform(get("/api/v1/task/" + savedTask.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4L))
                .andExpect(jsonPath("$.title").value("Learn TDD"))
                .andExpect(jsonPath("$.category.id").value(4L))
                .andExpect(jsonPath("$.category.label").value("Started"));
    }
}
