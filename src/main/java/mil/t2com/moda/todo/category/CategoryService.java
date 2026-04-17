package mil.t2com.moda.todo.category;

import mil.t2com.moda.todo.task.Task;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Optional<Category> findCategoryByLabel(String label){
        return categoryRepository.findByLabel(label);
    }

    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    public Category updateCategory(Long id, Category category){
        Category found = this.categoryRepository.getReferenceById(id);
        found.setLabel(category.getLabel());
        return this.saveCategory(found);
    }

    public void deleteCategory(Long categoryId){
        this.categoryRepository.deleteById(categoryId);
    }

    public Category resolveCategory(String categoryLabel){
        Optional<Category> category = this.findCategoryByLabel(categoryLabel);
        if (category.isPresent()){
            return category.get();
        }
        else{
            return this.saveCategory(new Category(categoryLabel));
        }
    }
    // ADD with Tests for: GetById, Put, Delete

}
