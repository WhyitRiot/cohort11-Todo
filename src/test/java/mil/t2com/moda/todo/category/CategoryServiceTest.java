package mil.t2com.moda.todo.category;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    CategoryService categoryService;

    // Start using when refactoring
//    @BeforeEach
//    void setUp() {
    ////        MockitoAnnotations.openMocks(this);
//    }

    @Test
    void shouldSaveNewCategory() {
        // Arrange
        Category newCategory = new Category("Delayed");
        newCategory.setId(1L);

        // Act
        when(categoryRepository.save(newCategory)).thenReturn(newCategory);

        Category result = categoryService.saveCategory(newCategory);

        // Assert
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getLabel()).isEqualTo("Delayed");

        verify(categoryRepository, only()).save(newCategory);
    }

    @Test
    void shouldFindCategoryByLabel(){
        Category newCategory = new Category("Delayed");
        newCategory.setId(1L);
        when(categoryRepository.findByLabel(newCategory.getLabel())).thenReturn(Optional.of(newCategory));

        Optional<Category> result = categoryService.findCategoryByLabel(newCategory.getLabel());
        assertThat(newCategory.getLabel()).isEqualTo(result.get().getLabel());

        verify(categoryRepository, only()).findByLabel(newCategory.getLabel());
    }

    @Test
    void shouldCreateCategoryIfNotExists(){
        //Arrange
        Category newCategory = new Category("important");
        //when(categoryService.resolveCategory("important")).thenReturn(newCategory);
        when(categoryRepository.findByLabel("important")).thenReturn(Optional.empty());
        when(categoryRepository.save(any(Category.class))).thenReturn(newCategory);
        //Act
        Category checkCategory = categoryService.resolveCategory(newCategory.getLabel());
        //Assert
        assertThat(checkCategory.getLabel()).isEqualTo(newCategory.getLabel());
    }

}