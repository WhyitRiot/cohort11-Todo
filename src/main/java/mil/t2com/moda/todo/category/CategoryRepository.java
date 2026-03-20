package mil.t2com.moda.todo.category;

import mil.t2com.moda.todo.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    default Optional<Category> findByLabelOrId(String categoryLabel){
        return this.findByLabel(categoryLabel);
    };
    default Optional<Category> findByLabelOrId(Long categoryId){
        return this.findById(categoryId);
    }
    Optional<Category> findByLabel(String categoryLabel);
}
