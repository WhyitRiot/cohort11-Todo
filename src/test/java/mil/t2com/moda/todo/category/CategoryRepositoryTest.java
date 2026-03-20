package mil.t2com.moda.todo.category;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.jdbc.CannotGetJdbcConnectionException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class CategoryRepositoryTest {

    @Autowired
    CategoryRepository categoryRepository;

    @Test
    void shouldSaveNewCategory() {
        // Arrange
        Category newCategory = new Category("Important");

        // Act
        Category savedNewCategory = categoryRepository.save(newCategory);
        Optional<Category> result = categoryRepository.findById(savedNewCategory.getId());

        // Assert
        assertEquals("Important", result.get().getLabel());
        assertThat(result.get().getLabel()).isEqualTo(newCategory.getLabel());
        // Add category value test
        assertThat(result.get().getLabel()).isEqualTo(newCategory.getLabel());
        assertThat(result.get()).isEqualTo(newCategory);
    }

    @Test
    void shouldFindByLabel(){
        Category newCategory = new Category("Important");
        //newCategory.setId(2L);
        categoryRepository.save(newCategory);
        Optional<Category> result = categoryRepository.findByLabel(newCategory.getLabel());

        assertThat(result.get().getLabel()).isEqualTo(newCategory.getLabel());
        System.out.println();
    }

    @Test
    void shouldFindByLabelORId(){
        Category newCategory = new Category("Important");
        categoryRepository.save(newCategory);
        Optional<Category> result = categoryRepository.findByLabelOrId(newCategory.getLabel());
        Optional<Category> result2 = categoryRepository.findByLabelOrId(newCategory.getId());

        assertThat(result.get().getId() == result2.get().getId());
        assertThat(newCategory.getLabel() == result.get().getLabel());
        assertThat(newCategory.getId() == result2.get().getId());
    }
}