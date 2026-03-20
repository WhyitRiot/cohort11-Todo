package mil.t2com.moda.todo.category;

import org.junit.jupiter.api.BeforeEach;
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

    Category newCategory;

    @BeforeEach
    void setup(){
        newCategory = new Category("important");
    }

    @Test
    void shouldSaveNewCategory() {
        // Arrange
        newCategory.setId(1L);

        // Act
        when(categoryRepository.save(newCategory)).thenReturn(newCategory);

        Category result = categoryService.saveCategory(newCategory);

        // Assert
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getLabel()).isEqualTo("important");

        verify(categoryRepository, only()).save(newCategory);
    }

    @Test
    void shouldFindCategoryByLabel(){
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
        when(categoryRepository.findByLabel("important")).thenReturn(Optional.empty());
        when(categoryRepository.save(any(Category.class))).thenReturn(newCategory);
        //Act
        Category checkCategory = categoryService.resolveCategory(newCategory.getLabel());
        //Assert
        assertThat(checkCategory.getLabel()).isEqualTo(newCategory.getLabel());


        verify(categoryRepository, times(1)).findByLabel(anyString());
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    void shouldReturnCategoryIfExists(){
        //Arrange
        Category newCategory = new Category("important");
        when(categoryRepository.findByLabel("important")).thenReturn(Optional.of(newCategory));

        //Act
        Category checkCategory = categoryService.resolveCategory(newCategory.getLabel());

        //Assert
        assertThat(checkCategory.getLabel()).isEqualTo(newCategory.getLabel());

        verify(categoryRepository, times(1)).findByLabel(anyString());
        verify(categoryRepository, times(0)).save(any(Category.class));
    }
}